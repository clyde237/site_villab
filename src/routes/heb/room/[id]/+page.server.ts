import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { fetchTenantApi, postTenantApi } from '$lib/server/api';
import type { RoomApi } from '$lib/types/api';

const FORMAT_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const load: PageServerLoad = async ({ params, fetch, url }) => {
	// L'API renvoie 404 si la chambre est inactive, en maintenance ou hors
	// service (voir PublicRoomController::roomShow côté wetchah_app). Une
	// chambre occupée, elle, répond bien : elle se réserve pour plus tard.
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
			price: new Intl.NumberFormat('fr-FR').format(r.price.amount / 100),
			// Périodes prises et première date libre : le formulaire s'en sert
			// pour refuser sur place les dates que l'API rejetterait en 409.
			availability: r.availability ?? null
		},
		// Critères venant du widget de réservation : le visiteur qui a cherché
		// des dates les retrouve préremplies, au lieu de les ressaisir.
		prefill: {
			arrivee: FORMAT_DATE.test(url.searchParams.get('arrivee') ?? '') ? url.searchParams.get('arrivee')! : '',
			depart: FORMAT_DATE.test(url.searchParams.get('depart') ?? '') ? url.searchParams.get('depart')! : '',
			voyageurs: Math.max(
				1,
				Number(url.searchParams.get('adultes') ?? 0) + Number(url.searchParams.get('enfants') ?? 0) || 0
			)
		}
	};
};

export const actions: Actions = {
	/**
	 * Envoi d'une demande de réservation vers l'application de l'établissement.
	 * Renvoie les valeurs saisies en cas d'erreur pour repeupler le formulaire.
	 */
	default: async ({ params, request, fetch }) => {
		const form = await request.formData();

		const values = {
			first_name: String(form.get('first_name') ?? '').trim(),
			last_name: String(form.get('last_name') ?? '').trim(),
			phone: String(form.get('phone') ?? '').trim(),
			email: String(form.get('email') ?? '').trim(),
			check_in: String(form.get('check_in') ?? ''),
			check_out: String(form.get('check_out') ?? ''),
			adults: Number(form.get('guests') ?? 1),
			notes: String(form.get('notes') ?? '').trim()
		};

		// Validation minimale côté site (l'API revalide de toute façon)
		if (!values.first_name || !values.last_name || !values.phone || !values.check_in || !values.check_out) {
			return fail(422, { ...values, error: 'Merci de renseigner votre nom, téléphone et les dates de séjour.' });
		}
		if (values.check_out <= values.check_in) {
			return fail(422, { ...values, error: 'La date de départ doit être postérieure à la date d’arrivée.' });
		}

		const { status, data } = await postTenantApi<{
			ok: boolean;
			booking_number?: string;
			message?: string;
		}>(
			'/bookings',
			{
				room_id: Number(params.id),
				check_in: values.check_in,
				check_out: values.check_out,
				adults: values.adults,
				first_name: values.first_name,
				last_name: values.last_name,
				email: values.email || null,
				phone: values.phone,
				notes: values.notes || null
			},
			fetch
		);

		if (status === 201 && data?.ok) {
			return { success: true, bookingNumber: data.booking_number };
		}

		const message =
			data?.message ??
			(status === 0
				? "Le service de réservation est momentanément indisponible. Réessayez plus tard."
				: 'La demande n’a pas pu être enregistrée. Vérifiez vos informations et réessayez.');

		return fail(status || 500, { ...values, error: message });
	}
};
