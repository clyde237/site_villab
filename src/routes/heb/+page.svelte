<script lang="ts">
	// Import du composant spécifique depuis le nouveau sous-dossier
	import Banner from '$lib/components/heb/Banner.svelte';
	import RoomGrid from '$lib/components/heb/RoomGrid.svelte';
</script>

<svelte:head>
	<title>Nos Hébergements | Villa Boutanga</title>
	<meta name="description" content="Découvrez nos 14 chambres de standing alliant artisanat bamiléké et confort contemporain." />
</svelte:head>

<!-- Grâce au fichier +layout.svelte configuré précédemment, 
     la Navbar et le Footer sont déjà gérés automatiquement ! -->

<Banner />

<RoomGrid />