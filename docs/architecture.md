# Architecture

## Un site sans état

Le site vitrine n'a **ni base de données, ni fichier de contenu, ni panneau
d'administration**. Il ne stocke rien.

Tout ce qu'il affiche vient de deux APIs distantes, interrogées à chaque rendu côté
serveur. C'est ce qui permet à **une seule image Docker de servir tous les
établissements** : le contenu n'est pas dans l'image, il est dans les APIs que
l'image interroge.

```
       wetchah_erp                          wetchah_app
   contenu marketing, identité          chambres, tarifs, menu
            │                                     │
      CMS_API_URL                          TENANT_API_URL
            └───────────────┬─────────────────────┘
                            ▼
                      wetchah_site
                  (SvelteKit, adapter-node)
                            │
                            ▼
                       le visiteur
```

## Les deux sources

| Source | Variable | Fournit | Modifiée par |
|---|---|---|---|
| **CMS** — la console | `CMS_API_URL` | Textes, images, SEO, identité, coordonnées | L'éditeur, le propriétaire ou le technicien, depuis l'ERP |
| **Application** — le PMS | `TENANT_API_URL` | Chambres, disponibilité, tarifs, carte du restaurant | Le personnel, dans son travail quotidien |

La séparation est fonctionnelle, pas technique :

> Ce qui est **écrit pour être lu** vient du CMS. Ce qui est **le reflet de l'activité
> réelle** vient de l'application. La réception n'a donc jamais à ressaisir une
> chambre ou un plat pour le site.

## Le client d'API

[`src/lib/server/api.ts`](../src/lib/server/api.ts) — 101 lignes, et **le seul endroit
du projet qui parle aux APIs**. Aucun composant ne fait d'appel réseau.

Quatre fonctions :

| Fonction | Usage |
|---|---|
| `fetchCmsContent(path, fetch)` | `GET {CMS_API_URL}/api/public/establishments/{slug}{path}` |
| `fetchTenantApi(path, fetch)` | `GET {TENANT_API_URL}/api/v1{path}` |
| `postTenantApi(path, body, fetch)` | `POST` — envoi d'une demande de réservation |
| `pingTenantApi(fetch)` | Sonde de liaison, timeout 2 s |

Le préfixe `server/` n'est pas cosmétique : SvelteKit **interdit** d'importer ce
module côté client. Les URLs internes des APIs ne fuitent jamais dans le navigateur.

## La dégradation, principe de conception

Le site est conçu pour **ne jamais tomber quand une API tombe**. C'est le fil rouge du
projet, et il se décline à chaque niveau.

### Un appel qui échoue rend `null`

`fetchJson` intercepte tout : URL absente, erreur réseau, réponse non-OK. Il journalise
et rend `null`. Aucune exception ne remonte jusqu'au rendu.

```
API injoignable → null → la section retombe sur son contenu statique
```

### Les 403 et 404 ne sont pas des erreurs

```ts
if (response.status !== 403 && response.status !== 404) {
    console.error(`[api] ${path} -> HTTP ${response.status}`);
}
```

> Un 403 sur `/restaurant/menu` signifie simplement que le module restaurant est
> désactivé pour cet établissement. Le journaliser bruyamment noierait les vraies
> pannes sous du bruit prévisible.

### Le ping ne retarde jamais le contenu

Dans [`+layout.server.ts`](../src/routes/+layout.server.ts), le contenu CMS et le ping
partent **en parallèle** :

```ts
const [content, apiOnline] = await Promise.all([
    fetchCmsContent<CmsContent>('/content', fetch),
    pingTenantApi(fetch)
]);
```

Le ping porte par ailleurs un `AbortSignal.timeout(2000)` : une application injoignable
coûte au maximum deux secondes, jamais un blocage.

### Trois états de liaison, pas deux

`pingTenantApi` rend `boolean | null` :

| Valeur | Signification | Pastille |
|---|---|---|
| `true` | Application joignable | Verte |
| `false` | Liaison rompue | Rouge |
| `null` | `TENANT_API_URL` non configurée — mode démo | Verte |

> Le troisième cas compte : en développement local sans API, on ne veut pas d'une
> pastille rouge permanente. L'absence de configuration n'est pas une panne.

## La cascade de repli du contenu

Chaque section suit le même motif à trois niveaux, visible dans
[`Hero.svelte`](../src/lib/components/Hero.svelte) :

```ts
const hero = $derived(content?.pages?.home?.hero ?? null);

let title = $derived(
    hero?.title                    // 1. format à onglets (actuel)
    ?? content?.hero.title         // 2. format à plat (hérité)
    ?? "Un havre de paix…"         // 3. texte statique du template
);
```

> **Jamais de section vide.** Un ERP antérieur aux onglets, un champ non renseigné, une
> API muette : à chaque niveau il reste un repli. Le pire cas est un site générique,
> jamais un site cassé.

Le format à plat n'est pas un oubli : il maintient en marche les instances déployées
avant l'arrivée du CMS par onglets.

## Rendu côté serveur

Toutes les données sont chargées dans des `load()` **serveur** (`+page.server.ts`,
`+layout.server.ts`), jamais dans le navigateur.

Trois conséquences :

- les URLs internes (`http://meka-erp-slug-app`) restent invisibles du client ;
- le HTML est complet au premier octet — bon pour le référencement ;
- le visiteur n'attend pas un second aller-retour pour voir le contenu.

## Structure du code

```
src/
├─ lib/
│  ├─ server/api.ts          Le seul accès réseau
│  ├─ types/api.ts           Contrat de données (257 lignes)
│  ├─ utils.ts               Utilitaires shadcn (cn)
│  └─ components/
│     ├─ Hero, Rooms, Offers, Testimonials, VideoBanner,
│     │  Activities, InstagramFeed, Newsletter, Contact,
│     │  Restaurant, Services, About       ← sections de l'accueil
│     ├─ BookingWidget.svelte              ← recherche de disponibilité
│     ├─ Topbar, Navbar, Footer, ScrollToTop
│     ├─ heb/  Banner, RoomGrid, SearchSummary, AvailabilityBadge
│     ├─ resto/ Banner, Experience, Gallery, Menu
│     ├─ about/ Banner, Welcome, Facilities
│     ├─ contact/ Banner, Map
│     └─ ui/button                         ← primitives shadcn-svelte
└─ routes/
   ├─ +layout.server.ts / +layout.svelte   CMS + ping, en-tête et pied de page
   ├─ +page.server.ts / +page.svelte       Accueil
   ├─ heb/                                 Catalogue
   │  └─ room/[id]/                        Fiche + action de réservation
   ├─ resto/                               Carte
   ├─ about/ contact/                      Pages statiques pilotées par le CMS
   ├─ health/+server.ts                    Sonde
   └─ layout.css                           Thème et variables
```

Le découpage des composants suit les pages, ce qui rend le rapprochement avec le
schéma CMS immédiat : `pages.resto.experience` ↔ `resto/Experience.svelte`.

## Le contrat de données

[`src/lib/types/api.ts`](../src/lib/types/api.ts) est le **miroir TypeScript** des
structures produites par les deux APIs :

| Type | Miroir de |
|---|---|
| `CmsContent`, `SitePages` | `App\Support\SiteContentSchema` (ERP) |
| `RoomApi`, `RoomAvailabilityApi` | `RoomResource`, `RoomAvailabilityService::payload()` |
| `MenuCategoryApi`, `MenuItemApi` | `RestaurantMenuCategoryResource` |

> Ce fichier est le point de rupture le plus probable de la plateforme. Un champ
> renommé côté Laravel ne casse pas la compilation ici — les types décrivent une
> réponse HTTP, pas un import. La panne apparaît à l'exécution, sous forme de section
> vide.

Toute évolution d'API doit donc être répercutée ici **et** vérifiée sur le site.

## Stack

| Élément | Version |
|---|---|
| SvelteKit | 2.63 |
| Svelte | 5 (mode runes forcé) |
| Vite | 8 |
| TypeScript | strict |
| Tailwind CSS | 4 |
| Composants | shadcn-svelte, style `nova`, icônes Lucide |
| Adaptateur | `@sveltejs/adapter-node` |

L'adaptateur est configuré **dans [`vite.config.ts`](../vite.config.ts)**, il n'y a pas
de `svelte.config.js`. C'est inhabituel : chercher au bon endroit avant de conclure à
une absence de configuration.

> `adapter-node` produit un serveur Node autonome (`build/index.js`), exécutable en
> conteneur. `adapter-auto` ne convient pas : il cible les plateformes managées.

## Pour aller plus loin

- [Contenu et CMS](contenu-et-cms.md) — sections et cascade de repli
- [Réservation](reservation.md) — le parcours complet
- [Déploiement](deploiement.md) — image et provisioning
