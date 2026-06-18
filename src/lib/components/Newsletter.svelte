<script lang="ts">
	// Utilisation des Runes de Svelte 5 pour gérer l'état du champ email
	let email = $state('');

	function handleSubscribe(e: Event) {
		e.preventDefault();
		console.log('Inscription newsletter pour :', email);
		// Logique d'envoi vers l'API Laravel
		email = ''; // On vide le champ après soumission
	}
</script>

<section id="newsletter" class="py-24 bg-vb-green">
	<div class="max-w-[700px] w-full mx-auto px-4 text-center">
		
		<!-- Eyebrow -->
		<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center justify-center gap-4">
			<span class="w-6 h-[1px] bg-vb-gold"></span>
			Offres Exclusives
			<span class="w-6 h-[1px] bg-vb-gold"></span>
		</span>
		
		<!-- Titre (Playfair, texte Ivoire selon le Design System) -->
		<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-ivory leading-[1.2] mb-10">
			Rejoignez notre Newsletter
		</h2>

		<!-- Formulaire fusionné (Input + Bouton) avec l'ombre spécifique -->
		<form 
			onsubmit={handleSubscribe} 
			class="flex flex-col sm:flex-row rounded-[4px] overflow-hidden max-w-lg mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.2)] focus-within:ring-2 focus-within:ring-vb-gold transition-shadow"
		>
			<!-- Input Email -->
			<input 
				type="email" 
				bind:value={email}
				placeholder="Votre adresse e-mail" 
				class="flex-grow font-sans text-[0.9rem] px-[1rem] py-[0.9rem] border-none focus:outline-none text-vb-dark bg-vb-white m-0"
				required
			/>
			
			<!-- Bouton S'abonner (Jost 700, padding et hover spécifiques) -->
			<button 
				type="submit" 
				class="bg-vb-gold hover:bg-vb-gold2 text-vb-white font-sans font-bold text-[0.92rem] tracking-[0.05em] px-[1.6rem] py-[0.9rem] transition-colors duration-200 m-0 shrink-0"
			>
				S'abonner
			</button>
		</form>
		
	</div>
</section>