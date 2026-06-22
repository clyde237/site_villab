<script lang="ts">
	// Données du menu (simulées pour l'exemple)
	const menuData = [
		{
			category: 'Spécialités Camerounaises',
			items: [
				{
					id: 1,
					name: 'Ndolé Traditionnel',
					desc: 'Feuilles de ndolé, crevettes fumées, pistaches et viande mijotée. Servi avec du plantain.',
					price: '4 500',
					image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop'
				},
				{
					id: 2,
					name: 'Mbongo Tchobi',
					desc: 'Poisson ou poulet mijoté dans une sauce noire aux épices traditionnelles bamilékées.',
					price: '5 000',
					image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop'
				},
				{
					id: 3,
					name: 'Sauce Pistache',
					desc: 'Mets de pistache grillée préparé selon la recette ancestrale, servi avec riz ou couscous.',
					price: '4 000',
					image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop'
				},
				{
					id: 4,
					name: 'Légumes du Potager',
					desc: 'Assortiment de légumes de saison du potager biologique, grillés aux herbes aromatiques.',
					price: '2 500',
					image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop'
				},
				{
					id: 5,
					name: 'Poulet DG',
					desc: 'Poulet sauté aux légumes frais, banane plantain, tomates et épices locales du Ndé.',
					price: '5 500',
					image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=200&auto=format&fit=crop'
				},
				{
					id: 6,
					name: 'Eru & Waterleaf',
					desc: "Feuilles d'eru mijotées à l'huile de palme rouge avec du waterleaf et des crevettes.",
					price: '4 200',
					image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop'
				}
			]
		},
		{
			category: 'Entrées & Salades',
			items: [
				{
					id: 7,
					name: 'Salade de l\'Ouest',
					desc: 'Tomates du potager, avocats, oignons, et vinaigrette maison.',
					price: '2 000',
					image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop'
				}
			]
		},
		{ category: 'Cuisine Conviviale', items: [] },
		{ category: 'Bar & Boissons', items: [] },
		{ category: 'Desserts', items: [] }
	];

	// Gestion de l'état des onglets avec Svelte 5
	let activeCategory = $state(menuData[0].category);

	// Filtrage réactif des éléments à afficher
	let currentItems = $derived(menuData.find((c) => c.category === activeCategory)?.items || []);
</script>

<section id="menu" class="py-24 bg-vb-white">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<!-- En-tête : Dispositon en deux colonnes sur Desktop -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end mb-16">
			<div>
				<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center gap-4">
					<span class="w-6 h-px bg-vb-gold"></span>
					Menu
				</span>
				<h2 class="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-vb-dark leading-[1.1]">
					Restaurant<br/>Menu
				</h2>
			</div>
			<div>
				<p class="font-sans text-[0.95rem] text-vb-slate leading-[1.7] max-w-md border-l-2 border-vb-gold pl-6">
					Notre menu évolue au rythme des saisons et des récoltes du potager biologique. Chaque assiette raconte l'histoire du terroir bamiléké et des producteurs locaux du Ndé.
				</p>
			</div>
		</div>

		<!-- Système d'Onglets (Tabs) -->
		<div class="mb-10 border-b border-vb-ivory3 overflow-x-auto hide-scrollbar">
			<div class="flex gap-8 min-w-max px-2">
				{#each menuData as tab}
					<button 
						onclick={() => activeCategory = tab.category}
						class="pb-4 font-sans text-[0.85rem] font-semibold transition-colors duration-200 border-b-2 {activeCategory === tab.category ? 'text-vb-dark border-vb-gold' : 'text-vb-slate border-transparent hover:text-vb-dark'}"
					>
						{tab.category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Grille des plats (2 colonnes) -->
		{#if currentItems.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each currentItems as item (item.id)}
					<!-- Carte Plat -->
					<div class="flex items-center gap-5 p-4 border border-vb-ivory3 rounded-[12px] bg-vb-white hover:border-vb-gold/50 transition-colors duration-300 group">
						
						<!-- Image miniature -->
						<img 
							src={item.image} 
							alt={item.name} 
							class="w-[70px] h-[70px] rounded-[8px] object-cover shrink-0"
						/>
						
						<!-- Contenu Texte -->
						<div class="grow">
							<h3 class="font-serif text-[1.1rem] font-semibold text-vb-dark mb-1 group-hover:text-vb-gold transition-colors">
								{item.name}
							</h3>
							<p class="font-sans text-[0.8rem] text-vb-slate leading-relaxed line-clamp-2">
								{item.desc}
							</p>
						</div>
						
						<!-- Prix -->
						<div class="shrink-0 flex items-baseline gap-1">
							<span class="font-serif text-[1.1rem] font-bold text-vb-dark">{item.price}</span>
							<span class="font-sans text-[0.65rem] font-bold text-vb-slate uppercase">FCFA</span>
						</div>

					</div>
				{/each}
			</div>
		{:else}
			<!-- Message si la catégorie est vide -->
			<div class="text-center py-12">
				<p class="font-sans text-vb-slate text-[0.95rem]">Les plats de cette catégorie seront bientôt disponibles.</p>
			</div>
		{/if}

	</div>
</section>

<style>
	/* Masquer la scrollbar pour le menu des onglets sur mobile tout en gardant le défilement actif */
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>