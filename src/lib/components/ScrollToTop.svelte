<script lang="ts">
	import { ArrowUp } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	
	let visible = $state(false);

	function handleScroll() {
		visible = window.scrollY > 400;
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
</script>

<svelte:window onscroll={handleScroll} />

{#if visible}
	<button
		onclick={scrollToTop}
		transition:fade={{ duration: 200 }}
		class="fixed bottom-6 right-6 z-50 p-3.5 bg-vb-gold2 hover:bg-vb-gold text-vb-white rounded-full shadow-[0_4px_16px_rgba(212,168,75,0.3)] transition-all duration-200 hover:scale-110 cursor-pointer border border-vb-white/10 hover:-translate-y-0.5 flex items-center justify-center"
		aria-label="Retour en haut"
	>
		<ArrowUp class="w-5 h-5" />
	</button>
{/if}
