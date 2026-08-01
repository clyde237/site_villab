<script lang="ts">
	import { Calendar, Users, Baby, ChevronDown, TriangleAlert } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	/**
	 * Recherche de disponibilité.
	 *
	 * Le widget ne cherche pas lui-même : il emmène le visiteur sur la page
	 * hébergement avec ses critères, où les chambres sont filtrées sur les
	 * dates et la capacité. Les critères y restent lisibles dans l'URL, donc
	 * partageables et rechargeables — ce qu'une recherche en mémoire ne
	 * permettrait pas.
	 */

	const aujourdhui = new Date().toISOString().slice(0, 10);

	let checkIn = $state('');
	let checkOut = $state('');
	let adults = $state('2');
	let children = $state('0');

	// Le départ ne peut pas précéder l'arrivée : on borne le champ plutôt que
	// de laisser saisir puis refuser.
	const minDepart = $derived(checkIn || aujourdhui);

	const erreur = $derived.by(() => {
		if (!checkIn || !checkOut) return null;
		if (checkOut <= checkIn) return 'La date de départ doit être postérieure à la date d’arrivée.';
		if (checkIn < aujourdhui) return 'La date d’arrivée est déjà passée.';
		return null;
	});

	function handleSearch(e: Event) {
		e.preventDefault();
		if (erreur) return;

		const params = new URLSearchParams({
			arrivee: checkIn,
			depart: checkOut,
			adultes: adults,
			enfants: children
		});

		goto(`/heb?${params}`);
	}
</script>

<div class="w-full max-w-[1100px] px-4 mx-auto hidden md:block">
    <form onsubmit={handleSearch} class="bg-vb-white border border-vb-ivory3 rounded-lg shadow-booking p-5 grid grid-cols-5 gap-4 items-end">

        <div class="flex flex-col gap-1.5">
            <label for="checkin" class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-slate flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5 text-vb-gold" />
                <span>Arrivée</span>
            </label>
            <input type="date" id="checkin" bind:value={checkIn} min={aujourdhui} class="w-full font-sans text-[0.9rem] px-3 py-2.5 border border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold text-vb-dark bg-vb-ivory/20" required />
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="checkout" class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-slate flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5 text-vb-gold" />
                <span>Départ</span>
            </label>
            <input type="date" id="checkout" bind:value={checkOut} min={minDepart} class="w-full font-sans text-[0.9rem] px-3 py-2.5 border border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold text-vb-dark bg-vb-ivory/20" required />
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="adults" class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-slate flex items-center gap-1.5">
                <Users class="w-3.5 h-3.5 text-vb-gold" />
                <span>Adultes</span>
            </label>
            <div class="relative">
                <select id="adults" bind:value={adults} class="w-full font-sans text-[0.9rem] px-3 py-2.5 border border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold text-vb-dark bg-vb-ivory/20 appearance-none cursor-pointer">
                    <option value="1">1 Adulte</option>
                    <option value="2">2 Adultes</option>
                    <option value="3">3 Adultes</option>
                    <option value="4">4 Adultes</option>
                </select>
                <ChevronDown class="w-4 h-4 text-vb-slate absolute right-3 top-3.5 pointer-events-none" />
            </div>
        </div>

        <div class="flex flex-col gap-1.5">
            <label for="children" class="font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-vb-slate flex items-center gap-1.5">
                <Baby class="w-3.5 h-3.5 text-vb-gold" />
                <span>Enfants</span>
            </label>
            <div class="relative">
                <select id="children" bind:value={children} class="w-full font-sans text-[0.9rem] px-3 py-2.5 border border-vb-ivory3 rounded-[4px] focus:outline-none focus:border-vb-gold text-vb-dark bg-vb-ivory/20 appearance-none cursor-pointer">
                    <option value="0">Sans enfant</option>
                    <option value="1">1 Enfant</option>
                    <option value="2">2 Enfants</option>
                    <option value="3">3 Enfants</option>
                </select>
                <ChevronDown class="w-4 h-4 text-vb-slate absolute right-3 top-3.5 pointer-events-none" />
            </div>
        </div>

        <Button type="submit" disabled={erreur !== null} class="w-full bg-vb-gold text-vb-white font-sans font-semibold text-[0.85rem] tracking-wider py-6 rounded-[4px] hover:bg-vb-gold2 shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
            Rechercher
        </Button>

        {#if erreur}
            <p class="col-span-5 -mt-1 flex items-center gap-1.5 font-sans text-[0.78rem] text-amber-700">
                <TriangleAlert class="w-3.5 h-3.5 shrink-0" />
                {erreur}
            </p>
        {/if}
    </form>
</div>
