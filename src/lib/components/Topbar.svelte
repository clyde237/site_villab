<script lang="ts">
	import { Phone, MapPin } from '@lucide/svelte';
</script>

<div class="bg-vb-green h-[36px] w-full text-[0.75rem] tracking-[0.04em] text-vb-ivory/65 flex items-center border-b border-vb-green2">
	<div class="max-w-[1100px] w-full mx-auto px-4 flex justify-between items-center font-sans">
		<div class="flex items-center gap-6">
			<a href="tel:+237695856095" class="flex items-center gap-2 hover:text-vb-gold3 transition-colors">
				<Phone class="w-3.5 h-3.5 text-vb-gold" />
				<span>+237 6 95 85 60 95</span>
			</a>
			<span class="hidden md:flex items-center gap-2">
				<MapPin class="w-3.5 h-3.5 text-vb-gold" />
				<span>Bangoulap, Ouest Cameroun</span>
			</span>
		</div>
		<div class="flex items-center gap-2 font-medium text-vb-gold3 bg-vb-green2/40 px-2.5 py-0.5 rounded">
			<span class="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
			Tourisme Solidaire & Éco-responsable
		</div>
	</div>
</div>