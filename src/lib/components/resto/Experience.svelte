<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
</script>

<section class="py-24 bg-vb-white">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<!-- Grille asymétrique (Images à gauche, Texte à droite) -->
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
			
			<!-- ==========================================
			     COLONNE GAUCHE : Composition d'images
			     ========================================== -->
			<div class="relative w-full h-[550px] md:h-[650px] hidden sm:block">
				
				<!-- Image Principale (Arrière-plan : Intérieur du restaurant) -->
				<img 
					src="/images/IMG3.webp" 
					alt="Intérieur du restaurant Le Jacaranda" 
					class="absolute top-0 left-0 w-[75%] h-[80%] object-cover rounded-[12px]"
				/>
				
				<!-- Image Secondaire (Premier plan : Plat/Pizza avec bordure blanche et ombre) -->
				<img 
					src="/images/IMG1.webp" 
					alt="Plat préparé avec des ingrédients frais" 
					class="absolute bottom-[5%] right-0 w-[60%] aspect-square object-cover rounded-[12px] border-[6px] border-vb-white shadow-[0_8px_32px_rgba(30,58,47,.15)]"
				/>

			</div>

			<!-- ==========================================
			     COLONNE DROITE : Contenu Texte & Infos
			     ========================================== -->
			<div class="flex flex-col justify-center">
				
				<!-- Eyebrow -->
				<div class="flex items-center gap-4 mb-4">
					<span class="w-8 h-px bg-vb-gold"></span>
					<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold">
						Expérience Culinaire
					</span>
				</div>
				
				<!-- Titre -->
				<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-dark leading-[1.2] mb-6">
					Du Potager à l'Assiette :<br/>Savourez des Plats Frais et de Saison au Jacaranda
				</h2>
				
				<!-- Paragraphes -->
				<div class="font-sans text-[0.95rem] md:text-[1rem] text-vb-slate leading-[1.7] flex flex-col gap-5 mb-8">
					<p>
						Notre restaurant vous accueille sur sa terrasse panoramique pour vous faire découvrir une cuisine savoureuse et responsable. Tous nos légumes, herbes aromatiques et fruits de saison proviennent directement du potager biologique du domaine.
					</p>
					<p>
						Nous privilégions les circuits courts et soutenons les producteurs locaux pour nos viandes et nos poissons, dans un esprit de tourisme solidaire au cœur du Ndé.
					</p>
				</div>
				
				<!-- Séparateur Doré -->
				<div class="w-12 h-[2px] bg-vb-gold mb-10"></div>
				
				<!-- Grille d'informations pratiques (2x2) -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 mb-10">
					
					<!-- Info 1 -->
					<div class="border-l-2 border-vb-gold pl-4">
						<div class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-1.5">Réservation</div>
						<div class="font-sans text-[1.05rem] font-bold text-vb-dark mb-0.5">+237 6 95 85 60 95</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">WhatsApp disponible</div>
					</div>

					<!-- Info 2 -->
					<div class="border-l-2 border-vb-gold pl-4">
						<div class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-1.5">Horaires d'ouverture</div>
						<div class="font-sans text-[1.05rem] font-bold text-vb-dark mb-0.5">07h — 22h</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">Tous les jours</div>
					</div>

					<!-- Info 3 -->
					<div class="border-l-2 border-vb-gold pl-4">
						<div class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-1.5">Petit-déjeuner</div>
						<div class="font-sans text-[1.05rem] font-bold text-vb-dark mb-0.5">07h — 10h</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">Produits du potager</div>
					</div>

					<!-- Info 4 -->
					<div class="border-l-2 border-vb-gold pl-4">
						<div class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-gold mb-1.5">Dîner en terrasse</div>
						<div class="font-sans text-[1.05rem] font-bold text-vb-dark mb-0.5">18h30 — 22h</div>
						<div class="font-sans text-[0.8rem] text-vb-slate">Vue sur le grassland</div>
					</div>

				</div>

				<!-- Bouton CTA -->
				<div>
					<a href="#menu" class="inline-flex items-center gap-2 bg-vb-green text-vb-white font-sans font-semibold text-[0.9rem] tracking-[0.04em] px-8 py-4 rounded-[4px] hover:bg-vb-green2 transition-colors duration-200 group">
						Voir notre menu
						<ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
					</a>
				</div>
				
			</div>
		</div>
	</div>
</section>