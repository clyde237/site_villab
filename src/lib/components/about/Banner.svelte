<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
</script>

<section class="relative flex items-center justify-center min-h-[400px] md:min-h-[480px] bg-cover bg-center bg-no-repeat" style="background-image: url('images/IMG2.webp');">
	
	<div class="absolute inset-0 bg-vb-dark/65"></div>

	<div class="relative z-10 text-center px-4 max-w-3xl mx-auto mt-4">
		
		<h1 class="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-vb-white leading-tight mb-6 drop-shadow-sm">
			À Propos de Nous
		</h1>

		<p class="font-sans text-[0.95rem] md:text-[1.1rem] text-vb-ivory/90 leading-relaxed font-light">
			Bienvenue à la Villa Boutanga, où l'authenticité bamilékée rencontre le confort au cœur du Ndé.
		</p>
	</div>

	<div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 font-sans text-[0.8rem] text-vb-ivory/70">
		<a href="/" class="hover:text-vb-white transition-colors duration-200">Accueil</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<span class="text-vb-gold font-medium">À Propos</span>
	</div>
</section>