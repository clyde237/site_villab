# Développement

## Stack

| Élément | Version |
|---|---|
| SvelteKit | 2.63 |
| Svelte | 5, **mode runes forcé** |
| Vite | 8 |
| TypeScript | strict |
| Tailwind CSS | 4 |
| Composants | shadcn-svelte (style `nova`), icônes Lucide |
| Polices | Jost (texte), Playfair Display (titres) |
| Adaptateur | `@sveltejs/adapter-node` |

## Deux particularités de configuration

### L'adaptateur est dans `vite.config.ts`

Il n'y a **pas de `svelte.config.js`**. L'adaptateur et les options du compilateur
sont déclarés inline dans [`vite.config.ts`](../vite.config.ts).

C'est inhabituel : chercher au bon endroit avant de conclure à une configuration
manquante.

### Le mode runes est forcé

```ts
runes: ({ filename }) =>
    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
```

Tout le code du projet est en mode runes ; les bibliothèques gardent leur propre mode.
La ligne pourra disparaître avec Svelte 6.

## Conventions Svelte 5

### Props

```ts
let { content = null }: { content?: CmsContent | null } = $props();
```

Les props liées au CMS sont **toujours optionnelles avec `null` par défaut** : un
composant doit pouvoir se rendre sans contenu.

### `$derived` pour la cascade de repli

```ts
const hero = $derived(content?.pages?.home?.hero ?? null);
let title = $derived(hero?.title ?? content?.hero.title ?? 'Texte statique');
```

C'est le motif le plus répété du projet. Voir
[Contenu et CMS](contenu-et-cms.md#la-cascade-de-repli).

### `$effect` quand le composant n'est pas remonté

Sur la fiche chambre, les dates préremplies passent par un `$effect` et non par une
valeur initiale :

> En passant d'une chambre à l'autre, le composant n'est pas remonté ; des dates
> figées au premier rendu resteraient celles de la chambre précédente. L'effet ne
> dépend pas de `checkIn`, donc il n'écrase pas ce que le visiteur a saisi.

Ne pas « simplifier » ce bloc en `$state` initialisé — c'est un bug corrigé.

## Où mettre quoi

| Besoin | Emplacement |
|---|---|
| Appel à une API | **Uniquement** [`src/lib/server/api.ts`](../src/lib/server/api.ts) |
| Chargement de données | `+page.server.ts` / `+layout.server.ts` |
| Type d'une réponse d'API | [`src/lib/types/api.ts`](../src/lib/types/api.ts) |
| Section d'une page | `src/lib/components/{page}/` |
| Section de l'accueil | `src/lib/components/` (racine) |
| Primitive d'interface | `src/lib/components/ui/` (shadcn) |

> **Aucun composant ne fait d'appel réseau.** Les données descendent par les props
> depuis les `load()` serveur. C'est ce qui garde les URLs internes hors du navigateur
> et le rendu complet au premier octet.

Le nommage des composants suit le schéma CMS : `pages.resto.experience` ↔
`resto/Experience.svelte`. Conserver cette correspondance rend le rapprochement
immédiat.

## Styles

Le thème vit dans [`src/routes/layout.css`](../src/routes/layout.css), en deux temps :

1. **La palette**, en variables `--vb-*` : verts, ors, ivoires, sombres, ardoises ;
2. **Le mappage vers shadcn** : `--primary`, `--secondary`, `--muted`, `--accent`…

Les classes utilitaires suivent la palette (`bg-vb-gold`, `text-vb-slate`).

> Le préfixe `vb-` vient de « Villa Boutanga », le premier établissement. Il est
> désormais générique — **ne pas le lire comme une spécificité client**. Le renommer
> toucherait la totalité des composants pour un gain nul.

## Vérifications

```bash
npm run check
```

```bash
npm run lint
```

### État actuel

| Vérification | Résultat |
|---|---|
| `npm run check` | **0 erreur**, 2 avertissements |
| `npm run lint` | **51 fichiers** non conformes au formatage |

Les deux avertissements de `check` :

- `resto/Menu.svelte:17` — `state_referenced_locally` : `activeCategory` capture la
  valeur initiale de `categories`. Sans effet visible aujourd'hui (les catégories ne
  changent pas après le rendu), mais l'onglet actif ne se réinitialiserait pas si
  elles changeaient.
- `tsconfig.json` — types `node` introuvables : `@types/node` n'est pas installé.

Le formatage n'a **jamais été appliqué** au projet, bien que Prettier soit configuré.
Le corriger d'un coup produirait un diff de 51 fichiers qui noierait tout historique
utile — à faire dans un commit dédié, isolé, si l'équipe le souhaite.

## Tests

**Il n'y en a pas.** Aucun framework de test n'est installé.

C'est la principale lacune du dépôt. Les zones qui en bénéficieraient le plus, par
ordre de risque :

| Zone | Pourquoi |
|---|---|
| `estOccupee` / `overlapsBusy` | La règle des bornes semi-ouvertes est dupliquée en trois endroits et silencieuse quand elle se trompe |
| `lireRecherche` | Analyse de paramètres d'URL non fiables |
| La cascade de repli | Une régression donne une page générique, sans erreur |
| L'action de réservation | Les trois issues (201, 0, autre) ne sont vérifiées nulle part |

## Dette technique connue

| Sujet | Détail |
|---|---|
| **Aucun test** | Voir ci-dessus |
| **51 fichiers non formatés** | Prettier configuré mais jamais appliqué |
| **`@types/node` manquant** | Avertissement `tsconfig` |
| **Nom du paquet `villa-b`** | `package.json` porte encore le nom du premier établissement |
| **`PLAN_DOCKERISATION.md` obsolète** | Décrit l'état d'avant la dockerisation (« aucun appel API, aucune variable d'environnement ») — document historique |
| **Règle de chevauchement dupliquée** | Présente dans `heb/+page.server.ts`, `heb/room/[id]/+page.svelte`, et côté `wetchah_app`. Trois copies à faire évoluer ensemble |

## Le point de rupture de la plateforme

[`src/lib/types/api.ts`](../src/lib/types/api.ts) décrit des **réponses HTTP**, pas des
imports.

> Un champ renommé côté Laravel ne casse pas la compilation ici. La panne apparaît à
> l'exécution, sous forme de section vide ou de valeur `undefined` — sans erreur.

Toute évolution des APIs de `wetchah_erp` ou `wetchah_app` doit donc être répercutée
dans ce fichier **et** vérifiée sur le site. C'est le contrat le moins protégé de la
plateforme.

## Travailler avec les autres dépôts

| Besoin | Où |
|---|---|
| Modifier un texte, une image, le SEO | `wetchah_erp`, espace éditeur — aucun déploiement |
| Ajouter un champ au CMS | `wetchah_erp` (`SiteContentSchema`) **puis** ici |
| Modifier les données de chambres ou la carte | `wetchah_app` |
| Activer le site pour un établissement | `wetchah_erp`, module `website` |

> Modifier ce dépôt ne change rien à un site en service : chaque conteneur est épinglé
> sur un digest d'image. La mise à jour est un acte explicite depuis la console. Voir
> [Déploiement](deploiement.md).

## Pour aller plus loin

- [Architecture](architecture.md) — structure et principes
- [Installation](installation.md) — environnement local
- [Réservation](reservation.md) — la logique la plus dense du projet
