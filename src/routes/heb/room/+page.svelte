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
		Mountain
	} from '@lucide/svelte';

	// États pour le formulaire de réservation rapide
	let checkIn = $state('');
	let checkOut = $state('');
	let guests = $state('2');

	// Données simulées pour la chambre
	const room = {
		name: 'Suite Junior',
		badge: 'Populaire',
		price: '45 000',
		size: '45 m²',
		capacity: '2-3 personnes',
		bed: '1 Lit King Size',
		description: "Spacieuse et baignée de lumière naturelle, la Suite Junior offre un équilibre parfait entre l'élégance de l'artisanat bamiléké et le confort moderne. Profitez d'un coin salon privatif et d'une vue panoramique sur les collines sacrées du Ndé. Chaque meuble a été sculpté à la main par les artisans de la Fondation Gacha.",
		amenities: [
			{ icon: Wifi, label: 'Wi-Fi Haut Débit' },
			{ icon: Wind, label: 'Climatisation / Chauffage' },
			{ icon: Coffee, label: 'Machine à Café & Thé' },
			{ icon: Mountain, label: 'Vue Panoramique' }
		],
		features: [
			'Petit-déjeuner inclus avec produits du potager',
			'Accès gratuit aux expositions du Centre Culturel',
			'Service d\'étage disponible de 7h à 22h',
			'Salle de bain privative avec douche à l\'italienne'
		],
		images: [
			'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1582719478250-c894099f72b2?q=80&w=600&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop'
		]
	};

	function handleBooking(e: Event) {
		e.preventDefault();
		console.log('Demande de réservation :', { checkIn, checkOut, guests, room: room.name });
	}
</script>

<svelte:head>
	<title>{room.name} | Villa Boutanga</title>
</svelte:head>

<!-- ==========================================
     1. BANNIÈRE HERO (Image principale)
     ========================================== -->
<section class="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full bg-cover bg-center" style="background-image: url('{room.images[0]}');">
	<div class="absolute inset-0 bg-vb-dark/40"></div>
	
	<!-- Fil d'Ariane -->
	<div class="absolute top-8 left-4 md:left-8 z-10 flex items-center gap-2 font-sans text-[0.8rem] text-vb-white/80">
		<a href="/" class="hover:text-vb-white transition-colors">Accueil</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<a href="/hebergements" class="hover:text-vb-white transition-colors">Hébergements</a>
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
							{room.badge}
						</span>
					</div>
					<h1 class="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-vb-dark leading-tight mb-6">
						{room.name}
					</h1>
					
					<!-- Caractéristiques rapides -->
					<div class="flex flex-wrap items-center gap-6 border-y border-vb-ivory3 py-4">
						<div class="flex items-center gap-2 text-vb-slate">
							<Maximize class="w-5 h-5 text-vb-gold" />
							<span class="font-sans text-[0.95rem]">{room.size}</span>
						</div>
						<div class="flex items-center gap-2 text-vb-slate">
							<User class="w-5 h-5 text-vb-gold" />
							<span class="font-sans text-[0.95rem]">{room.capacity}</span>
						</div>
						<div class="flex items-center gap-2 text-vb-slate">
							<BedDouble class="w-5 h-5 text-vb-gold" />
							<span class="font-sans text-[0.95rem]">{room.bed}</span>
						</div>
					</div>
				</div>

				<!-- Description -->
				<div>
					<h3 class="font-serif text-[1.5rem] font-semibold text-vb-green mb-4">À propos de cette chambre</h3>
					<p class="font-sans text-[1rem] text-vb-slate leading-[1.8]">
						{room.description}
					</p>
				</div>

				<!-- Équipements (Grille) -->
				<div>
					<h3 class="font-serif text-[1.5rem] font-semibold text-vb-green mb-6">Équipements inclus</h3>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
						{#each room.amenities as amenity}
							{@const Icon = amenity.icon}
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 rounded-full bg-vb-white border border-vb-ivory2 flex items-center justify-center shrink-0">
									<Icon class="w-5 h-5 text-vb-gold" />
								</div>
								<span class="font-sans text-[0.9rem] text-vb-dark font-medium">{amenity.label}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Points forts (Liste) -->
				<div class="bg-vb-white p-6 rounded-[8px] border border-vb-ivory3">
					<h3 class="font-serif text-[1.3rem] font-semibold text-vb-green mb-4">Les petits plus</h3>
					<ul class="flex flex-col gap-3">
						{#each room.features as feature}
							<li class="flex items-start gap-3">
								<CheckCircle2 class="w-5 h-5 text-vb-gold shrink-0 mt-0.5" />
								<span class="font-sans text-[0.95rem] text-vb-slate">{feature}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Galerie d'images secondaires -->
				<div class="grid grid-cols-2 gap-4">
					<img src={room.images[1]} alt="Vue détaillée 1" class="w-full h-[250px] object-cover rounded-[8px] hover:opacity-90 transition-opacity" />
					<img src={room.images[2]} alt="Vue détaillée 2" class="w-full h-[250px] object-cover rounded-[8px] hover:opacity-90 transition-opacity" />
				</div>

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

						<!-- Voyageurs -->
						<div class="flex flex-col gap-1.5">
							<label for="guests" class="font-sans text-[0.75rem] font-semibold text-vb-slate uppercase">Voyageurs</label>
							<select id="guests" bind:value={guests} class="font-sans text-[0.9rem] p-3 border-[1.5px] border-vb-ivory3 rounded-[4px] focus:border-vb-gold focus:ring-1 focus:ring-vb-gold outline-none bg-vb-ivory text-vb-dark">
								<option value="1">1 Personne</option>
								<option value="2">2 Personnes</option>
								<option value="3">3 Personnes</option>
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