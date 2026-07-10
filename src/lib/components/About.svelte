<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Leaf, Mountain, Utensils, Palette, ArrowRight } from '@lucide/svelte';
	import type { PhilosophySection } from '$lib/types/api';

	let { section = null }: { section?: PhilosophySection | null } = $props();

	const title = $derived(section?.title ?? 'Le Tourisme Solidaire');
	const body = $derived(
		section?.body ??
			"La Villa Boutanga n'est pas une simple maison d'hôtes. Elle est une entité de la Fondation Jean-Félicien Gacha. En séjournant chez nous, vous contribuez directement au financement des projets éducatifs, culturels et environnementaux menés auprès des communautés locales du Ndé."
	);
	const mainImage = $derived(section?.image ?? '/images/IMG6.webp');

	// Piliers : icônes attribuées en boucle sur les valeurs saisies dans pms,
	// repli sur les 4 piliers statiques du template.
	const pillarIcons = [Leaf, Mountain, Utensils, Palette];
	const defaultValues = [
		{ title: 'Éco-responsabilité', description: null },
		{ title: 'Panorama Exceptionnel', description: null },
		{ title: 'Circuit Court', description: null },
		{ title: 'Éveil Culturel', description: null }
	];
	const values = $derived(section?.values?.length ? section.values : defaultValues);
</script>

<section id="philosophie" class="pt-[110px] pb-20 px-4 max-w-[1100px] w-full mx-auto">
	
	<div class="grid grid-cols-1 md:grid-cols-[1fr_1.05fr] gap-12 md:gap-20 items-center">
		
		<div class="relative w-full h-[500px] md:h-[600px] hidden sm:block">
			
			<img
				src={mainImage}
				alt="Vue de l'établissement"
				class="absolute top-0 right-4 w-[85%] h-[85%] object-cover rounded-[12px] shadow-sm border border-vb-ivory3/50"
			/>
			
			<div class="absolute top-6 right-[-20px] bg-vb-green text-center px-6 py-5 rounded-[12px] shadow-lg border border-vb-green2/30 z-10 flex flex-col items-center justify-center min-w-[145px]">
				<span class="font-serif text-3xl font-bold text-vb-gold2">52+</span>
				<span class="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-vb-ivory2 mt-1">ans d'existence</span>
			</div>
			
			<img 
				src="/images/IMG8.webp" 
				alt="Détail artisanat" 
				class="absolute bottom-0 left-0 w-[55%] h-[45%] object-cover rounded-[12px] shadow-[0_8px_32px_rgba(30,58,47,.15)] border-4 border-vb-white"
			/>
		</div>

		<div class="flex flex-col justify-center">
			
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3">
				Notre Philosophie
			</span>
			
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2] mb-6">
				{title}
			</h2>

			<p class="font-sans text-[0.95rem] md:text-[1rem] font-normal text-vb-slate leading-[1.7] mb-10">
				{body}
			</p>

			<div class="grid grid-cols-2 gap-y-8 gap-x-6 mb-10">
				{#each values as value, i}
					{@const Icon = pillarIcons[i % pillarIcons.length]}
					<div class="flex flex-col gap-3">
						<div class="w-10 h-10 rounded-full bg-vb-ivory flex items-center justify-center text-vb-gold">
							<Icon class="w-5 h-5" />
						</div>
						<h4 class="font-serif text-[1.1rem] font-semibold text-vb-green leading-snug">{value.title}</h4>
						{#if value.description}
							<p class="font-sans text-[0.85rem] text-vb-slate leading-relaxed -mt-1">{value.description}</p>
						{/if}
					</div>
				{/each}
			</div>

			<div>
				<Button href="#fondation" variant="outline" class="font-sans text-[0.85rem] font-semibold tracking-wider text-vb-green border-vb-green hover:bg-vb-green hover:text-vb-ivory px-6 py-5 rounded-[4px] transition-all duration-200 flex items-center gap-2 group">
					Découvrir la fondation
					<ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
				</Button>
			</div>
			
		</div>
	</div>
</section>