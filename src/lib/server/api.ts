import { env } from '$env/dynamic/private';

/**
 * Client minimal pour les deux APIs consommées par le site :
 * - CMS_API_URL   -> contenu marketing (pms)
 * - TENANT_API_URL -> chambres / menu restaurant (meka_template, cet établissement)
 *
 * Injectées par erp_pms au provisioning du container `web`. En local (hors
 * Docker), définir ces variables dans .env pour pointer vers une instance
 * de dev — voir .env.example.
 */

async function fetchJson<T>(baseUrl: string | undefined, path: string, fetchFn: typeof fetch): Promise<T | null> {
	if (!baseUrl) {
		console.warn(`[api] Variable d'environnement manquante pour l'appel ${path}`);
		return null;
	}

	try {
		const response = await fetchFn(`${baseUrl}${path}`);

		if (!response.ok) {
			// 403 = module désactivé côté établissement (ex: restaurant), pas une erreur à logger bruyamment
			if (response.status !== 403 && response.status !== 404) {
				console.error(`[api] ${path} -> HTTP ${response.status}`);
			}
			return null;
		}

		return (await response.json()) as T;
	} catch (err) {
		console.error(`[api] Échec de l'appel ${path} :`, err);
		return null;
	}
}

export function fetchCmsContent<T>(path: string, fetchFn: typeof fetch): Promise<T | null> {
	const slug = env.TENANT_SLUG;
	if (!slug) {
		console.warn('[api] TENANT_SLUG manquant');
		return Promise.resolve(null);
	}
	return fetchJson<T>(env.CMS_API_URL, `/api/public/establishments/${slug}${path}`, fetchFn);
}

export function fetchTenantApi<T>(path: string, fetchFn: typeof fetch): Promise<T | null> {
	return fetchJson<T>(env.TENANT_API_URL, `/api/v1${path}`, fetchFn);
}

/**
 * Vérifie que l'application de l'établissement (meka_template) répond —
 * pilote l'indicateur vert/rouge de la topbar. Timeout court pour ne pas
 * ralentir le rendu des pages quand l'application est injoignable.
 *
 * Retourne null quand TENANT_API_URL n'est pas configurée (dev local sans
 * API) : le site est en mode démo, l'indicateur reste vert.
 */
export async function pingTenantApi(fetchFn: typeof fetch): Promise<boolean | null> {
	if (!env.TENANT_API_URL) {
		return null;
	}

	try {
		const response = await fetchFn(`${env.TENANT_API_URL}/api/v1/ping`, {
			signal: AbortSignal.timeout(2000)
		});
		return response.ok;
	} catch {
		return false;
	}
}
