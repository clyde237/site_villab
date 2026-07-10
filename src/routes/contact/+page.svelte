<script lang="ts">
	import Banner from '$lib/components/contact/Banner.svelte';
	// Tu pourras importer le composant Contact global que nous avons créé au tout début ici
	import ContactForm from '$lib/components/Contact.svelte';
    import Map from '$lib/components/contact/Map.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const page = $derived(data.content?.pages?.contact ?? null);
	const home = $derived(data.content?.pages?.home ?? null);
	const show = (section?: { enabled: boolean } | null) => section?.enabled ?? true;

	// L'intro/horaires de l'onglet Contact du CMS priment sur le bloc
	// contact_form de l'accueil pour cette page dédiée.
	const formSection = $derived(
		page?.info?.intro
			? { enabled: true, title: null, intro: page.info.intro }
			: (home?.contact_form ?? null)
	);
</script>

<svelte:head>
	<title>Contact & Réservation | {data.content?.name ?? 'Villa Boutanga'}</title>
	<meta name="description" content="Contactez-nous : notre équipe est prête à vous accueillir pour un séjour inoubliable." />
</svelte:head>

<!-- L'en-tête et le pied de page sont injectés par +layout.svelte -->

{#if show(page?.banner)}
	<Banner section={page?.banner ?? null} />
{/if}

{#if show(page?.map)}
	<Map section={page?.map ?? null} />
{/if}

{#if show(page?.info)}
	<ContactForm section={formSection} content={data.content} />
{/if}
