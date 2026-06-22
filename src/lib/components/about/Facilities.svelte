<script lang="ts">
	import { BedDouble, ShieldCheck, Utensils, Trees, Palette, Wifi } from '@lucide/svelte';

	// Les 6 équipements pour former notre grille 2x3
	const facilities = [
		{
			icon: BedDouble,
			title: 'Chambres & Suites',
			desc: "14 chambres décorées d'artisanat bamiléké, alliant confort moderne et authenticité locale."
		},
		{
			icon: ShieldCheck,
			title: 'Sécurité 24h/24',
			desc: 'Personnel dédié et cadre sécurisé pour votre tranquillité tout au long du séjour.'
		},
		{
			icon: Utensils,
			title: 'Restaurant Le Jacaranda',
			desc: 'Terrasse panoramique, cuisine du potager biologique et spécialités camerounaises.'
		},
		{
			icon: Trees,
			title: 'Potager & Espaces Verts',
			desc: 'Jardins biologiques, sentiers de promenade et vue imprenable sur le grassland.'
		},
		{
			icon: Palette,
			title: 'Centre Culturel Gacha',
			desc: "Ateliers d'artisanat, expositions d'art africain et bibliothèque communautaire."
		},
		{
			icon: Wifi,
			title: 'Wi-Fi & Services',
			desc: 'Connexion internet gratuite, parking sécurisé et service de conciergerie.'
		}
	];
</script>

<section class="py-24 bg-vb-ivory">
	<div class="max-w-[1200px] w-full mx-auto px-4">
		
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			
			<div>
				<div class="mb-10 text-center lg:text-left">
					<h2 class="font-serif text-[clamp(2rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2] mb-4">
						Équipements<br />& Installations
					</h2>
					<p class="font-sans text-[0.95rem] text-vb-slate leading-relaxed max-w-lg mx-auto lg:mx-0">
						Un cadre soigneusement pensé pour que chaque moment de votre séjour soit synonyme de confort, de découverte et de bien-être.
					</p>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
					{#each facilities as item}
						{@const Icon = item.icon}
						<div class="bg-vb-white border border-vb-ivory3 rounded-[8px] p-5 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-sm">
							<div class="w-10 h-10 rounded-full bg-vb-ivory border border-vb-ivory2 flex items-center justify-center mb-3 shrink-0">
								<Icon class="w-5 h-5 text-vb-gold" />
							</div>
							<h4 class="font-serif text-[1.1rem] font-semibold text-vb-green mb-2">
								{item.title}
							</h4>
							<p class="font-sans text-[0.85rem] text-vb-slate leading-relaxed">
								{item.desc}
							</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="relative w-full h-[600px] lg:h-[750px] mt-8 lg:mt-0">
				
				<img 
					src="/images/IMG16.webp" 
					alt="Chambre confortable de la Villa" 
					class="w-full h-full object-cover rounded-[12px] shadow-room"
				/>

				<div class="absolute top-6 left-6 bg-vb-gold text-vb-white text-[0.65rem] font-bold tracking-[0.08em] uppercase px-4 py-2 rounded-[4px] shadow-sm flex items-center gap-2">
					<Trees class="w-3.5 h-3.5" />
					Éco-responsable
				</div>

				<div class="absolute bottom-8 left-6 md:-left-8 bg-vb-white rounded-[8px] p-5 shadow-booking flex flex-col min-w-[160px]">
					<div class="flex items-baseline gap-1">
						<span class="font-serif text-[2.2rem] font-bold text-vb-green leading-none">8.5</span>
						<span class="font-serif text-[1.2rem] font-semibold text-vb-gold">/10</span>
					</div>
					<span class="font-sans text-[0.75rem] text-vb-slate mt-2 leading-tight">
						Note moyenne<br/>de nos voyageurs
					</span>
				</div>

			</div>

		</div>
	</div>
</section>