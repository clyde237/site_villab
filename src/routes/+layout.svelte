<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Topbar from '$lib/components/Topbar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';

	let { children } = $props();
</script>
<svelte:head>
<!-- Bonne pratique pour le favicon -->
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Topbar />
	<Navbar />

	<main class="grow">
		{@render children()}
	</main>

	<Footer />

	<ScrollToTop />
</div>
