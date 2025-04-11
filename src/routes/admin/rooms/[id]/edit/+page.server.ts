// src/routes/admin/rooms/[id]/edit/+page.server.ts
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const room = await prisma.room.findUnique({
		where: { id: Number(params.id) }
	});

	if (!room) {
		return {
			status: 404,
			body: {
				message: 'Room not found'
			}
		};
	}

	return { room };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const capacity = Number(formData.get('capacity'));
		const location = formData.get('location') as string;

		if (!name || isNaN(capacity) || !location) {
			return fail(400, { error: '모든 필드를 올바르게 입력해주세요.' });
		}

		await prisma.room.update({
			where: { id: Number(params.id) },
			data: { name, capacity, location }
		});

		throw redirect(302, '/admin/rooms');
	}
};
