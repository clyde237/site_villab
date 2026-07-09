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
</script>

<svelte:head>
	<title>{data.content?.seo.title ?? 'Accueil | Villa Boutanga'}</title>
	{#if data.content?.seo.description}
		<meta name="description" content={data.content.seo.description} />
	{/if}
</svelte:head>

<Hero content={data.content} />

<div class="h-16 md:h-24 bg-transparent"></div>

<About />

<Services />

<Rooms />

<Testimonials />

<VideoBanner />

<Offers />

<Restaurant />

<Activities />

<InstagramFeed />

<NewsLetter />

<Contact />
