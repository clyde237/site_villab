<script lang="ts">
	import type { GallerySection } from '$lib/types/api';

	let { section = null }: { section?: GallerySection | null } = $props();

	const defaultImages = [
		'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop'
	];

	// Photos importées dans pms (page Restaurant > Galerie), repli sur les
	// images de démonstration. Une image sur 4 s'étend sur 2 colonnes pour
	// conserver le rythme visuel de la mosaïque.
	const galleryImages = $derived(
		(section?.images?.length ? section.images : defaultImages).map((src, i) => ({
			src,
			alt: `Photo du restaurant ${i + 1}`,
			spanClass: i % 4 === 3 ? 'col-span-1 md:col-span-2 lg:col-span-2' : 'col-span-1 md:col-span-1'
		}))
	);
</script>

<!-- Fond Ivoire clair pour la section -->
<section class="py-24 bg-vb-ivory">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<!-- En-tête centré -->
		<div class="text-center mb-16 max-w-2xl mx-auto">
			
			<!-- Eyebrow -->
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center justify-center gap-4">
				<span class="w-6 h-px bg-vb-gold"></span>
				Galerie
				<span class="w-6 h-px bg-vb-gold"></span>
			</span>
			
			<!-- Titre -->
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-dark leading-[1.2] mb-6">
				Notre Galerie Culinaire
			</h2>
			
			<!-- Description -->
			<p class="font-sans text-[0.95rem] md:text-[1rem] text-vb-slate leading-[1.7]">
				Des saveurs authentiques, une cuisine du terroir bamiléké revisitée avec soin, servie dans un cadre unique à 1 500 m d'altitude.
			</p>
		</div>

		<!-- Grille d'images (3 colonnes sur desktop) -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
			{#each galleryImages as image}
				<!-- Conteneur de l'image avec effet au survol -->
				<div class="relative rounded-[12px] overflow-hidden group h-[250px] sm:h-[300px] {image.spanClass}">
					<img 
						src={image.src} 
						alt={image.alt} 
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<!-- Overlay très léger pour faire ressortir les images -->
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
				</div>
			{/each}
		</div>

	</div>
</section>