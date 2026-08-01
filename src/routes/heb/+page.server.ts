import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { RoomApi } from '$lib/types/api';

export const load: PageServerLoad = async ({ fetch }) => {
	// Chambres individuelles réellement créées dans l'application (une carte
	// par chambre), pas un regroupement par type. L'API renvoie aussi les
	// chambres occupées : elles se réservent pour les dates où elles seront
	// libres, les masquer ferait perdre ces réservations.
	const rooms = await fetchTenantApi<{ data: RoomApi[] }>('/rooms', fetch);

	const list = (rooms?.data ?? []).map((room) => ({
		id: room.id,
		name: room.name ?? 'Chambre',
		number: room.number,
		image: room.photos[0] ?? '/images/IMG8.webp',
		area: room.size_sqm ? `${room.size_sqm} m²` : null,
		capacity: `${room.base_capacity}-${room.max_capacity} pers.`,
		amenities: room.amenities,
		// Template affiche "{price} FCFA/nuit" -> juste le nombre, sans suffixe
		price: new Intl.NumberFormat('fr-FR').format(room.price.amount / 100),
		// État du moment, pour la pastille de la carte. Absent si l'API tourne
		// encore dans une version antérieure : la carte s'affiche sans pastille.
		availability: room.availability ?? null
	}));

	return { rooms: list };
};
