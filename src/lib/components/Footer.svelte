<script lang="ts">
	// Nous ne gardons que les icônes standards de Lucide
	import { Phone, Mail, MapPin } from '@lucide/svelte';
</script>

<footer class="bg-vb-dark pt-20 pb-8 text-vb-ivory/60 border-t border-vb-green/30">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-12 mb-16">
			
			<!-- Colonne 1 : Marque & Description -->
			<div class="flex flex-col gap-6">
				<a href="/" class="font-serif text-[1.5rem] font-semibold text-vb-white tracking-[0.04em] flex items-center gap-2 select-none">
					<span>Villa <span class="text-vb-gold">Boutanga</span></span>
				</a>
				
				<p class="font-sans text-[0.9rem] leading-[1.7] max-w-sm">
					Gîte de charme de la Fondation Jean-Félicien Gacha. Bangoulap, Région de l'Ouest, Cameroun — 1 500 m d'altitude.
				</p>
				
				<!-- Réseaux Sociaux (SVG Natifs) -->
				<div class="flex gap-4 mt-2">
					<!-- Facebook -->
					<a href="/" class="w-9 h-9 rounded-full border border-vb-ivory/20 flex items-center justify-center text-vb-ivory/60 hover:text-vb-gold hover:border-vb-gold transition-all duration-200" aria-label="Facebook">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
							<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
						</svg>
					</a>
					
					<!-- LinkedIn -->
					<a href="/" class="w-9 h-9 rounded-full border border-vb-ivory/20 flex items-center justify-center text-vb-ivory/60 hover:text-vb-gold hover:border-vb-gold transition-all duration-200" aria-label="LinkedIn">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
							<rect width="4" height="12" x="2" y="9"></rect>
							<circle cx="4" cy="4" r="2"></circle>
						</svg>
					</a>
					
					<!-- Instagram -->
					<a href="/" class="w-9 h-9 rounded-full border border-vb-ivory/20 flex items-center justify-center text-vb-ivory/60 hover:text-vb-gold hover:border-vb-gold transition-all duration-200" aria-label="Instagram">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
							<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
							<line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
						</svg>
					</a>
				</div>
			</div>

			<!-- Colonne 2 : Liens Rapides -->
			<div class="flex flex-col gap-6">
				<h4 class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold">
					Liens Rapides
				</h4>
				<ul class="flex flex-col gap-3 font-sans text-[0.9rem]">
					<li><a href="#accueil" class="hover:text-vb-gold transition-colors duration-200">Accueil</a></li>
					<li><a href="/heb" class="hover:text-vb-gold transition-colors duration-200">Hébergements</a></li>
					<li><a href="#restauration" class="hover:text-vb-gold transition-colors duration-200">Restauration</a></li>
					<li><a href="#offres" class="hover:text-vb-gold transition-colors duration-200">Offres Spéciales</a></li>
					<li><a href="#activites" class="hover:text-vb-gold transition-colors duration-200">Activités</a></li>
				</ul>
			</div>

			<!-- Colonne 3 : Services Extras -->
			<div class="flex flex-col gap-6">
				<h4 class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold">
					Services Extras
				</h4>
				<ul class="flex flex-col gap-3 font-sans text-[0.9rem]">
					<li><span class="hover:text-vb-gold transition-colors duration-200">Wi-Fi Gratuit</span></li>
					<li><span class="hover:text-vb-gold transition-colors duration-200">Parking Gratuit</span></li>
					<li><span class="hover:text-vb-gold transition-colors duration-200">Service Concierge</span></li>
					<li><span class="hover:text-vb-gold transition-colors duration-200">Transfert Aéroport</span></li>
					<li><span class="hover:text-vb-gold transition-colors duration-200">Guide Culturel</span></li>
				</ul>
			</div>

			<!-- Colonne 4 : Contact -->
			<div class="flex flex-col gap-6">
				<h4 class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold">
					Contact
				</h4>
				<ul class="flex flex-col gap-4 font-sans text-[0.9rem]">
					<li class="flex items-start gap-3">
						<Phone class="w-4 h-4 text-vb-gold shrink-0 mt-1" />
						<a href="tel:+237695856095" class="hover:text-vb-gold transition-colors duration-200">
							+237 6 95 85 60 95
						</a>
					</li>
					<li class="flex items-start gap-3">
						<Mail class="w-4 h-4 text-vb-gold shrink-0 mt-1" />
						<a href="mailto:contact@villaboutanga.cm" class="hover:text-vb-gold transition-colors duration-200 break-all">
							contact@villaboutanga.cm
						</a>
					</li>
					<li class="flex items-start gap-3">
						<MapPin class="w-4 h-4 text-vb-gold shrink-0 mt-1" />
						<span class="leading-relaxed">
							Village Bangoulap,<br />Bangangté, Ouest Cameroun
						</span>
					</li>
				</ul>
			</div>

		</div>

		<!-- Ligne de séparation et Copyright -->
		<div class="pt-8 border-t border-vb-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-[0.8rem]">
			<p>
				© 2026 Villa Boutanga — Entité de la Fondation Jean-Félicien Gacha. Tous droits réservés.
			</p>
			<div class="flex gap-4">
				<a href="/heb" class="hover:text-vb-gold transition-colors">Réservé</a>
				<span class="text-vb-ivory/20">•</span>
				<a href="/mention" class="hover:text-vb-gold transition-colors">Mentions Légales</a>
				<span class="text-vb-ivory/20">•</span>
				<a href="/plocy" class="hover:text-vb-gold transition-colors">Politique de confidentialité</a>
			</div>
		</div>

	</div>
</footer>