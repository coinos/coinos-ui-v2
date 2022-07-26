import { invalid, redirect } from '@sveltejs/kit';
import { auth, post } from '$lib/utils';

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			let { address, amount, pin } = Object.fromEntries(await request.formData());
			let { tx } = await post('/bitcoin/fee', { address, amount }, auth(cookies));
			await post('/bitcoin/send', { address, pin, tx }, auth(cookies));
		} catch (e) {
			return invalid(400, { message: e.message });
		}

		throw redirect(307, '/sent');
	}
};
