<script lang="ts">
	import { Check } from '@lucide/svelte';
</script>

<section id="offres" class="py-24 bg-vb-ivory">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<!-- En-tête de la section -->
		<div class="text-center mb-16">
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center justify-center gap-4">
				<span class="w-8 h-[1px] bg-vb-gold"></span>
				Offres Spéciales
				<span class="w-8 h-[1px] bg-vb-gold"></span>
			</span>
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
				Séjours & Engagement Solidaire
			</h2>
		</div>

		<!-- Grille des Offres (1fr 1fr, gap 2rem) -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			
			<!-- ==========================================
			     GRANDE CARTE (GAUCHE)
			     ========================================== -->
			<div class="relative rounded-[12px] overflow-hidden h-[480px] flex flex-col justify-end p-8 bg-cover bg-center group" style="background-image: url('https://images.unsplash.com/photo-1518182170546-0766de6b6aad?q=80&w=800&auto=format&fit=crop');">
				
				<!-- Overlay Grand du Design System -->
				<div class="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,18,9,0.78)_0%,transparent_55%)] pointer-events-none transition-opacity duration-300"></div>
				
				<!-- Contenu -->
				<div class="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
					<!-- Badge Design System -->
					<span class="bg-vb-gold text-vb-white text-[0.68rem] font-bold tracking-[0.07em] uppercase px-[0.75rem] py-[0.28rem] rounded-[4px] inline-block mb-4">
						Famille
					</span>
					
					<h3 class="font-serif text-2xl md:text-[1.8rem] text-vb-white mb-4">
						Pack Famille & Culture
					</h3>
					
					<ul class="flex flex-col gap-2.5 mb-6">
						<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.95rem]">
							<Check class="w-4 h-4 text-vb-white shrink-0" />
							<span>10% de réduction pour famille de 4</span>
						</li>
						<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.95rem]">
							<Check class="w-4 h-4 text-vb-white shrink-0" />
							<span>Visite guidée de la Fondation incluse</span>
						</li>
						<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.95rem]">
							<Check class="w-4 h-4 text-vb-white shrink-0" />
							<span>Accès aux ateliers d'artisanat pour enfants</span>
						</li>
						<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.95rem]">
							<Check class="w-4 h-4 text-vb-white shrink-0" />
							<span>Petit-déjeuner inclus chaque matin</span>
						</li>
					</ul>

					<div class="flex items-baseline gap-2">
						<span class="font-sans text-[1rem] text-vb-gold">A partir de</span>
						<span class="font-serif text-[1.6rem] font-bold text-vb-gold">52 000 <span class="font-sans text-[0.85rem] font-normal">FCFA</span></span>
					</div>
				</div>
			</div>

			<!-- ==========================================
			     PETITES CARTES (DROITE)
			     ========================================== -->
			<div class="flex flex-col gap-8">
				
				<!-- Petite Carte 1 -->
				<div class="relative rounded-[12px] overflow-hidden h-[224px] flex flex-col justify-end p-6 bg-cover bg-center group" style="background-image: url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop');">
					
					<!-- Overlay Petit du Design System -->
					<div class="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,18,9,0.8)_0%,transparent_60%)] pointer-events-none transition-opacity duration-300"></div>
					
					<!-- Contenu -->
					<div class="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
						<ul class="flex flex-col gap-1.5 mb-3">
							<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
								<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
								<span>3 nuits minimum en Suite Junior</span>
							</li>
							<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
								<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
								<span>Randonnée guidée incluse</span>
							</li>
							<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
								<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
								<span>Repas au Jacaranda inclus</span>
							</li>
						</ul>
						<div class="flex items-baseline gap-2">
							<span class="font-sans text-[0.95rem] text-vb-gold">A partir de</span>
							<span class="font-serif text-[1.4rem] font-bold text-vb-gold">39 000 <span class="font-sans text-[0.8rem] font-normal">FCFA</span></span>
						</div>
					</div>
				</div>

				<!-- Petite Carte 2 -->
				<div class="relative rounded-[12px] overflow-hidden h-[224px] flex flex-col justify-end p-6 bg-cover bg-center group" style="background-image: url('https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=800&auto=format&fit=crop');">
					
					<!-- Overlay Petit du Design System -->
					<div class="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,18,9,0.8)_0%,transparent_60%)] pointer-events-none transition-opacity duration-300"></div>
					
					<!-- Contenu -->
					<div class="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
						<ul class="flex flex-col gap-1.5 mb-3">
							<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
								<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
								<span>Suite Junior avec vue collines</span>
							</li>
							<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
								<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
								<span>Dîner aux chandelles au Jacaranda</span>
							</li>
							<li class="flex items-center gap-2 text-vb-ivory font-sans text-[0.85rem]">
								<Check class="w-3.5 h-3.5 text-vb-white shrink-0" />
								<span>Visite Route des Chefferies</span>
							</li>
						</ul>
						<div class="flex items-baseline gap-2">
							<span class="font-sans text-[0.95rem] text-vb-gold">A partir de</span>
							<span class="font-serif text-[1.4rem] font-bold text-vb-gold">39 000 <span class="font-sans text-[0.8rem] font-normal">FCFA</span></span>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</section>