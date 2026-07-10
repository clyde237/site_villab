<script lang="ts">
	// Import du composant spécifique depuis le nouveau sous-dossier
	import Banner from '$lib/components/about/Banner.svelte';
    import Welcome from '$lib/components/about/Welcome.svelte';
    import Facilities from '$lib/components/about/Facilities.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const page = $derived(data.content?.pages?.about ?? null);
	// Témoignages et newsletter sont gérés dans l'onglet Accueil du CMS et
	// réutilisés ici — mêmes contenus, mêmes interrupteurs.
	const home = $derived(data.content?.pages?.home ?? null);
	const show = (section?: { enabled: boolean } | null) => section?.enabled ?? true;
</script>

<svelte:head>
	<title>À propos | {data.content?.name ?? 'Villa Boutanga'}</title>
	<meta name="description" content="Découvrez notre histoire et notre parcours." />
</svelte:head>

<!-- Grâce au fichier +layout.svelte configuré précédemment,
     la Navbar et le Footer sont déjà gérés automatiquement ! -->

{#if show(page?.banner)}
	<Banner section={page?.banner ?? null} />
{/if}

{#if show(page?.welcome)}
	<Welcome section={page?.welcome ?? null} />
{/if}

{#if show(page?.facilities)}
	<Facilities section={page?.facilities ?? null} />
{/if}

{#if show(home?.testimonials)}
	<Testimonials section={home?.testimonials ?? null} />
{/if}

{#if show(home?.newsletter)}
	<Newsletter section={home?.newsletter ?? null} />
{/if}
