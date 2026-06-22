<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
</script>

<!-- Utilisation d'une image de restaurant élégante via Unsplash -->
<section class="relative flex items-center justify-center min-h-[400px] md:min-h-[480px] bg-cover bg-center bg-no-repeat" style="background-image: url('/images/IMG4.webp');">
	
	<!-- Overlay sombre pour garantir la lisibilité du texte -->
	<div class="absolute inset-0 bg-vb-dark/65"></div>

	<!-- Contenu central -->
	<div class="relative z-10 text-center px-4 max-w-3xl mx-auto mt-4">
		
		<!-- Titre Principal (Playfair Display) -->
		<h1 class="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-vb-white leading-tight mb-6 drop-shadow-sm">
			Le Jacaranda
		</h1>

		<!-- Sous-titre (Jost) -->
		<p class="font-sans text-[0.95rem] md:text-[1.1rem] text-vb-ivory/90 leading-relaxed font-light">
			Que vous soyez d'humeur pour un petit-déjeuner tranquille, un déjeuner en plein air ou un dîner romantique au coucher du soleil.
		</p>
	</div>

	<!-- Fil d'Ariane (Breadcrumb) positionné en bas au centre -->
	<div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 font-sans text-[0.8rem] text-vb-ivory/70">
		<a href="/" class="hover:text-vb-white transition-colors duration-200">Accueil</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<span class="text-vb-gold font-medium">Restauration</span>
	</div>
</section>