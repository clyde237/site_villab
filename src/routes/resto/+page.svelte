<script lang="ts">
	// Import du composant spécifique depuis le nouveau sous-dossier
	import Banner from '$lib/components/resto/Banner.svelte';
    import Experience from '$lib/components/resto/Experience.svelte';
    import Gallery from '$lib/components/resto/Gallery.svelte';
    import Menu from '$lib/components/resto/Menu.svelte';
    import Testimonials from '$lib/components/Testimonials.svelte';
    import Newsletter from '$lib/components/Newsletter.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const page = $derived(data.content?.pages?.resto ?? null);
    // Témoignages et newsletter sont gérés dans l'onglet Accueil du CMS et
    // réutilisés ici — mêmes contenus, mêmes interrupteurs.
    const home = $derived(data.content?.pages?.home ?? null);
    const show = (section?: { enabled: boolean } | null) => section?.enabled ?? true;
</script>

<svelte:head>
	<title>Restaurant | {data.content?.name ?? 'Villa Boutanga'}</title>
	<meta name="description" content="Découvrez notre restaurant : cuisine du terroir, produits frais et cadre unique." />
</svelte:head>

<!-- Grâce au fichier +layout.svelte configuré précédemment,
     la Navbar et le Footer sont déjà gérés automatiquement ! -->

{#if show(page?.banner)}
	<Banner section={page?.banner ?? null} />
{/if}

{#if show(page?.experience)}
	<Experience section={page?.experience ?? null} />
{/if}

{#if show(page?.gallery)}
	<Gallery section={page?.gallery ?? null} />
{/if}

<Menu categories={data.menuCategories} />

{#if show(home?.testimonials)}
	<Testimonials section={home?.testimonials ?? null} />
{/if}

{#if show(home?.newsletter)}
	<Newsletter section={home?.newsletter ?? null} />
{/if}
