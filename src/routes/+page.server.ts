import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { RoomTypeApi } from '$lib/types/api';

export const load: PageServerLoad = async ({ fetch }) => {
	// Section "Nos hébergements" de l'accueil : 3 types de chambres mis en
	// avant, récupérés depuis l'application de l'établissement (mêmes données
	// que la page Hébergements — le tri "les plus réservés" viendra quand
	// l'API l'exposera, en attendant l'ordre de l'API fait foi).
	const roomTypes = await fetchTenantApi<{ data: RoomTypeApi[] }>('/room-types', fetch);

	return { homeRoomTypes: (roomTypes?.data ?? []).slice(0, 3) };
};
