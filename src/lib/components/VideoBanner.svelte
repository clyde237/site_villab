<script lang="ts">
	import { Play, X } from '@lucide/svelte';

	let isPlaying = $state(false);
</script>

<!-- Section en pleine largeur, hauteur fixe adaptative -->
<section class="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center bg-vb-dark overflow-hidden">
	
	{#if isPlaying}
		<!-- Lecteur vidéo actif (avec son et contrôles) -->
		<div class="absolute inset-0 w-full h-full z-20 bg-black">
			<video 
				src="/images/vid.mp4" 
				class="w-full h-full object-cover"
				autoplay 
				controls 
				playsinline
			>
				<track kind="captions" />
			</video>
			<!-- Bouton de fermeture -->
			<button 
				onclick={() => isPlaying = false}
				class="absolute top-4 right-4 z-30 bg-vb-dark/80 hover:bg-vb-gold text-vb-white p-2.5 rounded-full cursor-pointer transition-colors duration-200 border border-vb-ivory/20 flex items-center justify-center shadow-lg"
				aria-label="Fermer la vidéo"
			>
				<X class="w-5 h-5" />
			</button>
		</div>
	{:else}
		<!-- Vidéo d'arrière-plan en boucle silencieuse -->
		<video 
			src="/images/vid.mp4" 
			class="absolute inset-0 w-full h-full object-cover"
			autoplay 
			loop 
			muted 
			playsinline
		>
			<track kind="captions" />
		</video>

		<!-- Overlay Vidéo strict du Design System (vb-green à 60% d'opacité) -->
		<div class="absolute inset-0 bg-vb-green/60"></div>

		<!-- Bouton Play central avec transition scale 0.2s -->
		<button 
			onclick={() => isPlaying = true}
			class="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full border border-vb-ivory/50 flex items-center justify-center group transition-all duration-200 hover:scale-105 hover:bg-vb-gold hover:border-vb-gold cursor-pointer shadow-lg"
			aria-label="Lancer la vidéo de présentation"
		>
			<!-- Icône Lucide (Play) avec remplissage -->
			<Play class="w-8 h-8 md:w-10 md:h-10 text-vb-ivory fill-vb-ivory group-hover:text-vb-white group-hover:fill-vb-white ml-2 transition-colors duration-200" />
		</button>

		<!-- Légende en bas (Eyebrow typo) -->
		<div class="absolute bottom-8 md:bottom-12 left-0 w-full text-center z-10 px-4">
			<p class="font-sans text-[0.72rem] md:text-[0.8rem] font-semibold tracking-[0.14em] uppercase text-vb-ivory/90">
				Vivez l'expérience Villa Boutanga <span class="mx-3 text-vb-gold opacity-60">•</span> 1 500 m <span class="mx-3 text-vb-gold opacity-60">•</span> Bangoulap
			</p>
		</div>
	{/if}

</section>
