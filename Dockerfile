# ─────────────────────────────────────────────────────────────────────────────
# villa_b_site — Dockerfile du site vitrine (SvelteKit / adapter-node)
#
# Ce Dockerfile est partagé entre tous les établissements ayant le module
# "website" activé. Le contenu spécifique (chambres, menu, CMS) est consommé
# à l'exécution via les API distantes (TENANT_API_URL, CMS_API_URL), injectées
# en variables d'environnement par le docker-compose généré par pms.
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1 : build ─────────────────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2 : runtime ────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD node -e "fetch('http://localhost:'+process.env.PORT).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "build"]
