<script lang="ts">
	// Plus besoin d'importer depuis lucide-svelte
	
	const instagramPosts = [
		{ id: 1, image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b93b2?q=80&w=400&auto=format&fit=crop', link: '#' },
		{ id: 2, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=400&auto=format&fit=crop', link: '#' },
		{ id: 3, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop', link: '#' },
		{ id: 4, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop', link: '#' },
		{ id: 5, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop', link: '#' }
	];
</script>

<section id="instagram" class="py-24 bg-vb-ivory">
	<div class="max-w-[1200px] w-full mx-auto px-4">
		
		<div class="text-center mb-12">
			<span class="font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-vb-gold mb-3 flex items-center justify-center gap-4">
				<span class="w-6 h-px bg-vb-gold"></span>
				Instagram Feeds
				<span class="w-6 h-px bg-vb-gold"></span>
			</span>
			
			<h2 class="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-vb-green leading-[1.2]">
				Suivez-nous sur Instagram
			</h2>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{#each instagramPosts as post}
				<a 
					href={post.link} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="relative rounded-[12px] overflow-hidden group aspect-square block bg-vb-ivory3"
					aria-label="Voir la publication sur Instagram"
				>
					<img 
						src={post.image} 
						alt="Publication Instagram Villa Boutanga" 
						class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
					/>
					
					<div class="absolute inset-0 bg-vb-green/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
						<!-- Icône SVG Instagram native -->
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							width="32" 
							height="32" 
							viewBox="0 0 24 24" 
							fill="none" 
							stroke="currentColor" 
							stroke-width="1.5" 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							class="text-vb-white"
						>
							<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
							<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
							<line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
						</svg>
					</div>
				</a>
			{/each}
		</div>

	</div>
</section>