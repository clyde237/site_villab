<script lang="ts">
	import { Maximize, User, ArrowRight } from '@lucide/svelte';

	// Structure des données (prête pour une future API)
	const rooms = [
		{
			id: 1,
			name: 'Chambre Standard Simple',
			badge: 'Standard',
			badgeColor: 'bg-vb-gold', // Couleur dorée
			image: 'images/IMG8.webp',
			area: '24 m²',
			capacity: '1 pers.',
			amenities: ['Lit Queen', 'Wi-Fi', 'Bureau'],
			price: '26 000'
		},
		{
			id: 2,
			name: 'Chambre Standard Double',
			badge: 'Standard',
			badgeColor: 'bg-vb-gold',
			image: 'images/IMG10.webp',
			area: '28 m²',
			capacity: '2 pers.',
			amenities: ['Lit Queen', 'Vue jardin', 'Wi-Fi'],
			price: '26 000'
		},
		{
			id: 3,
			name: 'Suite Junior',
			badge: 'Suite Junior',
			badgeColor: 'bg-vb-gold',
			image: 'images/IMG11.webp',
			area: '45 m²',
			capacity: '2-3 pers.',
			amenities: ['Coin salon', 'Vue collines', 'Wi-Fi'],
			price: '45 000'
		},
		{
			id: 4,
			name: 'Suite Junior Terrasse',
			badge: 'Éco-Premium',
			badgeColor: 'bg-vb-green', // Couleur verte comme sur ta maquette
			image: 'images/IMG12.webp',
			area: '50 m²',
			capacity: '2 pers.',
			amenities: ['Terrasse privée', 'Lit King', 'Spa'],
			price: '55 000'
		},
		{
			id: 5,
			name: 'Suite Familiale',
			badge: 'Prestige',
			badgeColor: 'bg-vb-gold',
			image: 'images/IMG16.webp',
			area: '65 m²',
			capacity: '4 pers.',
			amenities: ['2 Chambres', 'Salon', 'Balcon'],
			price: '85 000'
		}
	];
</script>

<section class="py-20 bg-vb-white">
	<!-- J'ai élargi le max-width à 1300px pour que les 4 colonnes respirent bien -->
	<div class="max-w-[1300px] w-full mx-auto px-4">
		
		<!-- Filtres ou en-tête optionnel (peut être ajouté plus tard) -->
		<div class="mb-10 text-center md:text-left">
			<h2 class="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-bold text-vb-green">
				Toutes nos chambres
			</h2>
			<p class="font-sans text-vb-slate mt-2">
				Trouvez l'espace qui correspond à vos besoins et à votre budget.
			</p>
		</div>

		<!-- Grille Responsive : 1 col (mobile) -> 2 cols (tablette) -> 3 cols (petit écran) -> 4 cols (grand écran) -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			
			{#each rooms as room}
				<!-- Carte de la chambre -->
				<div class="group bg-vb-white border border-vb-ivory3 rounded-[12px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-room hover:-translate-y-1">
					
					<!-- Image & Badge -->
					<div class="relative h-[220px] overflow-hidden">
						<img 
							src={room.image} 
							alt={room.name} 
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<!-- Badge dynamique selon la catégorie -->
						<div class="{room.badgeColor} absolute top-3 left-3 text-vb-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-[0.6rem] py-1 rounded-[4px] shadow-sm">
							{room.badge}
						</div>
					</div>

					<!-- Corps de la carte -->
					<div class="p-6 flex flex-col grow">
						
						<!-- Titre de la chambre -->
						<h3 class="font-serif text-[1.25rem] font-semibold text-vb-green mb-3 leading-tight">
							{room.name}
						</h3>
						
						<!-- Méta informations (Surface & Capacité) -->
						<div class="flex items-center gap-5 mb-4">
							<div class="flex items-center gap-1.5 text-vb-slate">
								<Maximize class="w-4 h-4 text-vb-slate/70" />
								<span class="font-sans text-[0.85rem]">{room.area}</span>
							</div>
							<div class="flex items-center gap-1.5 text-vb-slate">
								<User class="w-4 h-4 text-vb-slate/70" />
								<span class="font-sans text-[0.85rem]">{room.capacity}</span>
							</div>
						</div>

						<!-- Tags d'équipements (Pilules) -->
						<div class="flex flex-wrap gap-2 mb-6 grow">
							{#each room.amenities as amenity}
								<span class="bg-vb-ivory text-vb-slate font-sans text-[0.7rem] px-3 py-1 rounded-full border border-vb-ivory2">
									{amenity}
								</span>
							{/each}
						</div>

						<!-- Séparateur -->
						<div class="w-full h-px bg-vb-ivory3 mb-4"></div>

						<!-- Prix & Bouton Découvrir -->
						<div class="flex items-center justify-between">
							<div class="flex items-baseline gap-1">
								<span class="font-serif text-[1.3rem] font-bold text-vb-dark leading-none">{room.price}</span>
								<span class="font-sans text-[0.7rem] text-vb-slate uppercase tracking-wider">FCFA/nuit</span>
							</div>
							
							<a href="/heb/room/" class="font-sans text-[0.85rem] font-semibold text-vb-gold flex items-center gap-1.5 hover:text-vb-green transition-colors group/link">
								Découvrir
								<ArrowRight class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
							</a>
						</div>

					</div>
				</div>
			{/each}

		</div>
	</div>
</section>