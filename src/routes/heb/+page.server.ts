import type { PageServerLoad } from './$types';
import { fetchTenantApi } from '$lib/server/api';
import type { RoomApi } from '$lib/types/api';

/**
 * Critères issus du widget de réservation de l'accueil.
 *
 * Ils transitent par l'URL plutôt que par un état en mémoire : la recherche
 * reste partageable, rechargeable, et survit au retour arrière.
 */
type Recherche = {
	arrivee: string;
	depart: string;
	adultes: number;
	enfants: number;
	voyageurs: number;
};

const FORMAT_DATE = /^\d{4}-\d{2}-\d{2}$/;

function lireRecherche(url: URL): Recherche | null {
	const arrivee = url.searchParams.get('arrivee') ?? '';
	const depart = url.searchParams.get('depart') ?? '';

	// Sans deux dates valides et cohérentes, on ignore la recherche et on
	// affiche tout le catalogue : mieux vaut un catalogue complet qu'une page
	// vide sur un paramètre mal formé.
	if (!FORMAT_DATE.test(arrivee) || !FORMAT_DATE.test(depart) || depart <= arrivee) {
		return null;
	}

	const adultes = Math.max(1, Number(url.searchParams.get('adultes') ?? 1) || 1);
	const enfants = Math.max(0, Number(url.searchParams.get('enfants') ?? 0) || 0);

	return { arrivee, depart, adultes, enfants, voyageurs: adultes + enfants };
}

/**
 * Un séjour [a, b) chevauche une période prise [from, to) si a < to et from < b.
 *
 * Bornes semi-ouvertes des deux côtés, comme dans wetchah_app : le jour du
 * départ d'un client est réservable par le suivant. Sans cela, chaque départ
 * masquerait à tort une chambre disponible.
 */
function estOccupee(room: RoomApi, arrivee: string, depart: string): boolean {
	return (room.availability?.busy_ranges ?? []).some(
		(periode) => arrivee < periode.to && periode.from < depart
	);
}

export const load: PageServerLoad = async ({ fetch, url }) => {
	// Chambres individuelles réellement créées dans l'application (une carte
	// par chambre), pas un regroupement par type. L'API renvoie aussi les
	// chambres occupées : elles se réservent pour les dates où elles seront
	// libres, les masquer ferait perdre ces réservations.
	const rooms = await fetchTenantApi<{ data: RoomApi[] }>('/rooms', fetch);
	const recherche = lireRecherche(url);

	const toutes = rooms?.data ?? [];

	const retenues = recherche
		? toutes.filter(
				(room) =>
					room.max_capacity >= recherche.voyageurs &&
					!estOccupee(room, recherche.arrivee, recherche.depart)
			)
		: toutes;

	// Les critères suivent jusqu'à la fiche chambre : le visiteur retrouve ses
	// dates préremplies dans le formulaire au lieu de les ressaisir.
	const suffixe = recherche
		? '?' +
			new URLSearchParams({
				arrivee: recherche.arrivee,
				depart: recherche.depart,
				adultes: String(recherche.adultes),
				enfants: String(recherche.enfants)
			})
		: '';

	const list = retenues.map((room) => ({
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
		availability: room.availability ?? null,
		lien: `/heb/room/${room.id}${suffixe}`
	}));

	return {
		rooms: list,
		recherche,
		// Sert à distinguer « aucune chambre au catalogue » de « aucune chambre
		// pour ces dates » : les deux appellent des messages différents.
		totalCatalogue: toutes.length
	};
};
