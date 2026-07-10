import type { LayoutServerLoad } from './$types';
import { fetchCmsContent, pingTenantApi } from '$lib/server/api';
import type { CmsContent } from '$lib/types/api';

export const load: LayoutServerLoad = async ({ fetch }) => {
	// Contenu CMS (pms) et état de la liaison avec l'application de
	// l'établissement (meka_template) — en parallèle, le ping ne doit pas
	// retarder le contenu.
	const [content, apiOnline] = await Promise.all([
		fetchCmsContent<CmsContent>('/content', fetch),
		pingTenantApi(fetch)
	]);

	return { content, apiOnline };
};
