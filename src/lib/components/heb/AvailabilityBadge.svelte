<script lang="ts">
	import { CircleCheck, Clock, CalendarClock } from '@lucide/svelte';
	import type { RoomAvailabilityApi } from '$lib/types/api';

	/**
	 * Pastille d'état d'une chambre.
	 *
	 * Une chambre occupée reste réservable pour les dates où elle sera libre :
	 * la pastille dit jusqu'à quand elle est prise plutôt que de laisser croire
	 * qu'elle n'est pas au catalogue.
	 *
	 * `availability` peut être absent si l'API tourne dans une version
	 * antérieure — on n'affiche alors rien plutôt qu'un état inventé.
	 */
	let {
		availability = null,
		size = 'sm'
	}: { availability?: RoomAvailabilityApi | null; size?: 'sm' | 'md' } = $props();

	const styles: Record<string, string> = {
		available: 'bg-emerald-50 text-emerald-800 border-emerald-200',
		preparing: 'bg-amber-50 text-amber-800 border-amber-200',
		occupied: 'bg-slate-100 text-slate-700 border-slate-200',
		unavailable: 'bg-slate-100 text-slate-500 border-slate-200'
	};

	const icons: Record<string, typeof CircleCheck> = {
		available: CircleCheck,
		preparing: Clock,
		occupied: CalendarClock,
		unavailable: CalendarClock
	};

	let tone = $derived(styles[availability?.state ?? 'available'] ?? styles.available);
	let Icon = $derived(icons[availability?.state ?? 'available'] ?? CircleCheck);
	let padding = $derived(size === 'md' ? 'px-3 py-1.5 text-[0.8rem]' : 'px-2.5 py-1 text-[0.7rem]');
</script>

{#if availability?.label}
	<span
		class="inline-flex items-center gap-1.5 rounded-full border font-sans font-semibold {tone} {padding}"
	>
		<Icon class="w-3.5 h-3.5 shrink-0" />
		{availability.label}
	</span>
{/if}
