<script lang="ts">
	import { CalendarCheck, X } from '@lucide/svelte';

	/**
	 * Récapitulatif d'une recherche de disponibilité.
	 *
	 * Sans lui, un visiteur arrivant sur une liste raccourcie ne saurait pas
	 * qu'un filtre est actif, et croirait l'établissement presque complet.
	 */
	let {
		recherche,
		nbResultats,
		totalCatalogue
	}: {
		recherche: { arrivee: string; depart: string; adultes: number; enfants: number; voyageurs: number };
		nbResultats: number;
		totalCatalogue: number;
	} = $props();

	const jour = (iso: string) =>
		new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'long'
		});

	const nuits = $derived(
		Math.round(
			(new Date(recherche.depart).getTime() - new Date(recherche.arrivee).getTime()) / 86_400_000
		)
	);

	const voyageurs = $derived(
		[
			`${recherche.adultes} adulte${recherche.adultes > 1 ? 's' : ''}`,
			recherche.enfants > 0 ? `${recherche.enfants} enfant${recherche.enfants > 1 ? 's' : ''}` : null
		]
			.filter(Boolean)
			.join(', ')
	);
</script>

<section class="bg-vb-ivory border-b border-vb-ivory3">
	<div class="max-w-[1300px] w-full mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-start gap-3">
			<CalendarCheck class="w-5 h-5 text-vb-gold shrink-0 mt-0.5" />
			<div>
				<p class="font-sans text-[0.95rem] text-vb-dark">
					<span class="font-semibold">
						{nbResultats} chambre{nbResultats > 1 ? 's' : ''} disponible{nbResultats > 1 ? 's' : ''}
					</span>
					du {jour(recherche.arrivee)} au {jour(recherche.depart)}
					<span class="text-vb-slate">({nuits} nuit{nuits > 1 ? 's' : ''})</span>
				</p>
				<p class="font-sans text-[0.8rem] text-vb-slate mt-0.5">
					Pour {voyageurs} · {totalCatalogue - nbResultats} chambre{totalCatalogue - nbResultats > 1 ? 's' : ''}
					écartée{totalCatalogue - nbResultats > 1 ? 's' : ''} (occupée ou trop petite)
				</p>
			</div>
		</div>

		<a
			href="/heb"
			class="shrink-0 inline-flex items-center gap-1.5 font-sans text-[0.8rem] font-semibold text-vb-slate hover:text-vb-green transition-colors"
		>
			<X class="w-3.5 h-3.5" />
			Voir toutes les chambres
		</a>
	</div>
</section>
