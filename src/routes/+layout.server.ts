import type { LayoutServerLoad } from './$types';
import { fetchCmsContent } from '$lib/server/api';
import type { CmsContent } from '$lib/types/api';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const content = await fetchCmsContent<CmsContent>('/content', fetch);

	return { content };
};
