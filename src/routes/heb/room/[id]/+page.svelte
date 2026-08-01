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
		ShowerHead,
		CalendarCheck
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import AvailabilityBadge from '$lib/components/heb/AvailabilityBadge.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const room = $derived(data.room);
	const siteName = $derived(data.content?.name ?? 'Notre établissement');

	// État d'envoi du formulaire de réservation
	let submitting = $state(false);

	// Photo de secours identique à celle de la liste (chambre sans photo importée)
	const FALLBACK_IMAGE = '/images/IMG8.webp';
	const heroImage = $derived(room.photos[0] ?? FALLBACK_IMAGE);
	const galleryImages = $derived(room.photos.slice(1, 5));

	// ── Dates déjà prises ──────────────────────────────────────────────────────
	// L'API refuserait ces périodes en 409. Autant les écarter ici : le client
	// voit tout de suite pourquoi, au lieu de remplir tout le formulaire pour
	// rien.

	const availability = $derived(room.availability ?? null);
	const busyRanges = $derived(availability?.busy_ranges ?? []);

	const today = new Date().toISOString().slice(0, 10);
	// Première arrivée possible : la chambre peut être occupée aujourd'hui.
	const minCheckIn = $derived(availability?.available_from ?? today);

	let checkIn = $state('');
	let checkOut = $state('');

	// Après un refus serveur, la page n'est pas remontée : on repeuple les
	// dates saisies pour que le client n'ait pas à les ressaisir.
	$effect(() => {
		if (form?.check_in) checkIn = form.check_in;
		if (form?.check_out) checkOut = form.check_out;
	});

	// Un séjour [a, b) chevauche une période prise [from, to) si a < to et from < b.
	// Bornes semi-ouvertes des deux côtés : le jour du départ d'un client est
	// réservable par le suivant, c'est le ménage qui tranche ensuite.
	function overlapsBusy(from: string, to: string): boolean {
		return busyRanges.some((range) => from < range.to && range.from < to);
	}

	const dateError = $derived.by(() => {
		if (!checkIn || !checkOut) return null;
		if (checkOut <= checkIn) return 'La date de départ doit être postérieure à la date d’arrivée.';
		if (checkIn < today) return 'La date d’arrivée est déjà passée.';
		if (overlapsBusy(checkIn, checkOut)) {
			return 'Cette chambre est déjà occupée sur cette période. Choisissez d’autres dates.';
		}
		return null;
	});

	/** Périodes à venir, formulées pour être lues d'un coup d'œil. */
	const busyLabels = $derived(
		busyRanges.slice(0, 4).map((range) => {
			const fmt = (iso: string) =>
				new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
			return `${fmt(range.from)} → ${fmt(range.to)}`;
		})
	);

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
					<div class="flex flex-wrap items-center gap-3 mb-4">
						<span class="bg-vb-gold text-vb-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-[4px]">
							Chambre {room.number}
						</span>
						{#if room.view}
							<span class="border border-vb-gold/40 text-vb-gold text-[0.65rem] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-[4px]">
								Vue {room.view}
							</span>
						{/if}
						{#if room.floor}
							<span class="text-vb-slate/70 font-sans text-[0.75rem]">Étage {room.floor}</span>
						{/if}
						<AvailabilityBadge {availability} size="md" />
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

					{#if form?.success}
						<!-- Confirmation de la demande -->
						<div class="flex flex-col items-center text-center gap-3 py-6">
							<div class="w-14 h-14 rounded-full bg-vb-green/10 flex items-center justify-center">
								<CalendarCheck class="w-7 h-7 text-vb-green" />
							</div>
							<h3 class="font-serif text-[1.3rem] font-semibold text-vb-green">Demande envoyée !</h3>
							<p class="font-sans text-[0.9rem] text-vb-slate leading-relaxed">
								Votre demande de réservation
								{#if form.bookingNumber}<span class="font-semibold text-vb-dark">({form.bookingNumber})</span>{/if}
								a bien été transmise. La réception vous recontactera pour la confirmer.
							</p>
							<a href="/heb" class="mt-2 font-sans text-[0.85rem] font-semibold text-vb-gold hover:text-vb-green transition-colors">
								Voir d'autres chambres
							</a>
						</div>
					{:else}
						<!-- Formulaire -->
						<form method="POST" use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}} class="flex flex-col gap-4">

							{#if form?.error}
								<div class="font-sans text-[0.8rem] text-red-700 bg-red-50 border border-red-200 rounded-[4px] px-3 py-2.5">
									{form.error}
								</div>
							{/if}

							<!-- Périodes déjà prises : le client les voit avant de choisir,
							     plutôt que de découvrir le refus après avoir tout saisi. -->
							{#if busyLabels.length > 0}
								<div class="font-sans text-[0.75rem] text-vb-slate bg-vb-ivory border border-vb-ivory3 rounded-[4px] px-3 py-2.5">
									<span class="font-semibold text-vb-dark">Déjà réservée :</span>
									<span class="ml-1">{busyLabels.join(' · ')}</span>
									{#if busyRanges.length > busyLabels.length}
										<span class="opacity-70"> et {busyRanges.length - busyLabels.length} autre(s)</span>
									{/if}
									<span class="block mt-1 opacity-80">
										Le jour du départ reste réservable — la chambre est remise en état dans la journée.
									</span>
								</div>
							{/if}

							<!-- Dates -->
							<div class="grid grid-cols-2 gap-3">
								<div class="flex flex-col gap-1.5">
									<label for="check_in" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Arrivée</label>
									<input type="date" id="check_in" name="check_in" bind:value={checkIn} min={minCheckIn} required class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
								</div>
								<div class="flex flex-col gap-1.5">
									<label for="check_out" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Départ</label>
									<input type="date" id="check_out" name="check_out" bind:value={checkOut} min={checkIn || minCheckIn} required class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
								</div>
							</div>

							{#if dateError}
								<div class="font-sans text-[0.8rem] text-amber-800 bg-amber-50 border border-amber-200 rounded-[4px] px-3 py-2.5">
									{dateError}
								</div>
							{/if}

							<!-- Voyageurs (borné par la capacité max du type de chambre) -->
							<div class="flex flex-col gap-1.5">
								<label for="guests" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Voyageurs</label>
								<select id="guests" name="guests" class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark">
									{#each Array.from({ length: room.maxCapacity }, (_, i) => i + 1) as n}
										<option value={String(n)} selected={String(n) === String(form?.adults ?? 2)}>{n} {n > 1 ? 'Personnes' : 'Personne'}</option>
									{/each}
								</select>
							</div>

							<!-- Coordonnées du client -->
							<div class="grid grid-cols-2 gap-3">
								<div class="flex flex-col gap-1.5">
									<label for="first_name" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Prénom</label>
									<input type="text" id="first_name" name="first_name" value={form?.first_name ?? ''} required class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
								</div>
								<div class="flex flex-col gap-1.5">
									<label for="last_name" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Nom</label>
									<input type="text" id="last_name" name="last_name" value={form?.last_name ?? ''} required class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
								</div>
							</div>
							<div class="flex flex-col gap-1.5">
								<label for="phone" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Téléphone</label>
								<input type="tel" id="phone" name="phone" value={form?.phone ?? ''} required placeholder="+237 6 XX XX XX XX" class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
							</div>
							<div class="flex flex-col gap-1.5">
								<label for="email" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Email <span class="normal-case text-vb-slate/60">(optionnel)</span></label>
								<input type="email" id="email" name="email" value={form?.email ?? ''} class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark" />
							</div>
							<div class="flex flex-col gap-1.5">
								<label for="notes" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Demande particulière <span class="normal-case text-vb-slate/60">(optionnel)</span></label>
								<textarea id="notes" name="notes" rows="2" class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark resize-none">{form?.notes ?? ''}</textarea>
							</div>

							<!-- Bouton : bloqué tant que les dates ne tiennent pas debout,
							     inutile d'envoyer une demande vouée au refus. -->
							<button type="submit" disabled={submitting || dateError !== null} class="w-full mt-2 bg-vb-green hover:bg-vb-green2 text-vb-white font-sans font-semibold text-[1rem] tracking-wider py-4 rounded-[4px] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
								{submitting ? 'Envoi en cours…' : 'Réserver cette chambre'}
							</button>

							<p class="font-sans text-center text-[0.75rem] text-vb-slate mt-1">
								Aucun paiement requis maintenant — demande à confirmer par la réception.
							</p>
						</form>
					{/if}

				</div>
			</div>

		</div>
	</div>
</section>
