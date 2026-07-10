<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
    import About from '$lib/components/About.svelte';
    import Services from '$lib/components/Services.svelte';
    import VideoBanner from '$lib/components/VideoBanner.svelte';
    import Rooms from '$lib/components/Rooms.svelte';
    import Testimonials from '$lib/components/Testimonials.svelte';
    import Offers from '$lib/components/Offers.svelte';
    import Restaurant from '$lib/components/Restaurant.svelte';
    import Activities from '$lib/components/Activities.svelte';
    import InstagramFeed from '$lib/components/InstagramFeed.svelte';
    import NewsLetter from '$lib/components/Newsletter.svelte';
    import Contact from '$lib/components/Contact.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const home = $derived(data.content?.pages?.home ?? null);

    // Section absente du payload (instance pms antérieure aux onglets par
    // page) => affichée par défaut avec son contenu statique de repli.
    const show = (section?: { enabled: boolean } | null) => section?.enabled ?? true;
</script>

<svelte:head>
	<title>{data.content?.seo.title ?? 'Accueil | Villa Boutanga'}</title>
	{#if data.content?.seo.description}
		<meta name="description" content={data.content.seo.description} />
	{/if}
</svelte:head>

{#if show(home?.hero)}
	<Hero content={data.content} />
	<div class="h-16 md:h-24 bg-transparent"></div>
{/if}

{#if show(home?.philosophy)}
	<About section={home?.philosophy ?? null} />
{/if}

{#if show(home?.services)}
	<Services section={home?.services ?? null} />
{/if}

{#if show(home?.rooms)}
	<Rooms section={home?.rooms ?? null} roomTypes={data.homeRoomTypes} />
{/if}

{#if show(home?.testimonials)}
	<Testimonials section={home?.testimonials ?? null} />
{/if}

{#if show(home?.video)}
	<VideoBanner section={home?.video ?? null} />
{/if}

{#if show(home?.offers)}
	<Offers section={home?.offers ?? null} />
{/if}

{#if show(home?.restaurant)}
	<Restaurant section={home?.restaurant ?? null} />
{/if}

{#if show(home?.discovery)}
	<Activities section={home?.discovery ?? null} />
{/if}

{#if show(home?.instagram)}
	<InstagramFeed section={home?.instagram ?? null} />
{/if}

{#if show(home?.newsletter)}
	<NewsLetter section={home?.newsletter ?? null} />
{/if}

{#if show(home?.contact_form)}
	<Contact section={home?.contact_form ?? null} content={data.content} />
{/if}
