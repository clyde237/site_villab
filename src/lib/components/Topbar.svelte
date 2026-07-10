<script lang="ts">
	import { Phone, MapPin } from '@lucide/svelte';
	import type { CmsContent } from '$lib/types/api';

	let {
		content = null,
		apiOnline = null
	}: { content?: CmsContent | null; apiOnline?: boolean | null } = $props();

	// Coordonnées de l'établissement (création dans pms / onglet Identité du
	// site). Avec CMS, une coordonnée absente est simplement masquée — les
	// valeurs statiques de démo ne servent qu'en dev local sans API.
	const phone = $derived(content ? content.contact?.phone : '+237 6 95 85 60 95');
	const address = $derived(content ? content.contact?.address : 'Bangoulap, Ouest Cameroun');

	// Le point du badge reflète la liaison avec l'application de
	// l'établissement (chambres/menu) : vert = API joignable, rouge = rompue.
	// null = dev local sans API (mode démo), on reste vert.
	const apiDown = $derived(apiOnline === false);
</script>

<div class="bg-vb-green h-[36px] w-full text-[0.75rem] tracking-[0.04em] text-vb-ivory/65 flex items-center border-b border-vb-green2">
	<div class="max-w-[1100px] w-full mx-auto px-4 flex justify-between items-center font-sans">
		<div class="flex items-center gap-6">
			{#if phone}
				<a href="tel:{phone.replace(/\s/g, '')}" class="flex items-center gap-2 hover:text-vb-gold3 transition-colors">
					<Phone class="w-3.5 h-3.5 text-vb-gold" />
					<span>{phone}</span>
				</a>
			{/if}
			{#if address}
				<span class="hidden md:flex items-center gap-2">
					<MapPin class="w-3.5 h-3.5 text-vb-gold" />
					<span>{address}</span>
				</span>
			{/if}
		</div>
		<div class="flex items-center gap-2 font-medium text-vb-gold3 bg-vb-green2/40 px-2.5 py-0.5 rounded"
		     title={apiDown ? 'Liaison avec l’application de l’établissement interrompue — disponibilités et menu momentanément indisponibles' : 'Connecté à l’application de l’établissement'}>
			<span class="inline-block w-1.5 h-1.5 rounded-full {apiDown ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'}"></span>
			Tourisme Solidaire & Éco-responsable
		</div>
	</div>
</div>
