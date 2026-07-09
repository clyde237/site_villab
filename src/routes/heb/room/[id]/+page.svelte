<script lang="ts">
	import {
		ChevronRight,
		Maximize,
		User,
		BedDouble,
		Wifi,
		Coffee,
		Wind,
		CheckCircle2,
		Mountain,
		Tv,
		ShowerHead
	} from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const room = $derived(data.room);
	const siteName = $derived(data.content?.name ?? 'Notre établissement');

	// Photo de secours identique à celle de la liste (chambre sans photo importée)
	const FALLBACK_IMAGE = '/images/IMG8.webp';
	const heroImage = $derived(room.photos[0] ?? FALLBACK_IMAGE);
	const galleryImages = $derived(room.photos.slice(1, 5));

	// Les équipements sont des libellés libres saisis dans l'application de
	// l'établissement : on associe une icône par mot-clé, avec un repli générique.
	function amenityIcon(label: string) {
		const l = label.toLowerCase();
		if (l.includes('wifi') || l.includes('wi-fi')) return Wifi;
		if (l.includes('clim') || l.includes('ventil')) return Wind;
		if (l.includes('café') || l.includes('cafe') || l.includes('thé')) return Coffee;
		if (l.includes('vue') || l.includes('balcon') || l.includes('terrasse')) return Mountain;
		if (l.includes('tv') || l.includes('télé')) return Tv;
		if (l.includes('douche') || l.includes('bain')) return ShowerHead;
		return CheckCircle2;
	}

	// États pour le formulaire de réservation rapide
	let checkIn = $state('');
	let checkOut = $state('');
	let guests = $state('2');

	function handleBooking(e: Event) {
		e.preventDefault();
		console.log('Demande de réservation :', { checkIn, checkOut, guests, room: room.name });
	}
</script>

<svelte:head>
	<title>{room.name} | {siteName}</title>
	{#if room.description}
		<meta name="description" content={room.description.slice(0, 160)} />
	{/if}
</svelte:head>

<!-- ==========================================
     1. BANNIÈRE HERO (Image principale)
     ========================================== -->
<section class="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full bg-cover bg-center" style="background-image: url('{heroImage}');">
	<div class="absolute inset-0 bg-vb-dark/40"></div>

	<!-- Fil d'Ariane -->
	<div class="absolute top-8 left-4 md:left-8 z-10 flex items-center gap-2 font-sans text-[0.8rem] text-vb-white/80">
		<a href="/" class="hover:text-vb-white transition-colors">Accueil</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<a href="/heb" class="hover:text-vb-white transition-colors">Hébergements</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<span class="text-vb-gold font-medium">{room.name}</span>
	</div>
</section>

<!-- ==========================================
     2. CORPS DE LA PAGE (Grille 2 colonnes)
     ========================================== -->
<section class="py-16 bg-vb-ivory">
	<div class="max-w-[1200px] w-full mx-auto px-4">

		<div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

			<!-- COLONNE GAUCHE : DÉTAILS DE LA CHAMBRE -->
			<div class="flex flex-col gap-10">

				<!-- En-tête de la chambre -->
				<div>
					<div class="flex items-center gap-3 mb-4">
						<span class="bg-vb-gold text-vb-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-[4px]">
							{room.availableCount > 1 ? `${room.availableCount} chambres disponibles` : 'Dernière chambre disponible'}
						</span>
					</div>
					<h1 class="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-vb-dark leading-tight mb-6">
						{room.name}
					</h1>

					<!-- Caractéristiques rapides -->
					<div class="flex flex-wrap items-center gap-6 border-y border-vb-ivory3 py-4">
						{#if room.size}
							<div class="flex items-center gap-2 text-vb-slate">
								<Maximize class="w-5 h-5 text-vb-gold" />
								<span class="font-sans text-[0.95rem]">{room.size}</span>
							</div>
						{/if}
						<div class="flex items-center gap-2 text-vb-slate">
							<User class="w-5 h-5 text-vb-gold" />
							<span class="font-sans text-[0.95rem]">{room.capacity}</span>
						</div>
						{#if room.bed}
							<div class="flex items-center gap-2 text-vb-slate">
								<BedDouble class="w-5 h-5 text-vb-gold" />
								<span class="font-sans text-[0.95rem]">{room.bed}</span>
							</div>
						{/if}
					</div>
				</div>

				<!-- Description -->
				{#if room.description}
					<div>
						<h3 class="font-serif text-[1.5rem] font-semibold text-vb-green mb-4">À propos de cette chambre</h3>
						<p class="font-sans text-[1rem] text-vb-slate leading-[1.8]">
							{room.description}
						</p>
					</div>
				{/if}

				<!-- Équipements (Grille) -->
				{#if room.amenities.length > 0}
					<div>
						<h3 class="font-serif text-[1.5rem] font-semibold text-vb-green mb-6">Équipements inclus</h3>
						<div class="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
							{#each room.amenities as amenity}
								{@const Icon = amenityIcon(amenity)}
								<div class="flex items-center gap-3">
									<div class="w-10 h-10 rounded-full bg-vb-white border border-vb-ivory2 flex items-center justify-center shrink-0">
										<Icon class="w-5 h-5 text-vb-gold" />
									</div>
									<span class="font-sans text-[0.9rem] text-vb-dark font-medium">{amenity}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Galerie d'images secondaires -->
				{#if galleryImages.length > 0}
					<div class="grid grid-cols-2 gap-4">
						{#each galleryImages as photo, i}
							<img src={photo} alt="{room.name} — vue {i + 2}" class="w-full h-[250px] object-cover rounded-[8px] hover:opacity-90 transition-opacity" />
						{/each}
					</div>
				{/if}

			</div>

			<!-- COLONNE DROITE : SIDEBAR COLLANTE (Réservation) -->
			<div class="lg:sticky lg:top-24">
				<div class="bg-vb-white rounded-[12px] p-6 shadow-[0_8px_32px_rgba(30,58,47,0.08)] border border-vb-ivory3">

					<!-- Prix -->
					<div class="mb-6 pb-6 border-b border-vb-ivory3">
						<span class="font-sans text-[0.8rem] text-vb-slate uppercase tracking-wider">À partir de</span>
						<div class="flex items-baseline gap-1 mt-1">
							<span class="font-serif text-[2.5rem] font-bold text-vb-dark leading-none">{room.price}</span>
							<span class="font-sans text-[0.85rem] font-medium text-vb-slate">FCFA / nuit</span>
						</div>
					</div>

					<!-- Formulaire -->
					<form onsubmit={handleBooking} class="flex flex-col gap-4">

						<!-- Dates -->
						<div class="grid grid-cols-2 gap-3">
							<div class="flex flex-col gap-1.5">
								<label for="checkIn" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Arrivée</label>
								<input type="date" id="checkIn" bind:value={checkIn} required class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
							</div>
							<div class="flex flex-col gap-1.5">
								<label for="checkOut" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Départ</label>
								<input type="date" id="checkOut" bind:value={checkOut} required class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
							</div>
						</div>

						<!-- Voyageurs (borné par la capacité max du type de chambre) -->
						<div class="flex flex-col gap-1.5">
							<label for="guests" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Voyageurs</label>
							<select id="guests" bind:value={guests} class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark">
								{#each Array.from({ length: room.maxCapacity }, (_, i) => i + 1) as n}
									<option value={String(n)}>{n} {n > 1 ? 'Personnes' : 'Personne'}</option>
								{/each}
							</select>
						</div>

						<!-- Bouton -->
						<button type="submit" class="w-full mt-4 bg-vb-green hover:bg-vb-green2 text-vb-white font-sans font-semibold text-[1rem] tracking-wider py-4 rounded-[4px] transition-colors duration-200">
							Réserver cette chambre
						</button>

						<p class="font-sans text-center text-[0.75rem] text-vb-slate mt-2">
							Aucun paiement requis maintenant.
						</p>
					</form>

				</div>
			</div>

		</div>
	</div>
</section>
