# Installation

Comme les deux autres dépôts de la plateforme, ce site n'est **jamais installé à la
main en production** : il est provisionné par la console d'administration à partir
d'une image Docker. Voir [Déploiement](deploiement.md).

Ce document couvre le développement local.

## Prérequis

| Élément | Version |
|---|---|
| Node | 22 |
| npm | 10+ |

`.npmrc` porte `engine-strict=true` : une version de Node non conforme fait échouer
l'installation plutôt que de produire un build douteux.

Rien d'autre — ni base de données, ni PHP. Le site n'a besoin que d'un runtime Node.

## 1. Dépendances

```bash
npm install
```

## 2. Environnement

```bash
cp .env.example .env
```

Trois variables, toutes optionnelles en développement :

```dotenv
TENANT_SLUG=weloobe
CMS_API_URL=http://localhost:8080
TENANT_API_URL=http://localhost:8092
```

## 3. Lancer

```bash
npm run dev
```

Le site répond sur <http://localhost:5173>.

---

## Le mode démo

**Sans aucune API configurée, le site fonctionne.** C'est un choix de conception, pas
un effet de bord.

| Élément | Comportement sans API |
|---|---|
| Textes et images | Contenu statique du template |
| Coordonnées | Valeurs de démonstration |
| Chambres, carte | Sections vides |
| Pastille de liaison | **Verte** — absence de configuration ≠ panne |

C'est ce qui permet de travailler l'interface, les styles et les composants sans
lancer l'ERP ni l'application. Voir
[Architecture — la dégradation](architecture.md#la-dégradation-principe-de-conception).

## Se brancher sur un ERP réel

Pour tester avec du vrai contenu, il faut les deux services accessibles :

| Variable | Pointe vers |
|---|---|
| `CMS_API_URL` | Une instance `wetchah_erp` |
| `TENANT_API_URL` | Une instance `wetchah_app` |
| `TENANT_SLUG` | Un établissement existant dans cet ERP |

Vérifier rapidement que les deux répondent :

```bash
curl http://localhost:8080/api/public/establishments/weloobe/content
```

```bash
curl http://localhost:8092/api/v1/ping
```

Si le premier renvoie du JSON et le second `{"ok":true}`, le site aura tout ce qu'il
lui faut.

---

## Tester dans un conteneur

Le [`docker-compose.yml`](../docker-compose.yml) du dépôt existe pour valider le
`Dockerfile` en local. **Ce n'est pas le mécanisme de production** — l'ERP génère son
propre compose par établissement.

```bash
docker compose up --build
```

Le site répond sur <http://localhost:3000>. Les APIs sont jointes via
`host.docker.internal`.

> **Tester les formulaires ici, pas seulement en `npm run dev`.** La validation
> d'origine d'`adapter-node` n'existe qu'en production : une demande de réservation
> qui passe en développement peut être rejetée en conteneur si `ORIGIN` est absente.
> Voir [Configuration](configuration.md#origin--la-variable-critique).

---

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production → `build/` |
| `npm run preview` | Prévisualise le build |
| `npm start` | Lance le serveur Node du build (`node build`) |
| `npm run check` | Vérification TypeScript et Svelte |
| `npm run lint` | Vérifie le formatage |
| `npm run format` | Reformate |

`dev` et `build` passent par `node --max-old-space-size=4096` : le build Tailwind 4
sur ce projet dépasse la limite mémoire par défaut de Node.

---

## Problèmes courants

| Symptôme | Cause |
|---|---|
| Le site affiche des textes génériques | Aucune API configurée, ou CMS injoignable — c'est le mode démo |
| Pastille rouge dans la barre supérieure | `TENANT_API_URL` configurée mais l'application ne répond pas |
| Images cassées | L'`APP_URL` de l'ERP n'est pas joignable depuis le navigateur — les images arrivent en URLs absolues |
| Page hébergement vide | `TENANT_API_URL` absente, ou aucune chambre créée dans l'application |
| Page restaurant vide | Le module `restaurant` est désactivé pour cet établissement (403 attendu, non journalisé) |
| Formulaire rejeté en conteneur | `ORIGIN` absente ou incorrecte |
| `npm install` refusé | Version de Node non conforme (`engine-strict`) |

---

## Pour aller plus loin

- [Configuration](configuration.md) — les quatre variables
- [Développement](developpement.md) — conventions et vérifications
- [Déploiement](deploiement.md) — la production
