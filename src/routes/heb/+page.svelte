<script lang="ts">
	// Import du composant spécifique depuis le nouveau sous-dossier
	import Banner from '$lib/components/heb/Banner.svelte';
	import RoomGrid from '$lib/components/heb/RoomGrid.svelte';
	import SearchSummary from '$lib/components/heb/SearchSummary.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const page = $derived(data.content?.pages?.heb ?? null);
	const show = (section?: { enabled: boolean } | null) => section?.enabled ?? true;
</script>

<svelte:head>
	<title>Nos Hébergements | {data.content?.name ?? 'Villa Boutanga'}</title>
	<meta name="description" content="Découvrez nos chambres alliant artisanat et confort contemporain." />
</svelte:head>

<!-- Grâce au fichier +layout.svelte configuré précédemment,
     la Navbar et le Footer sont déjà gérés automatiquement ! -->

{#if show(page?.banner)}
	<Banner section={page?.banner ?? null} />
{/if}

{#if data.recherche}
	<SearchSummary
		recherche={data.recherche}
		nbResultats={data.rooms.length}
		totalCatalogue={data.totalCatalogue}
	/>
{/if}

<RoomGrid rooms={data.rooms} filtre={data.recherche !== null} />
