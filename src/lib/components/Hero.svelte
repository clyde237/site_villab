<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import BookingWidget from './BookingWidget.svelte';
</script>

<section id="accueil" class="relative pt-[100px] pb-[160px] bg-vb-dark flex items-center min-h-[75vh] md:min-h-[85vh]">
	<!-- Arrière-plan avec effet zoom et fade-in (avec overflow-hidden pour masquer le zoom) -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute inset-0 bg-cover bg-center bg-no-repeat animate-scale-bg animate-fade-in" style="background-image: url('/images/IMG7.webp');"></div>
		<!-- Overlay sombre -->
		<div class="absolute inset-0 bg-vb-dark/55"></div>
	</div>

	<div class="relative max-w-[1100px] w-full mx-auto px-4 text-center z-10">
		<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold3 bg-vb-green/60 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-6 shadow-sm border border-vb-green3/30 animate-fade-in-up">
			Altitude 1 500m — Éco-Maison d'Hôtes
		</span>
		
		<h1 class="font-serif font-bold text-vb-white text-[clamp(1.7rem,4.5vw,3rem)] leading-[1.2] max-w-4xl mx-auto mb-6 drop-shadow-sm animate-fade-in-up delay-150">
			Un havre de paix <br />
			<span class="text-vb-gold">éco-responsable</span> <br />
			au cœur de l'Ouest Cameroun
		</h1>
		
		<p class="font-sans font-light text-vb-ivory/90 text-md md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300">
			Perchée sur les collines verdoyantes de Bangoulap, la Villa Boutanga associe confort contemporain, culture bamilékée et tourisme solidaire.
		</p>

		<div class="flex justify-center items-center animate-fade-in-up delay-450">
			<Button href="#hebergements" class="bg-vb-gold text-vb-white font-sans font-semibold text-[0.85rem] tracking-[0.05em] px-10 py-6 rounded-[4px] hover:bg-vb-gold2 shadow-md transition-all duration-200 hover:-translate-y-0.5">
				Découvrir nos chambres
			</Button>
		</div>
	</div>

	<div class="absolute bottom-0 left-0 w-full transform translate-y-1/2 z-20 animate-fade-in-up delay-600">
		<BookingWidget />
	</div>
</section>