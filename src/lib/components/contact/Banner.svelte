<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
</script>

<!-- J'utilise une image chaleureuse de réception/hôtel pour illustrer le contact -->
<section class="relative flex items-center justify-center min-h-[400px] md:min-h-[480px] bg-cover bg-center bg-no-repeat" style="background-image: url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1920&auto=format&fit=crop');">
	
	<!-- Overlay sombre pour garantir la lisibilité -->
	<div class="absolute inset-0 bg-vb-dark/65"></div>

	<!-- Contenu central -->
	<div class="relative z-10 text-center px-4 max-w-3xl mx-auto mt-4">
		
		<!-- Titre Principal -->
		<h1 class="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold text-vb-white leading-tight mb-6 drop-shadow-sm">
			Contactez-nous
		</h1>

		<!-- Sous-titre -->
		<p class="font-sans text-[0.95rem] md:text-[1.1rem] text-vb-ivory/90 leading-relaxed font-light">
			Une question, une demande spéciale ou une réservation ? Notre équipe est à votre disposition pour préparer votre séjour sur mesure.
		</p>
	</div>

	<!-- Fil d'Ariane (Breadcrumb) -->
	<div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 font-sans text-[0.8rem] text-vb-ivory/70">
		<a href="/" class="hover:text-vb-white transition-colors duration-200">Accueil</a>
		<ChevronRight class="w-3.5 h-3.5" />
		<span class="text-vb-gold font-medium">Contact</span>
	</div>
</section>