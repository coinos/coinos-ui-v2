<script>
	import { colorTheme } from '$lib/store';
	import { Icon } from '$comp';

	export let user;
	export let size = 32;
	export let disabled = false;
	export let src = undefined;

	$: s = size.toString();
	$: link = user ? `/${user.username}` : '/';
</script>

<a href={link} class:pointer-events-none={disabled}>
	<div
		class="w-{s} h-{s} rounded-full border-4 border-white overflow-hidden bg-gradient-to-r {$colorTheme} flex justify-center items-center"
	>
		{#if user?.profile}
			<img
				src={`/api/public/${user.username}-profile.webp`}
				class="w-full h-full object-cover object-center overflow-hidden"
				alt={user.username}
			/>
		{:else if src}
			<img {src} class="w-full h-full object-cover object-center overflow-hidden" alt="Avatar" />
		{:else}
			<Icon icon="logo-symbol-white" style="w-4/5" />
		{/if}
	</div>
</a>
