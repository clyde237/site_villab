# Déploiement

## Une image, tous les établissements

Le site n'est jamais déployé individuellement. Une **seule image Docker** est publiée,
et la console d'administration l'instancie autant de fois qu'il y a d'établissements
avec le module `website` activé.

```
push sur main
     ↓
GitHub Actions build l'image → ghcr.io/clyde237/site_villab (latest + sha-<court>)
     ↓
la console tire l'image, l'épingle sur un digest exact
     ↓
3ᵉ conteneur de l'établissement, à côté de app et db
```

> Ce qui distingue deux sites n'est **pas l'image** — elle est strictement identique —
> mais les quatre variables d'environnement injectées, dont `TENANT_SLUG`. Tout le
> contenu vit dans les APIs.

## La CI

[`.github/workflows/build-image.yml`](../.github/workflows/build-image.yml) — sur
chaque push sur `main`, et manuellement via `workflow_dispatch` :

- build et push vers GHCR ;
- deux tags : `latest` et `sha-<court>` ;
- cache GitHub Actions (`type=gha`) pour accélérer les builds successifs.

Le tag `sha-` est ce qui rend une mise à jour **réversible** : la console peut
réépingler un établissement sur une version antérieure.

L'image est publique — aucune authentification n'est requise pour le pull.

## Le Dockerfile

[`Dockerfile`](../Dockerfile) — multi-étapes, base `node:22-alpine`.

| Étape | Contenu |
|---|---|
| **build** | `npm ci`, copie des sources, `npm run build` |
| **runtime** | `npm ci --omit=dev`, copie du seul dossier `build/` |

L'image finale ne contient ni sources, ni dépendances de développement, ni
`node_modules` de build.

```dockerfile
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0
CMD ["node", "build"]
```

### Le healthcheck

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD node -e "fetch('http://localhost:'+process.env.PORT)..."
```

Il interroge la racine du site. La route [`/health`](../src/routes/health/+server.ts)
existe en complément, pour un usage différent :

> `/health` ne déclenche **aucun rendu SSR ni appel externe** — ni CMS, ni API de
> l'établissement. Elle répond immédiatement. C'est ce qui la rend utilisable comme
> sonde de liaison depuis `wetchah_app`, sans coût ni faux négatif quand une API
> tierce est lente.

## Ce que la console injecte

Le `docker-compose` généré par `wetchah_erp` produit, pour un établissement avec le
module `website` :

```yaml
meka-erp-{slug}-web:
  image: ghcr.io/clyde237/site_villab@sha256:...
  container_name: meka-erp-{slug}-web
  restart: unless-stopped
  ports:
    - "{web_port}:3000"
  environment:
    TENANT_SLUG: "{slug}"
    CMS_API_URL: "http://wetchah_erp-app"
    TENANT_API_URL: "http://meka-erp-{slug}-app"
    ORIGIN: "http://localhost:{web_port}"
  depends_on:
    - meka-erp-{slug}-app
  networks:
    - pms
```

| Point | Détail |
|---|---|
| **Image épinglée par digest** | Un nouveau build n'impacte aucun site existant |
| **Port** | `web_port` sur l'hôte, par défaut `app_port + 1000` |
| **URLs internes** | Noms de conteneurs sur le réseau Docker partagé — le trafic ne sort jamais |
| **`ORIGIN`** | Requis par la protection CSRF d'`adapter-node` |

## Activer le site pour un établissement

Depuis la console, cocher le module **`website`** dans la fiche de l'établissement.

> Cocher `website` active **automatiquement** `api` : le site consomme l'API de
> l'établissement, l'activer sans elle produirait un site vide.

L'application des modules régénère le compose et crée le conteneur. Désactiver le
module supprime le conteneur — **le contenu saisi reste en base** et est retrouvé
intact à la réactivation.

## Mettre à jour un site

Deux opérations distinctes, à ne pas confondre :

| Action | Effet | Redémarrage ? |
|---|---|---|
| **Modifier le contenu** | Écrit dans le CMS de l'ERP | Non — relu à chaque rendu |
| **Mettre à jour l'image** | Réépingle `web_image_tag`, recrée le conteneur | Oui |

La mise à jour d'image se fait depuis la console
(`POST /tech/establishments/{tenant}/update-website`), avec journaux en direct.

> Un éditeur non technique ne touche donc **jamais** à l'infrastructure : corriger un
> texte ne redéploie rien.

## Derrière un reverse proxy

Le projet ne fournit pas de reverse proxy. Pour exposer un site sur un vrai nom de
domaine en HTTPS, il faut en placer un devant le conteneur — et **ajuster `ORIGIN`**
en conséquence :

```
ORIGIN=https://hotel-exemple.com
```

> C'est l'oubli le plus coûteux de la mise en production : le site s'affiche
> parfaitement, et seules les demandes de réservation sont silencieusement rejetées.

## Vérifier un déploiement

```bash
curl http://localhost:{web_port}/health
```

Doit renvoyer `{"ok":true}` immédiatement.

Puis, dans l'ordre de dépendance :

1. **La page d'accueil affiche le bon nom d'établissement** → le CMS répond ;
2. **La pastille de la barre supérieure est verte** → l'application répond ;
3. **La page hébergement liste des chambres** → l'API `/rooms` répond ;
4. **Une demande de réservation aboutit** → `ORIGIN` est correcte.

Les quatre points couvrent chacun une dépendance différente : les tester dans cet
ordre localise la panne sans chercher.

## Incidents courants

| Symptôme | Cause probable |
|---|---|
| Site vierge, textes génériques | `CMS_API_URL` ou `TENANT_SLUG` incorrects, ou ERP injoignable |
| Pastille rouge | Le conteneur `app` de l'établissement ne répond pas |
| Images cassées | L'`APP_URL` de l'ERP n'est pas joignable depuis le navigateur du visiteur |
| Page restaurant vide | Module `restaurant` désactivé côté établissement — comportement normal |
| Réservations rejetées | `ORIGIN` incorrecte, typiquement après ajout d'un nom de domaine |
| Le conteneur redémarre en boucle | Vérifier `docker logs meka-erp-{slug}-web` |

## Pour aller plus loin

- [Configuration](configuration.md) — les variables injectées
- [Architecture](architecture.md) — les deux sources
- [Réservation](reservation.md) — le formulaire concerné par `ORIGIN`
