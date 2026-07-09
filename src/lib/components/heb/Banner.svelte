<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
</script>

<section class="relative flex items-center justify-center min-h-[400px] md:min-h-[480px] bg-cover bg-center bg-no-repeat" style="background-image: url('/images/IMG11.webp');">
	
	<!-- Overlay sombre pour garantir la lisibilité du texte -->
	<div class="absolute inset-0 bg-vb-dark/65"></div>

	<!-- Contenu central -->
	<div class="relative z-10 text-center px-4 max-w-3xl mx-auto mt-4">
		
		<!-- Eyebrow avec les lignes dorées -->
		<div class="flex items-center justify-center gap-4 mb-4">
			<span class="w-8 md:w-12 h-px bg-vb-gold"></span>
			<span class="font-sans text-[0.68rem] md:text-[0.75rem] font-semibold tracking-[0.14em] uppercase text-vb-gold">
				Domaine de Bangoulap — 1 500 m d'altitude
			</span>
			<span class="w-8 md:w-12 h-px bg-vb-gold"></span>
		</div>

		<!-- Titre Principal -->
		<h1 class="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-vb-white leading-tight mb-6 drop-shadow-sm">
			Nos Hébergements
		</h1>

		<!-- Sous-titre -->
		<p class="font-sans text-[0.95rem] md:text-[1.1rem] text-vb-ivory/90 leading-relaxed font-light">
			14 chambres de standing, alliant l'artisanat bamiléké au confort contemporain dans un écrin de verdure.
		</p>
	</div>

	<!-- Fil d'Ariane (Breadcrumb) positionné en bas au centre -->
	<div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 font-sans text-[0.8rem] text-vb-ivory/70">
		<a href="/" class="hover:text-vb-white transition-colors duration-200">Accueil</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<span class="text-vb-gold font-medium">Hébergements</span>
	</div>
</section>