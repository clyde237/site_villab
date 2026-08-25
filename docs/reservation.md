# Réservation

Le parcours complet du visiteur, de la recherche à l'envoi de sa demande. C'est la
partie la plus fonctionnelle du site, et la seule qui écrit quelque chose.

## Le parcours

```
Accueil                Hébergements              Fiche chambre
BookingWidget    →     /heb?arrivee=…      →     /heb/room/{id}?arrivee=…
recherche              catalogue filtré           formulaire prérempli
                                                        │
                                                        ▼
                                          POST /api/v1/bookings (wetchah_app)
                                                        │
                                                        ▼
                                     réservation « pending », source « website »
                                     managers et réception notifiés
```

Aucune réservation n'est confirmée automatiquement : le site produit une **demande**,
que la réception valide.

## 1. Le widget de recherche

[`BookingWidget.svelte`](../src/lib/components/BookingWidget.svelte), posé en
chevauchement sous la bannière d'accueil. Quatre champs : arrivée, départ, adultes,
enfants.

### Il ne cherche pas lui-même

> Le widget **emmène** le visiteur sur `/heb` avec ses critères en paramètres d'URL.
> C'est là que le filtrage a lieu.

Le choix de l'URL plutôt qu'un état en mémoire est délibéré :

> Les critères restent **lisibles, partageables et rechargeables**, et survivent au
> retour arrière. Une recherche en mémoire ne le permettrait pas — un lien envoyé à
> un conjoint arriverait sur un catalogue non filtré.

### Validation immédiate

Le champ de départ est borné à la date d'arrivée (`min={minDepart}`) plutôt que de
laisser saisir puis refuser. Deux erreurs restent possibles et sont affichées sous le
formulaire, le bouton étant désactivé :

- date de départ antérieure ou égale à l'arrivée ;
- date d'arrivée déjà passée.

Le widget est masqué sous le point de rupture `md` — il ne tiendrait pas sur mobile.

## 2. Le catalogue filtré

[`heb/+page.server.ts`](../src/routes/heb/+page.server.ts).

### Les chambres, pas les types

Le site affiche **une carte par chambre physique** réellement créée dans
l'application (`/api/v1/rooms`), pas un regroupement par catégorie. Le visiteur
réserve une chambre identifiée, pas un type.

### Les chambres occupées restent affichées

C'est la décision la plus contre-intuitive du module :

> Une chambre prise cette semaine se réserve pour le mois prochain. La masquer ferait
> perdre la réservation.

Chaque chambre porte donc `availability.busy_ranges` — les périodes déjà prises sur
douze mois — et c'est la **période demandée**, jamais le statut courant, qui décide.

Restent masquées par l'API les chambres en maintenance ou hors service : leur
indisponibilité n'a pas d'échéance, les afficher n'offrirait qu'une carte sur laquelle
aucune date n'est retenable.

### Le filtre

Deux critères, appliqués seulement si la recherche est valide :

```ts
room.max_capacity >= recherche.voyageurs && !estOccupee(room, arrivee, depart)
```

Le chevauchement suit la règle de `wetchah_app` :

```ts
// [a, b) chevauche [from, to) si a < to et from < b
arrivee < periode.to && periode.from < depart
```

> **Bornes semi-ouvertes des deux côtés** : le jour du départ d'un client est
> réservable par le suivant. Sans cela, chaque départ masquerait à tort une chambre
> disponible.

### Une recherche mal formée est ignorée

```ts
if (!FORMAT_DATE.test(arrivee) || !FORMAT_DATE.test(depart) || depart <= arrivee) {
    return null;
}
```

> Sans deux dates valides et cohérentes, le catalogue complet est affiché. **Mieux
> vaut un catalogue complet qu'une page vide sur un paramètre mal formé** — un lien
> tronqué ne doit pas donner l'impression d'un établissement sans chambres.

### Distinguer les deux « aucun résultat »

Le loader renvoie `totalCatalogue` en plus de la liste filtrée. Cela permet à
[`SearchSummary`](../src/lib/components/heb/SearchSummary.svelte) de distinguer :

- « aucune chambre au catalogue » — l'établissement n'en a pas encore créé ;
- « aucune chambre pour ces dates » — le filtre est trop restrictif.

Les deux appellent des messages, et des actions, différents.

Le récapitulatif de recherche existe pour une raison précise :

> Sans lui, un visiteur arrivant sur une liste raccourcie ne saurait pas qu'un filtre
> est actif, et croirait l'établissement presque complet.

Il propose donc aussi de retirer le filtre.

### Les critères suivent

Le lien de chaque carte reporte les critères vers la fiche chambre : le visiteur
retrouve ses dates préremplies au lieu de les ressaisir.

## 3. La pastille d'état

[`AvailabilityBadge.svelte`](../src/lib/components/heb/AvailabilityBadge.svelte) —
quatre états, avec leur code couleur et leur icône :

| État | Rendu | Signification |
|---|---|---|
| `available` | Vert | Occupable immédiatement |
| `preparing` | Ambre | En cours de remise en état |
| `occupied` | Gris | Occupée — le libellé dit jusqu'à quand |
| `unavailable` | Gris pâle | Indisponible |

Le libellé (`« Occupée jusqu'au 15 septembre »`) est **calculé côté application** et
servi prêt à l'affichage : le site ne le compose pas.

> Si `availability` est absent — API dans une version antérieure — la pastille n'est
> pas affichée du tout. **Rien plutôt qu'un état inventé.**

## 4. La fiche chambre

[`heb/room/[id]/+page.server.ts`](../src/routes/heb/room/[id]/+page.server.ts) et sa
page.

Un 404 de l'API donne un 404 propre : la chambre est inactive, en maintenance ou hors
service. Une chambre occupée, elle, répond bien — elle se réserve pour plus tard.

### Le préremplissage

Les critères venant du widget préremplissent le formulaire, via un `$effect` et non
une valeur initiale :

> En passant d'une chambre à l'autre, le composant n'est pas remonté ; des dates
> figées au premier rendu resteraient celles de la chambre précédente. L'effet ne
> dépend pas de `checkIn`, donc il n'écrase pas ce que le visiteur a saisi.

C'est une subtilité de Svelte 5 qui mérite d'être connue avant de « simplifier » ce
bloc.

### Refuser sur place plutôt qu'après coup

Le formulaire dispose des `busy_ranges` de la chambre et refuse **localement** les
dates qui produiraient un conflit :

```ts
if (overlapsBusy(checkIn, checkOut)) {
    return 'Cette chambre est déjà occupée sur cette période. Choisissez d’autres dates.';
}
```

> Sans cela, la demande partirait pour revenir en 409 après un aller-retour réseau.
> Le visiteur est informé pendant qu'il saisit, pas après avoir cliqué.

Le champ d'arrivée est par ailleurs borné à `available_from`, et les quatre prochaines
périodes occupées sont affichées, formulées pour être lues d'un coup d'œil
(`12 sept → 15 sept`).

### Les équipements

Les équipements sont des libellés libres saisis dans l'application. Le site associe une
icône par mot-clé, avec un repli générique : un libellé imprévu s'affiche quand même.

## 5. L'envoi

Une *form action* SvelteKit, dans le même `+page.server.ts`.

### Validation minimale côté site

Nom, prénom, téléphone et dates sont obligatoires ; le départ doit suivre l'arrivée.

> La validation reste **volontairement minimale** : l'API revalide de toute façon.
> Dupliquer ici toutes ses règles créerait deux vérités à maintenir.

### L'appel

```
POST {TENANT_API_URL}/api/v1/bookings
```

Sans authentification, protégé côté application par un throttle `10,1`.

### Les trois issues

| Statut | Traitement |
|---|---|
| `201` + `ok: true` | Succès — le numéro de réservation est affiché |
| `0` | API injoignable : « Le service de réservation est momentanément indisponible. » |
| Autre | Message de l'API si elle en fournit un, sinon message générique |

En cas d'échec, `fail()` renvoie **toutes les valeurs saisies** : le formulaire est
repeuplé, le visiteur ne ressaisit rien.

Le statut `0` est produit par `postTenantApi` lorsque `TENANT_API_URL` est absente ou
que l'appel jette — il permet de distinguer une panne d'infrastructure d'un refus
métier, et donc de dire au visiteur de réessayer plus tard plutôt que de corriger ses
informations.

### Côté application

La demande crée une réservation au statut `pending`, source `website`. Managers et
réception sont notifiés en interne et par push
(`WebsiteBookingReceived`). **Rien n'est confirmé automatiquement.**

## Le piège `ORIGIN`

> Si `ORIGIN` n'est pas correctement configurée en production, **cette form action est
> rejetée en « cross-site »** par la protection CSRF d'`adapter-node`. Le site
> s'affiche parfaitement, seule la réservation échoue.

`vite dev` ne pratique pas cette validation : un formulaire qui fonctionne en
développement peut échouer en conteneur. Voir
[Configuration](configuration.md#origin--la-variable-critique).

## Pour aller plus loin

- [Configuration](configuration.md) — `TENANT_API_URL` et `ORIGIN`
- [Architecture](architecture.md) — le client d'API et la dégradation
- [Contenu et CMS](contenu-et-cms.md) — les textes qui entourent le formulaire
