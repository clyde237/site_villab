<script lang="ts">
	// Import du composant spécifique depuis le nouveau sous-dossier
	import Banner from '$lib/components/resto/Banner.svelte';
    import Experience from '$lib/components/resto/Experience.svelte';
    import Gallery from '$lib/components/resto/Gallery.svelte';
    import Menu from '$lib/components/resto/Menu.svelte';
    import Testimonials from '$lib/components/Testimonials.svelte';
    import Newsletter from '$lib/components/Newsletter.svelte';
</script>

<svelte:head>
	<title>Nos Hébergements | Villa Boutanga</title>
	<meta name="description" content="Découvrez nos 14 chambres de standing alliant artisanat bamiléké et confort contemporain." />
</svelte:head>

<!-- Grâce au fichier +layout.svelte configuré précédemment, 
     la Navbar et le Footer sont déjà gérés automatiquement ! -->

<Banner />

<Experience />

<Gallery />

<Menu />

<Testimonials />

<Newsletter />