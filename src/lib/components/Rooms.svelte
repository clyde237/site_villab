<script lang="ts">
	import { Users, Maximize, Wifi, BedDouble, ArrowRight } from '@lucide/svelte';

	// Structure des données des chambres (prête à être dynamisée avec ton ERP Laravel plus tard)
	const rooms = [
		{
			id: 1,
			name: 'Chambre Standard',
			badge: 'Confort',
			image: '/images/IMG12.webp',
			description: "Parfaite pour les voyageurs en solo ou les couples recherchant intimité et confort, avec une décoration à l'artisanat local.",
			price: '45 000',
			features: [
				{ icon: Users, text: '1 à 2 pers.' },
				{ icon: Maximize, text: '25 m²' },
				{ icon: BedDouble, text: 'Lit Queen size' },
				{ icon: Wifi, text: 'Wi-Fi haut débit' }
			]
		},
		{
			id: 2,
			name: 'Suite Junior',
			badge: 'Populaire',
			image: '/images/IMG11.webp',
			description: "Un espace supérieur offrant un coin salon intégré et un balcon privé pour un séjour spacieux au calme des montagnes.",
			price: '75 000',
			features: [
				{ icon: Users, text: '2 à 3 pers.' },
				{ icon: Maximize, text: '40 m²' },
				{ icon: BedDouble, text: 'Lit King size' },
				{ icon: Wifi, text: 'Balcon privé' }
			]
		},
		{
			id: 3,
			name: 'Suite Familiale',
			badge: 'Prestige',
			image: '/images/IMG10.webp',
			description: "Idéale pour les séjours en famille ou entre amis, offrant de grands volumes de vie et une excellente séparation des espaces nuit.",
			price: '110 000',
			features: [
				{ icon: Users, text: 'Jusqu\'à 5 pers.' },
				{ icon: Maximize, text: '65 m²' },
				{ icon: BedDouble, text: '2 Chambres' },
				{ icon: Wifi, text: 'Vue Panoramique' }
			]
		}
	];
</script>

<section id="hebergements" class="py-24 bg-vb-white">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
			<div>
				<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 block">
					Nos Hébergements
				</span>
				<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
					Charme & Confort
				</h2>
			</div>
			<a href="#hebergements" class="font-sans text-[0.85rem] font-semibold tracking-[0.05em] text-vb-green flex items-center gap-2 hover:text-vb-gold transition-colors group">
				Voir toutes nos chambres
				<ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
			</a>
		</div>

		<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
			{#each rooms as room}
				<div class="group bg-vb-white border border-vb-ivory3 rounded-[12px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-room hover:-translate-y-[5px]">
					
					<div class="relative h-[240px] overflow-hidden">
						<img 
							src={room.image} 
							alt={room.name} 
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div class="absolute top-4 left-4 bg-vb-gold text-vb-white text-[0.68rem] font-bold tracking-[0.07em] uppercase px-[0.75rem] py-[0.28rem] rounded-[4px] shadow-sm">
							{room.badge}
						</div>
					</div>

					<div class="p-7 flex flex-col flex-grow">
						<h3 class="font-serif text-[1.4rem] font-semibold text-vb-green mb-3 leading-[1.3]">
							{room.name}
						</h3>
						
						<p class="font-sans text-[0.95rem] text-vb-slate leading-[1.6] mb-6 flex-grow">
							{room.description}
						</p>

						<div class="grid grid-cols-2 gap-y-3 mb-6">
							{#each room.features as feature}
								<div class="flex items-center gap-2 text-vb-slate2 font-sans text-[0.85rem]">
									<svelte:component this={feature.icon} class="w-4 h-4 text-vb-gold/80" />
									<span>{feature.text}</span>
								</div>
							{/each}
						</div>

						<div class="pt-5 border-t border-vb-ivory3 flex items-center justify-between mt-auto">
							<div class="flex flex-col">
								<span class="font-sans text-[0.7rem] uppercase tracking-[0.08em] text-vb-slate2 mb-0.5">À partir de</span>
								<div class="font-serif text-[1.4rem] font-bold text-vb-green leading-none">
									{room.price} <span class="font-sans text-[0.9rem] font-normal text-vb-slate">FCFA</span>
								</div>
							</div>
							
							<a href="#contact" class="font-sans font-semibold text-[0.78rem] text-vb-green border-[1.5px] border-vb-green px-[1.1rem] py-[0.5rem] rounded-[4px] hover:bg-vb-green hover:text-vb-ivory transition-colors duration-200">
								Réserver
							</a>
						</div>
					</div>
					
				</div>
			{/each}
		</div>

	</div>
</section>