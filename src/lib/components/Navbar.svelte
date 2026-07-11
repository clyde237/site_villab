<script lang="ts">
	import { page } from '$app/stores';
	import type { CmsContent } from '$lib/types/api';

	let { content = null }: { content?: CmsContent | null } = $props();

	// Nom et logo de l'établissement (création dans pms ou onglet "Identité
	// du site" du CMS). Le nom est scindé sur le premier espace pour garder
	// l'accent doré du template sur la fin du nom ("Villa <Boutanga>").
	// Sans CMS (dev local), on retombe sur l'identité statique de démo ;
	// avec CMS mais sans logo, on affiche la première lettre du nom.
	const name = $derived(content?.name ?? 'Villa Boutanga');
	const logo = $derived(content ? content.logo : '/images/logo-b.png');
	const initial = $derived(name.charAt(0).toUpperCase());
	const nameParts = $derived.by(() => {
		const idx = name.indexOf(' ');
		return idx === -1 ? { first: name, rest: null } : { first: name.slice(0, idx), rest: name.slice(idx + 1) };
	});
</script>

<header class="sticky top-0 z-50 bg-vb-white h-[64px] flex items-center border-b border-vb-ivory3 shadow-nav">
	<div class="max-w-[1100px] w-full mx-auto px-4 flex justify-between items-center">
		<a href="/" class="font-serif text-[1.5rem] font-semibold text-vb-green tracking-[0.04em] flex items-center gap-2 select-none">
			{#if logo}
				<!-- Boîte fixe : quelle que soit la taille du logo importé depuis
				     le CMS, l'image est contenue (object-contain) sans jamais
				     dépasser la hauteur de la navbar (64px). -->
				<span class="h-11 w-11 flex items-center justify-center shrink-0">
					<img src={logo} alt="Logo {name}" class="max-h-11 max-w-11 w-auto h-auto object-contain"/>
				</span>
			{:else}
				<span class="w-11 h-11 rounded-full bg-vb-green text-vb-gold flex items-center justify-center font-serif font-bold text-[1.4rem] shrink-0">
					{initial}
				</span>
			{/if}
			<span>{nameParts.first}{#if nameParts.rest} <span class="text-vb-gold">{nameParts.rest}</span>{/if}</span>
		</a>

		<nav class="hidden md:flex items-center gap-8 font-sans text-[0.8rem] font-medium tracking-[0.06em] uppercase">
			<a 
				href={$page.url.pathname === '/' ? '#accueil' : '/'} 
				class="transition-colors {$page.url.pathname === '/' ? 'text-vb-gold' : 'text-vb-dark hover:text-vb-gold'}"
			>
				Accueil
			</a>
			<a 
				href="/heb" 
				class="transition-colors {$page.url.pathname.startsWith('/heb') ? 'text-vb-gold' : 'text-vb-dark hover:text-vb-gold'}"
			>
				Hébergements
			</a>
			<a 
				href={$page.url.pathname === '/resto' ? '/resto' : '/resto'} 
				class="transition-colors text-vb-dark hover:text-vb-gold"
			>
				Restauration
			</a>
			<a 
				href="/about" 
				class="transition-colors {$page.url.pathname.startsWith('/about') ? 'text-vb-gold' : 'text-vb-dark hover:text-vb-gold'}"
			>
				A propos
			</a>
			<a 
				href={$page.url.pathname === '/' ? '#activites' : '/#activites'} 
				class="transition-colors text-vb-dark hover:text-vb-gold"
			>
				Activités
			</a>
			<a 
				href={$page.url.pathname === '/' ? '/contact' : '/#contact'} 
				class="transition-colors text-vb-dark hover:text-vb-gold"
			>
				Contact
			</a>
		</nav>

		<div class="flex items-center">
			<a 
				href={$page.url.pathname === '/' ? '/heb' : '/heb'} 
				class="font-sans text-[0.8rem] font-semibold tracking-[0.04em] text-vb-white border bg-vb-gold2 px-4 py-2 rounded-[4px] hover:bg-vb-green hover:text-vb-ivory transition-all duration-200"
			>
				Reserver
			</a>
		</div>
	</div>
</header>