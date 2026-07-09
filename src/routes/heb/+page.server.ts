import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { RoomTypeApi } from '$lib/types/api';

export const load: PageServerLoad = async ({ fetch }) => {
	const roomTypes = await fetchTenantApi<{ data: RoomTypeApi[] }>('/room-types', fetch);

	const rooms = (roomTypes?.data ?? []).map((room) => ({
		id: room.id,
		name: room.name,
		image: room.photos[0] ?? '/images/IMG8.webp',
		area: room.size_sqm ? `${room.size_sqm} m²` : null,
		capacity: `${room.base_capacity}-${room.max_capacity} pers.`,
		amenities: room.amenities,
		// Template affiche "{price} FCFA/nuit" -> juste le nombre, sans suffixe
		price: new Intl.NumberFormat('fr-FR').format(room.price.amount / 100)
	}));

	return { rooms };
};
