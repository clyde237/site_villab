<script lang="ts">
	import { Wifi, Utensils, ShieldCheck, CarFront, Coffee, Wind } from '@lucide/svelte';
	import type { ServicesSection } from '$lib/types/api';

	let { section = null }: { section?: ServicesSection | null } = $props();

	const defaultServices = [
		{
			title: 'Wi-Fi Haut Débit',
			description: 'Connexion internet sans fil incluse dans tout le domaine et les chambres.'
		},
		{
			title: 'Restaurant Biologique',
			description: "Le Jacaranda vous propose une cuisine saine, du potager à l'assiette."
		},
		{
			title: 'Sécurité 24/7',
			description: 'Domaine entièrement gardienné et sécurisé pour votre tranquillité.'
		},
		{
			title: 'Parking Privé',
			description: 'Stationnement gratuit, privé et sécurisé réservé à notre clientèle.'
		}
	];

	// Équipements saisis dans pms avec icônes attribuées en boucle, repli statique.
	const serviceIcons = [Wifi, Utensils, ShieldCheck, CarFront, Coffee, Wind];
	const services = $derived(section?.items?.length ? section.items : defaultServices);
	const eyebrow = $derived(section?.subtitle ?? 'Nos Équipements');
	const title = $derived(section?.title ?? 'Services & Commodités');
</script>

<section id="services" class="py-20 bg-vb-ivory">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<div class="text-center mb-12">
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 block">
				{eyebrow}
			</span>
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
				{title}
			</h2>
		</div>

		<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
			{#each services as service, i}
				{@const Icon = serviceIcons[i % serviceIcons.length]}
				<div class="bg-vb-white border border-vb-ivory3 rounded-[8px] p-8 text-center transition-all duration-250 hover:shadow-feature hover:-translate-y-1">
					<Icon class="w-8 h-8 mx-auto text-vb-gold mb-5" />
					<h3 class="font-serif text-[1.2rem] font-semibold text-vb-green mb-3">
						{service.title}
					</h3>
					<p class="font-sans text-[0.95rem] text-vb-slate leading-relaxed">
						{service.description}
					</p>
				</div>
			{/each}
		</div>

	</div>
</section>