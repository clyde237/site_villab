<script lang="ts">
	import { Check } from '@lucide/svelte';
	import type { OffersSection } from '$lib/types/api';

	let { section = null }: { section?: OffersSection | null } = $props();

	const eyebrow = $derived(section?.subtitle ?? 'Offres Spéciales');
	const title = $derived(section?.title ?? 'Séjours & Engagement Solidaire');

	// Images d'ambiance fixes du template (les offres CMS n'ont pas d'image)
	const cardImages = [
		'https://images.unsplash.com/photo-1518182170546-0766de6b6aad?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=800&auto=format&fit=crop'
	];

	const defaultOffers = [
		{
			badge: 'Famille',
			heading: 'Pack Famille & Culture',
			lines: [
				'10% de réduction pour famille de 4',
				'Visite guidée de la Fondation incluse',
				"Accès aux ateliers d'artisanat pour enfants",
				'Petit-déjeuner inclus chaque matin'
			],
			price: '52 000'
		},
		{
			badge: null,
			heading: null,
			lines: ['3 nuits minimum en Suite Junior', 'Randonnée guidée incluse', 'Repas au Jacaranda inclus'],
			price: '39 000'
		},
		{
			badge: null,
			heading: null,
			lines: ['Suite Junior avec vue collines', 'Dîner aux chandelles au Jacaranda', 'Visite Route des Chefferies'],
			price: '39 000'
		}
	];

	// Offres saisies dans pms (Titre | Description | Prix) — la 1re occupe la
	// grande carte, les 2 suivantes les petites. Repli sur les offres statiques.
	const offers = $derived(
		section?.items?.length
			? section.items.slice(0, 3).map((item) => ({
					badge: item.title,
					heading: item.title,
					lines: item.description ? [item.description] : [],
					price: item.price
				}))
			: defaultOffers
	);

	const bigOffer = $derived(offers[0]);
	const smallOffers = $derived(offers.slice(1, 3));
</script>

<section id="offres" class="py-24 bg-vb-ivory">
	<div class="max-w-[1100px] w-full mx-auto px-4">

		<!-- En-tête de la section -->
		<div class="text-center mb-16">
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center justify-center gap-4">
				<span class="w-8 h-px bg-vb-gold"></span>
				{eyebrow}
				<span class="w-8 h-px bg-vb-gold"></span>
			</span>
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
				{title}
			</h2>
		</div>

		<!-- Grille des Offres (1fr 1fr, gap 2rem) -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

			<!-- GRANDE CARTE (GAUCHE) -->
			{#if bigOffer}
				<div class="relative rounded-[12px] overflow-hidden h-[480px] flex flex-col justify-end p-8 bg-cover bg-center group" style="background-image: url('{cardImages[0]}');">

					<div class="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,18,9,0.78)_0%,transparent_55%)] pointer-events-none transition-opacity duration-300"></div>

					<div class="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
						{#if bigOffer.badge}
							<span class="bg-vb-gold text-vb-white text-[0.68rem] font-bold tracking-[0.07em] uppercase px-3 py-[0.28rem] rounded-[4px] inline-block mb-4">
								{bigOffer.badge}
							</span>
						{/if}

						{#if bigOffer.heading}
							<h3 class="font-serif text-2xl md:text-[1.8rem] text-vb-white mb-4">
								{bigOffer.heading}
							</h3>
						{/if}

						<ul class="flex flex-col gap-2.5 mb-6">
							{#each bigOffer.lines as line}
								<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.95rem]">
									<Check class="w-4 h-4 text-vb-white shrink-0" />
									<span>{line}</span>
								</li>
							{/each}
						</ul>

						{#if bigOffer.price}
							<div class="flex items-baseline gap-2">
								<span class="font-sans text-[1rem] text-vb-gold">A partir de</span>
								<span class="font-serif text-[1.6rem] font-bold text-vb-gold">{bigOffer.price} <span class="font-sans text-[0.85rem] font-normal">FCFA</span></span>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			<!-- PETITES CARTES (DROITE) -->
			<div class="flex flex-col gap-8">
				{#each smallOffers as offer, i}
					<div class="relative rounded-[12px] overflow-hidden h-[224px] flex flex-col justify-end p-6 bg-cover bg-center group" style="background-image: url('{cardImages[i + 1]}');">

						<div class="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,18,9,0.8)_0%,transparent_60%)] pointer-events-none transition-opacity duration-300"></div>

						<div class="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
							{#if offer.heading}
								<h3 class="font-serif text-[1.3rem] text-vb-white mb-3">{offer.heading}</h3>
							{/if}
							<ul class="flex flex-col gap-1.5 mb-3">
								{#each offer.lines as line}
									<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
										<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
										<span>{line}</span>
									</li>
								{/each}
							</ul>
							{#if offer.price}
								<div class="flex items-baseline gap-2">
									<span class="font-sans text-[0.95rem] text-vb-gold">A partir de</span>
									<span class="font-serif text-[1.4rem] font-bold text-vb-gold">{offer.price} <span class="font-sans text-[0.8rem] font-normal">FCFA</span></span>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
