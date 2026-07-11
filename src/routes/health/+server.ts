import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Sonde de santé légère du site vitrine. Contrairement à la page d'accueil,
 * ne déclenche aucun rendu SSR ni fetch externe (CMS / API tenant) : répond
 * immédiatement. Consommée par meka_template (SiteSyncController) pour son
 * indicateur de liaison dans le header.
 */
export const GET: RequestHandler = () => json({ ok: true });

export const prerender = false;
