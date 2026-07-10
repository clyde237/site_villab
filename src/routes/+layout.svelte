<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Topbar from '$lib/components/Topbar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import type { LayoutData } from './$types';

	// Identité de l'établissement (nom, logo, contacts, adresse) chargée
	// depuis pms par +layout.server.ts et distribuée à l'en-tête et au pied
	// de page — repli sur le contenu statique du template si indisponible.
	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();
</script>
<svelte:head>
<!-- Bonne pratique pour le favicon -->
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Topbar content={data.content} />
	<Navbar content={data.content} />

	<main class="grow">
		{@render children()}
	</main>

	<Footer content={data.content} />

	<ScrollToTop />
</div>
