<script lang="ts">
	import { Star, Quote, ChevronLeft, ChevronRight } from '@lucide/svelte';

	// Données des témoignages (3 différents)
	const testimonials = [
		{
			id: 1,
			text: "Un séjour inoubliable ! Le cadre est somptueux et l'engagement écologique de la Fondation Gacha donne tout son sens à cette parenthèse paisible. Je recommande vivement le restaurant Jacaranda.",
			author: "Marie L.",
			role: "Voyageuse en solo",
			rating: 5
		},
		{
			id: 2,
			text: "Le mélange parfait entre le confort moderne et la richesse de l'artisanat bamiléké. La vue depuis notre suite familiale au réveil était époustouflante. Un vrai havre de paix.",
			author: "Famille Dubois",
			role: "Séjour en famille",
			rating: 5
		},
		{
			id: 3,
			text: "L'accueil chaleureux, la qualité exceptionnelle de la literie et le calme absolu font de la Villa Boutanga le meilleur endroit pour se ressourcer à Bangoulap. Le petit-déjeuner local est fantastique.",
			author: "Alain T.",
			role: "Voyage d'affaires",
			rating: 5
		}
	];

	// Gestion de l'état du slider avec les runes Svelte 5
	let currentIndex = $state(0);

	function nextSlide() {
		currentIndex = (currentIndex + 1) % testimonials.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
	}

	function goToSlide(index: number) {
		currentIndex = index;
	}
</script>

<section id="temoignages" class="py-24 bg-vb-ivory overflow-hidden">
	<div class="max-w-[1100px] w-full mx-auto px-4 relative">
		
		<div class="text-center mb-16">
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 block">
				Livre d'Or
			</span>
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
				Ce que disent nos clients
			</h2>
		</div>

		<div class="relative max-w-4xl mx-auto">
			
			<div class="overflow-hidden rounded-[12px] px-2 py-4">
				
				<div 
					class="flex transition-transform duration-500 ease-in-out"
					style="transform: translateX(-{currentIndex * 100}%);"
				>
					{#each testimonials as review}
						<div class="min-w-full px-2 md:px-4 box-border">
							<div class="bg-vb-white border border-vb-ivory3 rounded-[12px] p-[2rem] md:p-[2.8rem_3rem] shadow-testi relative flex flex-col items-center text-center">
								
								<Quote class="w-12 h-12 text-vb-ivory3/50 absolute top-8 left-8 md:top-10 md:left-12 rotate-180" />

								<div class="flex gap-1 mb-6 mt-4 md:mt-0 relative z-10">
									{#each Array(review.rating) as _}
										<Star class="w-5 h-5 text-vb-gold fill-vb-gold" />
									{/each}
								</div>

								<p class="font-serif italic text-[1.1rem] md:text-[1.25rem] text-vb-green leading-[1.6] mb-8 max-w-2xl relative z-10">
									"{review.text}"
								</p>

								<div class="mt-auto">
									<h4 class="font-sans font-semibold text-[1rem] text-vb-dark tracking-[0.04em]">
										{review.author}
									</h4>
									<span class="font-sans text-[0.85rem] text-vb-slate">
										{review.role}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<button 
				onclick={prevSlide}
				class="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-vb-white border border-vb-ivory3 rounded-full flex items-center justify-center text-vb-green hover:text-vb-gold hover:border-vb-gold shadow-sm transition-all duration-200 z-20 focus:outline-none"
				aria-label="Témoignage précédent"
			>
				<ChevronLeft class="w-6 h-6" />
			</button>
			
			<button 
				onclick={nextSlide}
				class="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-vb-white border border-vb-ivory3 rounded-full flex items-center justify-center text-vb-green hover:text-vb-gold hover:border-vb-gold shadow-sm transition-all duration-200 z-20 focus:outline-none"
				aria-label="Témoignage suivant"
			>
				<ChevronRight class="w-6 h-6" />
			</button>

		</div>

		<div class="flex justify-center gap-3 mt-8">
			{#each testimonials as _, index}
				<button 
					onclick={() => goToSlide(index)}
					class="w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none {currentIndex === index ? 'bg-vb-gold scale-125' : 'bg-vb-ivory3 hover:bg-vb-gold/50'}"
					aria-label={`Aller au témoignage ${index + 1}`}
				></button>
			{/each}
		</div>

	</div>
</section>