<script lang="ts">
	// Import du composant spécifique depuis le nouveau sous-dossier
	import Banner from '$lib/components/about/Banner.svelte';
    import Welcome from '$lib/components/about/Welcome.svelte';
    import Facilities from '$lib/components/about/Facilities.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';
</script>

<svelte:head>
	<title>A propos | Villa Boutanga</title>
	<meta name="description" content="Découvrez notre histoire et notre parcours." />
</svelte:head>

<!-- Grâce au fichier +layout.svelte configuré précédemment, 
     la Navbar et le Footer sont déjà gérés automatiquement ! -->

<Banner />

<Welcome />

<Facilities />

<Testimonials />

<Newsletter />
