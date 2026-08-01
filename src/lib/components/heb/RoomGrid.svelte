<script lang="ts">
	import { Maximize, User, ArrowRight } from '@lucide/svelte';
	import AvailabilityBadge from './AvailabilityBadge.svelte';
	import type { RoomAvailabilityApi } from '$lib/types/api';

	interface Room {
		id: number;
		name: string;
		number: string;
		image: string;
		area: string | null;
		capacity: string;
		amenities: string[];
		price: string;
		availability?: RoomAvailabilityApi | null;
	}

	let { rooms = [] }: { rooms: Room[] } = $props();
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

		{#if rooms.length === 0}
			<div class="text-center py-16">
				<p class="font-sans text-vb-slate text-[0.95rem]">Aucune chambre disponible pour le moment. Revenez bientôt !</p>
			</div>
		{/if}

		<!-- Grille Responsive : 1 col (mobile) -> 2 cols (tablette) -> 3 cols (petit écran) -> 4 cols (grand écran) -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

			{#each rooms as room}
				<!-- Carte de la chambre -->
				<div class="group bg-vb-white border border-vb-ivory3 rounded-[12px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-room hover:-translate-y-1">

					<!-- Image -->
					<div class="relative h-[220px] overflow-hidden">
						<img
							src={room.image}
							alt="{room.name} — chambre {room.number}"
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<span class="absolute top-3 left-3 bg-vb-white/90 text-vb-dark font-sans text-[0.7rem] font-semibold px-2.5 py-1 rounded-full shadow-sm">
							Chambre {room.number}
						</span>

						<!-- État du moment. Une chambre occupée reste réservable pour
						     plus tard : la pastille dit jusqu'à quand elle est prise. -->
						{#if room.availability}
							<div class="absolute bottom-3 left-3 right-3 flex justify-start">
								<AvailabilityBadge availability={room.availability} />
							</div>
						{/if}
					</div>

					<!-- Corps de la carte -->
					<div class="p-6 flex flex-col grow">

						<!-- Titre de la chambre -->
						<h3 class="font-serif text-[1.25rem] font-semibold text-vb-green mb-3 leading-tight">
							{room.name}
						</h3>

						<!-- Méta informations (Surface & Capacité) -->
						<div class="flex items-center gap-5 mb-4">
							{#if room.area}
								<div class="flex items-center gap-1.5 text-vb-slate">
									<Maximize class="w-4 h-4 text-vb-slate/70" />
									<span class="font-sans text-[0.85rem]">{room.area}</span>
								</div>
							{/if}
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
							
							<a href="/heb/room/{room.id}" class="font-sans text-[0.85rem] font-semibold text-vb-gold flex items-center gap-1.5 hover:text-vb-green transition-colors group/link">
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