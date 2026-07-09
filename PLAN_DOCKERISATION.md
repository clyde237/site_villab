# Plan de Dockerisation — villa-b (site vitrine SvelteKit)

> Site vitrine public destiné à terme à consommer l'API du PMS Laravel
> (`villa_b` / `meka_template`) — voir `PLAN_REALISATION_ARCHITECTURE.md`
> du projet `pms`, Phase 3 "Module site web".

---

## État actuel du projet

- **Stack** : SvelteKit 2.63, Svelte 5, Vite 8, TypeScript strict, Tailwind CSS v4, shadcn-svelte
- **Adaptateur** : configuré inline dans `vite.config.ts` (pas de `svelte.config.js` séparé) — actuellement `@sveltejs/adapter-auto`
- **Routes** : 100% statiques/présentationnelles — `/`, `/about`, `/contact`, `/heb`, `/heb/room`, `/resto`
- **Aucun** appel API, **aucune** variable d'environnement, **aucun** `load()` server-side actuellement
- `static/` contient de vrais assets à livrer : 21 images `.webp`, `logo-b.png`, une vidéo `vid.mp4`, `robots.txt`
- Aucun `Dockerfile` existant à ce jour

---

## Plan

### 1. Adaptateur — passer à `@sveltejs/adapter-node`

`adapter-auto` ne convient pas à un déploiement Docker (il cible Vercel/Netlify/etc.). `adapter-node` produit un serveur Node autonome (`build/index.js`), configurable via les variables `PORT`/`HOST` — c'est le choix standard pour un self-hosting.

Cohérent avec l'architecture cible où ce site tournera comme **3ᵉ container par établissement** (`app` + `db` + `web`), comme déjà anticipé dans le plan de `pms` (Phase 3).

### 2. `Dockerfile` multi-stage

Même logique que celui du template applicatif (`meka_template`) :

- **Stage build** : image Node (Alpine), `npm ci`, `npm run build` → produit `build/`
- **Stage runtime** : image Node légère, copie uniquement `build/` + `package.json`/lockfile, `npm ci --omit=dev` (une seule dépendance de prod actuellement : `@fontsource-variable/jost`), lance `node build`
- Port exposé configurable (`PORT`, défaut `3000`)

### 3. `.dockerignore`

Exclut `node_modules`, `.svelte-kit`, `.git`, `.env`, artefacts de build non nécessaires à l'étape de build.

### 4. Ajustements `package.json`

- Ajouter le script `"start": "node build"` (convention `adapter-node`)
- Ajouter `@sveltejs/adapter-node` aux `devDependencies`

### 5. `docker-compose.yml` autonome (local uniquement)

Pour tester le site seul en local — un seul service, port mappé. Sert uniquement au développement/validation du `Dockerfile` ci-dessous ; **n'est pas** le mécanisme utilisé en production (voir §7).

### 6. Test

- Build de l'image
- Lancement du container
- Vérification des 6 routes + des assets statiques (images/vidéo) servis correctement

### 7. CI/CD — publication de l'image sur un registre (pas de build local en prod)

**Décision** : même architecture que `meka_template` (voir `PLAN_REALISATION_ARCHITECTURE.md` de `pms`, Phase 2bis). `pms` ne doit **jamais** cloner ce repo ni builder l'image localement à chaque création d'établissement — c'est exactement le problème (lenteur, espace disque, pannes réseau répétées) qu'on a résolu pour le template applicatif, pas la peine de le réintroduire pour le site.

- `.github/workflows/build-image.yml` — quasi identique à celui de `villa_b` : build + push sur push vers `main`, tags `latest` + `sha-<court>`
- Image publiée : `ghcr.io/clyde237/site_villab` (dérivé automatiquement de `${{ github.repository }}`, le remote `origin` réel de ce repo — package public, comme `villa_b`)
- `pms` (`TenantProvisioningService`) pull cette image **par digest** et l'épingle par établissement — même mécanisme de mise à jour explicite (bouton "Vérifier les mises à jour"), même retry en cas d'échec de pull réseau
- Avantage : le site n'a pas de build lourd (pas de composer, pas de Vite+PHP comme `meka_template`) — image plus légère, build CI plus rapide

---

## Variables d'environnement (finalisé — voir `PLAN_CMS_SITE_VITRINE.md` dans `pms`)

Injectées par `pms` au provisioning du 3ᵉ container `web`, via `$env/dynamic/private` (server-only, jamais exposées au navigateur) :

| Variable | Rôle |
|---|---|
| `TENANT_SLUG` | identifie l'établissement pour les deux appels API ci-dessous |
| `CMS_API_URL` | hostname interne Docker de `pms` (ex: `http://MEKA_ERP-app`) — contenu marketing (`GET /api/public/establishments/{slug}/content`) |
| `TENANT_API_URL` | hostname interne du container applicatif de l'établissement (ex: `http://meka-erp-{slug}-app`) — chambres (`/api/v1/room-types`) et menu restaurant (`/api/v1/restaurant/menu`) |

Le détail du CMS (`pms`) et des APIs opérationnelles (`meka_template`) est dans `PLAN_CMS_SITE_VITRINE.md` (projet `pms`).
