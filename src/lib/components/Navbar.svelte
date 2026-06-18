<script lang="ts">
	import { Leaf } from '@lucide/svelte';
</script>

<header class="sticky top-0 z-50 bg-vb-white h-[64px] flex items-center border-b border-vb-ivory3 shadow-nav">
	<div class="max-w-[1100px] w-full mx-auto px-4 flex justify-between items-center">
		<a href="/" class="font-serif text-[1.5rem] font-semibold text-vb-green tracking-[0.04em] flex items-center gap-2 select-none">
			<img src="/images/logo-b.png" alt="logo" class="w-20 h-20"/>
			<span>Villa <span class="text-vb-gold">Boutanga</span></span>
		</a>

		<nav class="hidden md:flex items-center gap-8 font-sans text-[0.8rem] font-medium tracking-[0.06em] uppercase">
			<a href="#accueil" class="text-vb-gold transition-colors">Accueil</a>
			<a href="#hebergements" class="text-vb-dark hover:text-vb-gold transition-colors">Hébergements</a>
			<a href="#restauration" class="text-vb-dark hover:text-vb-gold transition-colors">Restauration</a>
			<a href="#fondation" class="text-vb-dark hover:text-vb-gold transition-colors">La Fondation</a>
			<a href="#activites" class="text-vb-dark hover:text-vb-gold transition-colors">Activités</a>
			<a href="#contact" class="text-vb-dark hover:text-vb-gold transition-colors">Contact</a>
		</nav>

		<div class="flex items-center">
			<a href="#contact" class="font-sans text-[0.8rem] font-semibold tracking-[0.04em] text-vb-white border bg-vb-gold2 px-4 py-2 rounded-[4px] hover:bg-vb-green hover:text-vb-ivory transition-all duration-200">
				Reserver
			</a>
		</div>
	</div>
</header>