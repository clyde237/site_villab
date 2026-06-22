<script lang="ts">
	import { Mountain, ArrowRight } from '@lucide/svelte';

	// Gestion de l'état du formulaire avec les runes Svelte 5
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		roomType: 'Chambre Standard',
		checkIn: '',
		checkOut: '',
		message: ''
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log('Demande de réservation envoyée :', formData);
		// Logique d'envoi API à implémenter ici
	}
</script>

<section id="contact" class="py-24 bg-vb-ivory">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">
			
			<!-- ==========================================
			     COLONNE GAUCHE : Informations
			     ========================================== -->
			<div class="flex flex-col justify-center">
				<!-- Eyebrow -->
				<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center gap-4">
					<span class="w-6 h-px bg-vb-gold"></span>
					Nous Contacter
				</span>
				
				<!-- Titre -->
				<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2] mb-10">
					Contact & Réservation
				</h2>

				<div class="flex flex-col gap-8 mb-10">
					<!-- Adresse -->
					<div>
						<h4 class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-2">Adresse</h4>
						<p class="font-sans text-[0.95rem] text-vb-slate leading-relaxed">
							Code Plus : <strong class="font-medium text-vb-dark">3GJJ+QC7</strong><br />
							Village Bangoulap, Bangangté<br />
							Région de l'Ouest, Cameroun
						</p>
					</div>

					<!-- Téléphone / WhatsApp -->
					<div>
						<h4 class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-2">Téléphone / WhatsApp</h4>
						<a href="tel:+237695856095" class="font-sans text-[1.1rem] font-bold text-vb-green hover:text-vb-gold transition-colors">
							+237 6 95 85 60 95
						</a>
					</div>

					<!-- Accès -->
					<div>
						<h4 class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-2">Accès</h4>
						<p class="font-sans text-[0.9rem] text-vb-slate leading-relaxed">
							Axe Yaoundé/Douala → Bafoussam, sortie Bangangté.<br />
							7 km du centre-ville de Bangangté.<br />
							65 km de l'aéroport de Bafoussam.
						</p>
					</div>
				</div>

				<!-- Badge Altitude -->
				<div class="bg-vb-white border-l-4 border-vb-gold p-5 rounded-r-[8px] shadow-sm">
					<div class="flex items-center gap-2 mb-1">
						<Mountain class="w-5 h-5 text-vb-gold" strokeWidth={2} />
						<span class="font-sans font-bold text-[1rem] text-vb-dark">Altitude : 1 500 m</span>
					</div>
					<p class="font-sans text-[0.85rem] text-vb-slate">
						Prévoir un vêtement chaud pour les soirées fraîches.
					</p>
				</div>
			</div>

			<!-- ==========================================
			     COLONNE DROITE : Formulaire
			     ========================================== -->
			<div class="bg-vb-white border border-vb-ivory3 rounded-[12px] p-8 md:p-10 shadow-[0_4px_28px_rgba(30,58,47,0.08)]">
				
				<h3 class="font-serif text-[1.5rem] font-semibold text-vb-green mb-8">
					Faites votre demande
				</h3>

				<form onsubmit={handleSubmit} class="flex flex-col gap-6">
					
					<!-- Ligne 1 : Nom et Email -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="flex flex-col gap-1.5">
							<label for="name" class="font-sans text-[0.75rem] font-semibold text-vb-slate">Nom & Prénom *</label>
							<input type="text" id="name" bind:value={formData.name} placeholder="Votre nom" required class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors" />
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="email" class="font-sans text-[0.75rem] font-semibold text-vb-slate">E-mail *</label>
							<input type="email" id="email" bind:value={formData.email} placeholder="votre@email.com" required class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors" />
						</div>
					</div>

					<!-- Ligne 2 : Téléphone et Type d'hébergement -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="flex flex-col gap-1.5">
							<label for="phone" class="font-sans text-[0.75rem] font-semibold text-vb-slate">Téléphone</label>
							<input type="tel" id="phone" bind:value={formData.phone} placeholder="+237 6XX XXX XXX" class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors" />
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="roomType" class="font-sans text-[0.75rem] font-semibold text-vb-slate">Type d'hébergement</label>
							<select id="roomType" bind:value={formData.roomType} class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors bg-vb-white">
								<option>Chambre Standard</option>
								<option>Suite Junior</option>
								<option>Suite Familiale</option>
								<option>Restaurant uniquement</option>
							</select>
						</div>
					</div>

					<!-- Ligne 3 : Dates -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="flex flex-col gap-1.5">
							<label for="checkinDate" class="font-sans text-[0.75rem] font-semibold text-vb-slate">Date d'arrivée</label>
							<input type="date" id="checkinDate" bind:value={formData.checkIn} class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors bg-vb-white" />
						</div>
						<div class="flex flex-col gap-1.5">
							<label for="checkoutDate" class="font-sans text-[0.75rem] font-semibold text-vb-slate">Date de départ</label>
							<input type="date" id="checkoutDate" bind:value={formData.checkOut} class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors bg-vb-white" />
						</div>
					</div>

					<!-- Ligne 4 : Message -->
					<div class="flex flex-col gap-1.5">
						<label for="message" class="font-sans text-[0.75rem] font-semibold text-vb-slate">Message</label>
						<textarea id="message" bind:value={formData.message} rows="4" placeholder="Précisez vos besoins..." class="font-sans text-[0.9rem] p-[0.75rem_1rem] border-[1.5px] border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold focus:ring-1 focus:ring-vb-gold text-vb-dark transition-colors resize-y"></textarea>
					</div>

					<!-- Bouton d'envoi -->
					<div class="mt-2">
						<button type="submit" class="bg-vb-green hover:bg-vb-green2 text-vb-white font-sans font-semibold text-[0.9rem] tracking-wider px-[1.8rem] py-[0.9rem] rounded-[4px] transition-all duration-200 flex items-center justify-center gap-2 group">
							Envoyer ma demande
							<ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
						</button>
					</div>
					
				</form>
			</div>

		</div>
	</div>
</section>