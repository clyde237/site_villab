<script lang="ts">
	import { Soup, Pizza, Martini } from '@lucide/svelte';
</script>

<section id="restauration" class="py-24 bg-vb-white">
	<div class="max-w-[1100px] w-full mx-auto px-4">
		
		<!-- Grille asymétrique (Texte à gauche, Image à droite) -->
		<div class="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-center">
			
			<!-- ==========================================
			     COLONNE GAUCHE : Texte & Menu
			     ========================================== -->
			<div>
				<!-- Eyebrow -->
				<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center gap-4">
					<span class="w-6 h-px bg-vb-gold"></span>
					Restauration
				</span>
				
				<!-- Titre & Séparateur -->
				<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2] mb-6">
					Le Jacaranda
				</h2>
				
				<!-- Paragraphe descriptif -->
				<p class="font-sans text-[0.95rem] md:text-[1rem] font-normal text-vb-slate leading-[1.7] mb-10">
					Notre restaurant vous accueille sur sa terrasse panoramique pour une cuisine savoureuse et responsable. Tous nos légumes, herbes et fruits proviennent directement du potager biologique du domaine.
				</p>

				<!-- Liste des Spécialités (Cartes d'équipement adaptées) -->
				<div class="flex flex-col gap-4">
					
					<!-- Élément 1 -->
					<div class="bg-vb-ivory border border-vb-ivory2 p-5 rounded-[8px] flex items-start gap-4 transition-transform hover:-translate-y-1 duration-200">
						<div class="w-10 h-10 rounded-full bg-vb-white flex items-center justify-center shrink-0 shadow-sm">
							<Soup class="w-5 h-5 text-vb-gold" />
						</div>
						<div>
							<h4 class="font-serif text-[1.1rem] font-semibold text-vb-green mb-1">Spécialités Camerounaises</h4>
							<p class="font-sans text-[0.9rem] text-vb-slate leading-relaxed">Ndolé traditionnel, Mbongo Tchobi et mets de pistache préparés avec soin.</p>
						</div>
					</div>

					<!-- Élément 2 -->
					<div class="bg-vb-ivory border border-vb-ivory2 p-5 rounded-[8px] flex items-start gap-4 transition-transform hover:-translate-y-1 duration-200">
						<div class="w-10 h-10 rounded-full bg-vb-white flex items-center justify-center shrink-0 shadow-sm">
							<Pizza class="w-5 h-5 text-vb-gold" />
						</div>
						<div>
							<h4 class="font-serif text-[1.1rem] font-semibold text-vb-green mb-1">Cuisine Conviviale</h4>
							<p class="font-sans text-[0.9rem] text-vb-slate leading-relaxed">Pizzas au feu de bois, quiches et tartes aux légumes du jardin.</p>
						</div>
					</div>

					<!-- Élément 3 -->
					<div class="bg-vb-ivory border border-vb-ivory2 p-5 rounded-[8px] flex items-start gap-4 transition-transform hover:-translate-y-1 duration-200">
						<div class="w-10 h-10 rounded-full bg-vb-white flex items-center justify-center shrink-0 shadow-sm">
							<Martini class="w-5 h-5 text-vb-gold" />
						</div>
						<div>
							<h4 class="font-serif text-[1.1rem] font-semibold text-vb-green mb-1">Le Bar</h4>
							<p class="font-sans text-[0.9rem] text-vb-slate leading-relaxed">Jus de fruits frais, cocktails maison et boissons locales au coucher du soleil.</p>
						</div>
					</div>

				</div>
			</div>

			<!-- ==========================================
			     COLONNE DROITE : Image
			     ========================================== -->
			<div class="relative h-[450px] md:h-[650px] w-full">
				<img 
					src="/images/IMG3.webp" 
					alt="Restaurant Le Jacaranda - Plats et ambiance" 
					class="w-full h-full object-cover rounded-[12px] shadow-room"
				/>
			</div>

		</div>
	</div>
</section>