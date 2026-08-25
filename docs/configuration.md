# Configuration

Le site n'a **que quatre variables d'environnement**. C'est toute sa configuration —
il n'y a ni fichier de paramètres, ni panneau d'administration.

En production, elles sont injectées par le `docker-compose` généré par la console
d'administration. Personne ne les édite à la main.

## Les quatre variables

| Variable | Rôle | Absente ⇒ |
|---|---|---|
| `TENANT_SLUG` | Identifie l'établissement auprès du CMS | Aucun contenu CMS — repli statique intégral |
| `CMS_API_URL` | Base de l'API de contenu (l'ERP) | Idem |
| `TENANT_API_URL` | Base de l'API de l'établissement | Ni chambres, ni carte, ni réservation ; mode démo |
| `ORIGIN` | Origine publique du site | **Toute soumission de formulaire est rejetée** |

Elles sont lues via `$env/dynamic/private` : elles ne sont **jamais** exposées au
navigateur, et sont relues à l'exécution — pas figées au build.

## `ORIGIN` — la variable critique

C'est la seule dont l'oubli produit une panne silencieuse et déroutante.

> SvelteKit `adapter-node` valide l'origine des requêtes POST pour se protéger du CSRF.
> Sans `ORIGIN` correctement renseignée, **toute soumission de formulaire est rejetée
> en « cross-site »** — y compris les demandes de réservation.

Le site s'affiche parfaitement, la navigation fonctionne, et seul l'envoi du formulaire
échoue. Facile à ne pas voir en recette si personne ne teste une réservation.

`ORIGIN` doit valoir l'URL **publique** du site, telle qu'elle apparaît dans le
navigateur du visiteur :

```
ORIGIN=https://hotel-exemple.com
```

Elle est injectée automatiquement au provisioning sous la forme
`http://localhost:{web_port}`. Derrière un reverse proxy avec un vrai nom de domaine,
elle doit être ajustée — sinon les réservations cessent de partir.

## `CMS_API_URL` et `TENANT_API_URL`

Ce sont des **bases d'URL**, sans chemin : le client d'API ajoute lui-même les
préfixes.

| Variable | Chemin appelé |
|---|---|
| `CMS_API_URL` | `/api/public/establishments/{TENANT_SLUG}/content` |
| `TENANT_API_URL` | `/api/v1/...` |

### En production : des noms de conteneurs

Les deux URLs pointent vers des **hostnames Docker internes**, sur le réseau partagé
de la plateforme :

```
CMS_API_URL=http://wetchah_erp-app
TENANT_API_URL=http://meka-erp-{slug}-app
```

> Le trafic ne sort jamais sur le réseau public : le site parle à ses deux sources par
> le réseau Docker interne. C'est plus rapide, et l'API de l'établissement n'a pas
> besoin d'être exposée.

### En développement : des adresses locales

```dotenv
CMS_API_URL=http://localhost:8080
TENANT_API_URL=http://localhost:8092
```

Depuis un conteneur local vers des services de l'hôte, utiliser
`http://host.docker.internal:{port}` — c'est ce que fait le
[`docker-compose.yml`](../docker-compose.yml) de test.

## `TENANT_SLUG`

Le slug de l'établissement, tel qu'il est enregistré dans l'ERP. Il ne sert qu'à
construire l'URL du contenu CMS.

> C'est la **seule variable qui distingue deux établissements** utilisant la même
> image. Tout le reste — image, code, styles — est strictement identique.

## Ce qui se passe si une variable manque

Le comportement est explicite et sans exception, par conception :

```ts
if (!baseUrl) {
    console.warn(`[api] Variable d'environnement manquante pour l'appel ${path}`);
    return null;
}
```

| Manque | Effet |
|---|---|
| `TENANT_SLUG` ou `CMS_API_URL` | Avertissement en journal, contenu statique partout |
| `TENANT_API_URL` | Pages hébergement et restaurant vides ; pastille de liaison **verte** (mode démo, pas panne) |
| `ORIGIN` | Le site s'affiche, les formulaires sont rejetés |

C'est ce qui rend le développement local possible sans lancer l'ERP — voir
[Installation](installation.md).

## Variables du serveur Node

`adapter-node` en reconnaît deux autres, fixées dans le
[`Dockerfile`](../Dockerfile) :

| Variable | Valeur |
|---|---|
| `PORT` | `3000` |
| `HOST` | `0.0.0.0` |

Le conteneur écoute donc sur `3000`, et la console le publie sur le port hôte
`web_port` de l'établissement (par défaut `app_port + 1000`).

## Récapitulatif

Fichier `.env` complet pour un développement local :

```dotenv
TENANT_SLUG=weloobe
CMS_API_URL=http://localhost:8080
TENANT_API_URL=http://localhost:8092
```

`ORIGIN` n'est pas nécessaire en développement : `vite dev` ne pratique pas la
validation d'origine d'`adapter-node`.

> **Attention** : c'est précisément pour cette raison qu'un formulaire qui fonctionne
> en `npm run dev` peut échouer en conteneur. Tester les formulaires avec
> `docker compose up` avant de livrer.

## Pour aller plus loin

- [Installation](installation.md) — mise en place locale
- [Déploiement](deploiement.md) — injection en production
- [Réservation](reservation.md) — le formulaire concerné par `ORIGIN`
