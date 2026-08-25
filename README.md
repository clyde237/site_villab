# WeTchah Site — Site vitrine des établissements

Le site public d'un établissement de la plateforme WeTchah : présentation,
hébergements, restaurant, et demande de réservation en ligne.

**Une seule image pour tous les établissements.** Le site n'a ni base de données ni
contenu propre : il assemble à l'exécution deux sources distantes, désignées par ses
variables d'environnement. Seul `TENANT_SLUG` change d'un établissement à l'autre.

---

## Les trois dépôts de la plateforme

| Dépôt | Rôle | Stack |
|---|---|---|
| [`wetchah_erp`](https://github.com/Adrien-Stage/erp_pms) | La console qui fabrique et supervise les établissements | Laravel 12, SQLite |
| [`wetchah_app`](https://github.com/Adrien-Stage/villa_b) | Le PMS livré à chaque établissement | Laravel 12, PostgreSQL |
| **`wetchah_site`** *(ce dépôt)* | Le site vitrine public, optionnel | SvelteKit 2 / Svelte 5 |

---

## D'où vient le contenu

```
       wetchah_erp                         wetchah_app
   contenu marketing, identité         chambres, tarifs, menu
     (textes, images, SEO)              (données réelles, live)
            │                                    │
      CMS_API_URL                         TENANT_API_URL
            └──────────────┬─────────────────────┘
                           ▼
                     wetchah_site
              assemble, rend, et renvoie
              les demandes de réservation
```

Une conséquence utile : **la réception n'a jamais à ressaisir quoi que ce soit pour
le site**. Une chambre créée dans l'application apparaît sur le site ; un plat ajouté
à la carte apparaît au menu.

---

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil — jusqu'à 12 sections activables depuis le CMS |
| `/heb` | Hébergements — catalogue filtrable par dates et capacité |
| `/heb/room/[id]` | Fiche chambre + formulaire de demande de réservation |
| `/resto` | Restaurant — carte tirée de l'application |
| `/about` | À propos |
| `/contact` | Contact et localisation |
| `/health` | Sonde de santé (JSON), sans rendu ni appel externe |

---

## Démarrage rapide

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Sans API configurée, le site tourne en **mode démo** : chaque section retombe sur son
contenu statique. C'est voulu — on peut travailler l'interface sans lancer l'ERP.

Installation complète : **[docs/installation.md](docs/installation.md)**.

---

## Documentation

| Document | Contenu |
|---|---|
| **[Architecture](docs/architecture.md)** | Site sans état, les deux sources, dégradation, structure du code |
| **[Installation](docs/installation.md)** | Développement local, mode démo, branchement sur un ERP réel |
| **[Configuration](docs/configuration.md)** | Les quatre variables d'environnement, et pourquoi `ORIGIN` est critique |
| **[Contenu et CMS](docs/contenu-et-cms.md)** | Sections activables, cascade de repli, contrat de contenu |
| **[Réservation](docs/reservation.md)** | Widget, filtrage par dates, fiche chambre, envoi de la demande |
| **[Déploiement](docs/deploiement.md)** | Image Docker, CI, provisioning, mise à jour |
| **[Développement](docs/developpement.md)** | Conventions Svelte 5, styles, vérifications, dette connue |

---

## Structure du code

```
src/
├─ lib/
│  ├─ server/api.ts        Le seul point d'accès aux APIs distantes
│  ├─ types/api.ts         Contrat de données avec l'ERP et l'application
│  └─ components/
│     ├─ *.svelte          Sections de l'accueil (Hero, Rooms, Offers…)
│     ├─ heb/ resto/       Sections des pages internes
│     ├─ about/ contact/
│     └─ ui/               Primitives shadcn-svelte
└─ routes/
   ├─ +layout.server.ts    Charge le contenu CMS et pinge l'application
   ├─ +page.server.ts      Accueil
   ├─ heb/                 Catalogue et fiche chambre (+ action de réservation)
   ├─ resto/               Carte
   └─ health/              Sonde
```

---

## Licence

Projet propriétaire. Tous droits réservés.
