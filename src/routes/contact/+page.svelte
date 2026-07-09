<script lang="ts">
	import Banner from '$lib/components/contact/Banner.svelte';
	// Tu pourras importer le composant Contact global que nous avons créé au tout début ici
	import ContactForm from '$lib/components/Contact.svelte'; 
    import Map from '$lib/components/contact/Map.svelte';
</script>

<svelte:head>
	<title>Contact & Réservation | Villa Boutanga</title>
	<meta name="description" content="Contactez la Villa Boutanga. Notre domaine à Bangoulap est prêt à vous accueillir pour un séjour inoubliable au cœur du Ndé." />
</svelte:head>

<!-- L'en-tête et le pied de page sont injectés par +layout.svelte -->

<Banner />

<Map />

<!-- Tu peux déjà réutiliser le formulaire de la page d'accueil ! -->
<ContactForm />