<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
</script>

<section class="py-24 bg-vb-white">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
			
			<div class="relative w-full h-[550px] md:h-[650px] hidden sm:block">
				
				<img 
					src="images/IMG7.webp" 
					alt="Paysage montagneux du Ndé" 
					class="absolute top-0 right-6 w-[80%] h-[75%] object-cover rounded-[12px]"
				/>
				
				<img 
					src="images/IMG6.webp" 
					alt="Vue de la Villa" 
					class="absolute bottom-0 right-0 w-[65%] h-[55%] object-cover rounded-[12px] border-[6px] border-vb-white shadow-[0_8px_32px_rgba(30,58,47,.15)]"
				/>
				
				<div class="absolute bottom-[30%] left-0 z-10 bg-vb-green p-6 rounded-[8px] shadow-lg w-[180px] md:w-[200px]">
					<div class="font-serif text-[2.5rem] font-bold text-vb-gold leading-none mb-2">
						50+
					</div>
					<div class="font-sans text-[0.65rem] font-semibold tracking-[0.08em] uppercase text-vb-white/90 leading-relaxed">
						Ans d'engagement<br/>de la Fondation Gacha
					</div>
				</div>

			</div>

			<div class="flex flex-col justify-center">
				
				<div class="flex items-center gap-4 mb-4">
					<span class="w-8 h-px bg-vb-gold"></span>
					<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold">
						À Propos
					</span>
				</div>
				
				<h2 class="font-serif text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-vb-dark leading-[1.2] mb-8">
					Bienvenue à la<br/>Villa Boutanga
				</h2>
				
				<div class="font-sans text-[0.95rem] md:text-[1rem] text-vb-slate leading-[1.7] flex flex-col gap-5 mb-8">
					<p>
						Perchée à 1 500 m d'altitude sur les hauteurs de Bangoulap, dans le département du Ndé, la Villa Boutanga est un havre de paix éco-responsable niché au cœur du grassland camerounais. Depuis sa création, la Villa est une entité de la <strong class="text-vb-dark font-medium">Fondation Jean-Félicien Gacha</strong>, un pôle d'éducation, de formation et de préservation du patrimoine bamiléké ouvert aux voyageurs du monde entier.
					</p>
					<p>
						Nos 14 chambres de standing allient le charme de l'artisanat local — perlage, tissus traditionnels, menuiserie bamilékée — au confort contemporain. Chaque nuit passée ici contribue directement au financement des projets éducatifs, culturels et environnementaux menés dans le Ndé.
					</p>
				</div>
				
				<div class="w-12 h-[2px] bg-vb-gold mb-8"></div>
				
				<div class="flex flex-wrap gap-8 md:gap-12 mb-10">
					<div>
						<div class="font-serif text-[2.2rem] font-bold text-vb-green leading-none mb-1">14</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">Chambres & Suites</div>
					</div>
					<div>
						<div class="font-serif text-[2.2rem] font-bold text-vb-green leading-none mb-1">1 500</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">Mètres d'altitude</div>
					</div>
					<div>
						<div class="font-serif text-[2.2rem] font-bold text-vb-green leading-none mb-1">3</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">Types d'hébergement</div>
					</div>
				</div>

				<div>
					<a href="/heb" class="inline-flex items-center gap-2 bg-vb-green text-vb-white font-sans font-semibold text-[0.9rem] tracking-[0.04em] px-8 py-4 rounded-[4px] hover:bg-vb-green2 transition-colors duration-200 group">
						Voir nos chambres
						<ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
					</a>
				</div>
				
			</div>
		</div>
	</div>
</section>