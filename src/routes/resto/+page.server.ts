import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { MenuCategoryApi } from '$lib/types/api';

export const load: PageServerLoad = async ({ fetch }) => {
	// null si le module "restaurant" est désactivé pour cet établissement
	// (l'API renvoie 403 — voir meka_template routes/api.php)
	const menu = await fetchTenantApi<{ data: MenuCategoryApi[] }>('/restaurant/menu', fetch);

	const categories = (menu?.data ?? []).map((cat) => ({
		category: cat.name,
		items: cat.items.map((item) => ({
			id: item.id,
			name: item.name,
			desc: item.description,
			image: item.image,
			// Template affiche "{price} FCFA" -> juste le nombre, sans suffixe
			price: new Intl.NumberFormat('fr-FR').format(item.price.amount / 100)
		}))
	}));

	return { menuCategories: categories };
};
