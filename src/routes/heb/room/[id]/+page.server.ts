import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { RoomTypeApi } from '$lib/types/api';

export const load: PageServerLoad = async ({ params, fetch }) => {
	// L'API renvoie 404 si le type est inactif ou n'a plus aucune chambre
	// disponible (voir PublicRoomController::show côté meka_template).
	const roomType = await fetchTenantApi<{ data: RoomTypeApi }>(`/room-types/${params.id}`, fetch);

	if (!roomType?.data) {
		error(404, 'Cette chambre est introuvable ou n’est plus disponible.');
	}

	const r = roomType.data;

	return {
		room: {
			id: r.id,
			name: r.name,
			description: r.description,
			size: r.size_sqm ? `${r.size_sqm} m²` : null,
			capacity: `${r.base_capacity}-${r.max_capacity} pers.`,
			maxCapacity: r.max_capacity,
			bed: r.bed_configuration,
			amenities: r.amenities,
			photos: r.photos,
			// Même convention que la liste : juste le nombre, le suffixe
			// "FCFA / nuit" est posé par le template.
			price: new Intl.NumberFormat('fr-FR').format(r.price.amount / 100),
			availableCount: r.available_rooms_count
		}
	};
};
