import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { RoomApi } from '$lib/types/api';

export const load: PageServerLoad = async ({ params, fetch }) => {
	// L'API renvoie 404 si la chambre est inactive ou indisponible
	// (voir PublicRoomController::roomShow côté meka_template).
	const room = await fetchTenantApi<{ data: RoomApi }>(`/rooms/${params.id}`, fetch);

	if (!room?.data) {
		error(404, 'Cette chambre est introuvable ou n’est plus disponible.');
	}

	const r = room.data;

	return {
		room: {
			id: r.id,
			name: r.name ?? 'Chambre',
			number: r.number,
			floor: r.floor,
			view: r.view_type,
			description: r.description,
			size: r.size_sqm ? `${r.size_sqm} m²` : null,
			capacity: `${r.base_capacity}-${r.max_capacity} pers.`,
			maxCapacity: r.max_capacity,
			bed: r.bed_configuration,
			amenities: r.amenities,
			photos: r.photos,
			// Même convention que la liste : juste le nombre, le suffixe
			// "FCFA / nuit" est posé par le template.
			price: new Intl.NumberFormat('fr-FR').format(r.price.amount / 100)
		}
	};
};
