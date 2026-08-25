# Contenu et CMS

Tout ce que le site affiche de textuel ou d'illustratif vient de la console
d'administration. Ce document décrit le contrat entre les deux.

## Où se modifie le contenu

| Profil | Où | Portée |
|---|---|---|
| **Éditeur** (`site_editor`) | ERP, `/espace-editeur` | Le site de son seul établissement |
| **Propriétaire** (`owner`) | ERP, fiche de son établissement | Ses établissements |
| **Technicien** (`tech_admin`) | ERP, fiche établissement | Tous |

L'éditeur dispose d'un espace dédié, avec sa propre page de connexion sans marquage
ERP : il n'a pas à savoir que la console d'administration existe.

> **Aucune de ces modifications ne redémarre le site.** Le contenu est relu à chaque
> rendu de page. Un texte corrigé est visible au rechargement suivant.

## L'appel

Une seule requête, faite dans
[`+layout.server.ts`](../src/routes/+layout.server.ts) et partagée par toutes les
pages :

```
GET {CMS_API_URL}/api/public/establishments/{TENANT_SLUG}/content
```

Sans authentification — c'est du contenu destiné à être public.

La réponse est typée par `CmsContent` dans
[`src/lib/types/api.ts`](../src/lib/types/api.ts), miroir de
`App\Support\SiteContentSchema` côté ERP.

## Les sections

Organisées en `pages → sections`. Chaque section porte un drapeau `enabled` : **le
site n'affiche que les sections actives**.

### Accueil (`home`) — 12 sections

| Section | Contenu |
|---|---|
| `hero` | Bannière : titre, sous-titre, libellé du bouton, image de fond |
| `philosophy` | Présentation + piliers / valeurs |
| `services` | Équipements de l'établissement |
| `rooms` | En-tête de la vitrine des hébergements *(les chambres viennent de l'application)* |
| `testimonials` | Témoignages clients |
| `video` | Vidéo de présentation (mp4 ou YouTube) |
| `offers` | Offres et forfaits, avec prix |
| `restaurant` | Encart restaurant |
| `discovery` | Activités et découvertes alentour |
| `instagram` | Compte + galerie photos |
| `newsletter` | Bloc d'inscription |
| `contact_form` | Formulaire de contact |

### Hébergements (`heb`)

`banner` — la grille des chambres est alimentée automatiquement par l'application.

### Restaurant (`resto`)

`banner`, `experience`, `gallery` — la carte vient de l'application.

### À propos (`about`)

`banner`, `welcome`, `facilities`.

### Contact (`contact`)

`banner`, `info` (introduction et horaires), `map` (URL d'intégration Google Maps).

> **Adresse, téléphone et e-mail ne sont pas dans la section `info`.** Ils viennent de
> la fiche de l'établissement (onglet Identité côté ERP) et alimentent aussi la barre
> supérieure et le pied de page. Les saisir deux fois créerait deux vérités.

## La cascade de repli

Chaque composant applique le même motif à trois niveaux :

```ts
const hero = $derived(content?.pages?.home?.hero ?? null);

let title = $derived(
    hero?.title                    // 1. format à onglets (actuel)
    ?? content?.hero.title         // 2. format à plat (hérité)
    ?? "Un havre de paix…"         // 3. texte statique du template
);
```

| Niveau | Source | Quand il sert |
|---|---|---|
| 1 | `pages.{page}.{section}.{champ}` | Cas normal |
| 2 | Clé à plat (`hero`, `about`, `contact`, `gallery`) | ERP antérieur aux onglets |
| 3 | Valeur littérale dans le composant | Champ vide, ou CMS injoignable |

> **Jamais de section vide.** Le pire cas est un site générique — jamais un site cassé
> ou un bloc blanc.

Le format à plat n'est pas un vestige à nettoyer : il maintient en marche les
instances déployées avant l'arrivée du CMS par onglets.

### L'exception : les coordonnées

[`Topbar.svelte`](../src/lib/components/Topbar.svelte) traite les coordonnées
différemment :

```ts
const phone = $derived(content ? content.contact?.phone : '+237 6 95 85 60 95');
```

> Dès que le CMS répond, **une coordonnée absente est masquée** plutôt que remplacée
> par une valeur de démonstration. Afficher le téléphone d'un autre établissement
> serait pire que ne rien afficher.

Les valeurs statiques ne servent donc qu'en développement local sans API.

## Les images

Toutes les images du CMS arrivent en **URLs absolues**, résolues côté ERP à partir de
sa propre `APP_URL`. Le site ne les reconstruit pas.

> Conséquence : **si `APP_URL` de l'ERP n'est pas joignable depuis le navigateur du
> visiteur, les images du site seront cassées.** C'est le premier point à vérifier
> devant des visuels manquants.

Le logo suit le même chemin : importé à la création de l'établissement, stocké côté
ERP, servi en URL absolue.

## SEO

Le CMS fournit `seo.title` et `seo.description` par établissement. En leur absence,
le titre retombe sur le nom de l'établissement.

## Le type `items`

Certaines sections (valeurs, équipements, offres, activités, témoignages,
installations) portent des listes structurées.

Côté ERP, elles se saisissent en zone de texte, une ligne par élément, colonnes
séparées par ` | ` :

```
Wi-Fi haut débit | Connexion fibre dans tout l'établissement
Parking privé | Gratuit et sécurisé
```

Côté site, elles arrivent déjà décomposées en objets — le site n'a aucun analyseur à
maintenir :

```ts
export interface TitleDescItem {
    title: string | null;
    description: string | null;
}
```

Les offres portent en plus un `price` (chaîne libre : `85 000 FCFA`), et les
témoignages un couple `author` / `text`.

## Faire évoluer le contenu

### Ajouter un champ à une section existante

1. L'ajouter au schéma côté ERP (`SiteContentSchema`) — il devient éditable, validé et
   exposé automatiquement.
2. L'ajouter au type correspondant dans [`api.ts`](../src/lib/types/api.ts).
3. Le consommer dans le composant, **avec son repli**.

### Ajouter une section

Même démarche, plus un composant dédié, placé dans le sous-dossier de sa page. Le
respect de la correspondance `pages.resto.experience` ↔ `resto/Experience.svelte`
rend la lecture immédiate.

> **Aucune de ces étapes ne casse un site déjà déployé.** Un champ inconnu de l'ERP
> arrive `undefined`, et le repli prend le relais. Les deux dépôts peuvent donc être
> livrés dans n'importe quel ordre.

## Pour aller plus loin

- [Architecture](architecture.md) — la dégradation comme principe
- [Réservation](reservation.md) — les données venant de l'application
- [Configuration](configuration.md) — `CMS_API_URL` et `TENANT_SLUG`
