<script lang="ts">
	// Tableau de données pour générer facilement les cartes d'activités
	const activities = [
		{
			id: 1,
			category: 'Sur place',
			title: 'Visite de la Fondation',
			description: "Ateliers d'artisans, expositions d'art africain et Centre Culturel Jean-Louis Dumas.",
			image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop'
		},
		{
			id: 2,
			category: 'Plein air',
			title: 'Randonnées Guidées',
			description: 'Collines sacrées, cascades et paysages du Ndé avec nos guides locaux passionnés.',
			image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
		},
		{
			id: 3,
			category: 'Culture',
			title: 'Route des Chefferies',
			description: "Immersion unique : Chefferie supérieure de Bangoulap et Hautes Terres de l'Ouest.",
			image: 'https://images.unsplash.com/photo-1523805009056-24da03d002a2?q=80&w=800&auto=format&fit=crop'
		}
	];
</script>

<section id="activites" class="py-24 bg-vb-ivory">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<!-- En-tête de la section -->
		<div class="text-center mb-16">
			<!-- Eyebrow -->
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center justify-center gap-4">
				<span class="w-8 h-[1px] bg-vb-gold"></span>
				Découvertes
				<span class="w-8 h-[1px] bg-vb-gold"></span>
			</span>
			
			<!-- Titre -->
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
				Activités & Région
			</h2>
		</div>

		<!-- Grille des Activités (Design System : minmax 280px, gap 2rem) -->
		<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
			{#each activities as activity}
				<!-- Carte Activité (Radius 12px, border ivory3, hover shadow & transform) -->
				<div class="group bg-vb-white border border-vb-ivory3 rounded-[12px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-feature hover:-translate-y-1">
					
					<!-- Image de la carte (Hauteur stricte de 180px selon le Design System) -->
					<div class="relative h-[180px] w-full overflow-hidden">
						<img 
							src={activity.image} 
							alt={activity.title} 
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</div>

					<!-- Corps de la carte (Padding 1.6rem selon le Design System) -->
					<div class="p-[1.6rem] flex flex-col flex-grow">
						<!-- Catégorie / Label (Jost, 0.68rem, 600, uppercase, tracking 0.08em) -->
						<span class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-2 block">
							{activity.category}
						</span>
						
						<!-- Titre (Playfair, H3 Carte) -->
						<h3 class="font-serif text-[1.4rem] font-semibold text-vb-green mb-3 leading-[1.3]">
							{activity.title}
						</h3>
						
						<!-- Description -->
						<p class="font-sans text-[0.95rem] text-vb-slate leading-[1.6] flex-grow">
							{activity.description}
						</p>
					</div>
					
				</div>
			{/each}
		</div>

	</div>
</section>