<script>
	import { t } from '$lib/translations';
	import { goto } from '$app/navigation';
	import { pin, selectedRate } from '$lib/store';
	import { enhance } from '$app/forms';
	import { Avatar, Icon, Numpad, Spinner } from '$comp';
	import { page } from '$app/stores';
	import { back, f, s, sats } from '$lib/utils';

	export let data;
	export let form;

	let { recipient, user } = data;
	let currency = user?.currency || 'USD';

	let amount = form?.amount || data.amount;
	let a,
		af,
		amountFiat = amount * ($selectedRate / sats),
		fiat = !amount;

	let setAmount = () => {
		amount = a;
		amountFiat = af;
	};

	let handleBack = () => {
		if (amount) {
			amount = undefined;
			goto(`/send/user/${recipient.username}`);
		} else back();
	};

	let loading;
	let submit = () => (loading = true);

	$: update(form);
	let update = () => {
		if (form?.message.includes('pin')) $pin = undefined;
		loading = false;
	};
</script>

<button class="ml-5 md:ml-20 mt-5 md:mt-10 hover:opacity-80" on:click={handleBack}>
	<Icon icon="arrow-left" style="w-10" />
</button>

{#if form?.message}
	<div class="text-red-600 text-center">
		{form.message}
	</div>
{/if}

<div class="container px-4 mt-20 max-w-xl mx-auto space-y-8">
	{#if amount}
		<div class="text-center mb-8 space-y-5">
			<p class="text-5xl break-words">
				{fiat ? f(amountFiat, currency) : s(amount)}
				{#if !fiat}
					<span class="text-xl md:text-2xl text-secondary">sats</span>
				{/if}
			</p>

			<h1 class="text-xl md:text-2xl text-secondary mb-2">to</h1>

			<div class="flex p-1 gap-2 justify-center">
				<Avatar user={recipient} size={'20'} />
				<p class="text-4xl break-words my-auto">{recipient.username}</p>
			</div>
		</div>
	{:else}
		<Numpad bind:amount={a} bind:amountFiat={af} {currency} bind:fiat />
	{/if}

	<form method="POST" use:enhance on:submit={submit}>
		<input name="amount" value={amount} type="hidden" />
		<input name="username" value={recipient.username} type="hidden" />
		<input name="confirmed" value={form?.confirm} type="hidden" />
		<input name="pin" value={$pin} type="hidden" />

		<div class="flex w-full">
			{#if amount}
				<button
					type="submit"
					class="opacity-100 hover:opacity-80'} rounded-2xl border py-3 font-bold mx-auto mt-2 bg-black text-white px-4 w-24"
				>
					{#if loading}
						<Spinner />
					{:else}
						{$t('transactions.send')}
					{/if}
				</button>
			{:else}
				<button
					type="button"
					class="opacity-100 hover:opacity-80'} rounded-2xl border py-3 font-bold mx-auto mt-2 bg-black text-white px-4 w-24"
					on:click={setAmount}
				>
					Next
				</button>
			{/if}
		</div>
	</form>
</div>
