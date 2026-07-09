<script lang="ts">
	import { Star, ArrowLeft, ArrowRight } from '@lucide/svelte';

	// État du slider
	let currentIndex = $state(0);

	// Données des témoignages
	const reviews = [
		{
			id: 1,
			text: "J'avais besoin de m'éloigner de la ville et de me ressourcer. Après une semaine ici, je suis heureux de ce choix. La Villa est grande et paisible. Le personnel était serviable et accommodant. La nourriture était excellente et la Fondation Gacha juste à côté offre une dimension culturelle rare qu'on ne trouve nulle part ailleurs. Je reviendrai.",
			author: "Kevin M.",
			role: "COO d'une startup tech — TripAdvisor ✓",
			avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop"
		},
		{
			id: 2,
			text: "Un séjour absolument magique. L'architecture respecte les traditions locales tout en offrant un confort irréprochable. Se réveiller avec la vue sur les collines du Ndé n'a pas de prix. Le restaurant est également une très belle découverte avec ses produits du potager.",
			author: "Sophie T.",
			role: "Voyageuse — Booking.com ✓",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
		}
	];

	// Fonctions de navigation
	function nextSlide() {
		currentIndex = (currentIndex + 1) % reviews.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
	}
</script>

<section class="py-24 bg-vb-ivory overflow-hidden">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-20 items-center">
			
			<div>
				<h2 class="font-serif text-[clamp(2.2rem,4vw,3rem)] font-bold text-vb-dark leading-[1.2] mb-10">
					Ce que disent<br />nos clients
				</h2>
				
				<div class="flex -space-x-4">
					<img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="Client 1" class="w-14 h-14 rounded-full border-[3px] border-vb-ivory object-cover relative z-3" />
					<img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" alt="Client 2" class="w-14 h-14 rounded-full border-[3px] border-vb-ivory object-cover relative z-2" />
					<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="Client 3" class="w-14 h-14 rounded-full border-[3px] border-vb-ivory object-cover relative z-1" />
					
					<div class="w-14 h-14 rounded-full border-[3px] border-vb-ivory bg-vb-green text-vb-white flex items-center justify-center font-sans text-[0.8rem] font-bold relative z-0">
						+10
					</div>
				</div>
			</div>

			<div class="relative w-full">
				
				<div class="overflow-hidden">
					<div 
						class="flex transition-transform duration-700 ease-in-out"
						style="transform: translateX(-{currentIndex * 100}%);"
					>
						{#each reviews as review}
							<div class="min-w-full flex flex-col pr-4">
								
								<div class="flex gap-1.5 mb-8">
									{#each Array(5) as _}
										<Star class="w-5 h-5 text-vb-gold fill-vb-gold" />
									{/each}
								</div>

								<p class="font-serif italic text-[1.1rem] md:text-[1.35rem] text-vb-dark leading-[1.8] mb-10 max-w-2xl">
									« {review.text} »
								</p>

								<div class="flex items-center gap-4 mb-10">
									<img src={review.avatar} alt={review.author} class="w-12 h-12 rounded-full object-cover shadow-sm" />
									<div class="flex flex-col">
										<span class="font-sans font-bold text-[1rem] text-vb-dark">{review.author}</span>
										<span class="font-sans text-[0.85rem] text-vb-slate">{review.role}</span>
									</div>
								</div>

							</div>
						{/each}
					</div>
				</div>

				<div class="flex gap-4">
					<button 
						onclick={prevSlide}
						class="w-12 h-12 rounded-full border border-vb-ivory3 flex items-center justify-center text-vb-slate hover:text-vb-green hover:border-vb-green hover:bg-vb-white transition-all duration-300 focus:outline-none"
						aria-label="Témoignage précédent"
					>
						<ArrowLeft class="w-5 h-5" strokeWidth={1.5} />
					</button>
					<button 
						onclick={nextSlide}
						class="w-12 h-12 rounded-full border border-vb-ivory3 flex items-center justify-center text-vb-slate hover:text-vb-green hover:border-vb-green hover:bg-vb-white transition-all duration-300 focus:outline-none"
						aria-label="Témoignage suivant"
					>
						<ArrowRight class="w-5 h-5" strokeWidth={1.5} />
					</button>
				</div>

			</div>

		</div>
	</div>
</section>