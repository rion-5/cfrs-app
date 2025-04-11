// src/routes/admin/rooms/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load = async () => {
	const rooms = await prisma.room.findMany({ orderBy: { name: 'asc' } });
	return { rooms };
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

        const roomId = Number(id);

        if (!roomId || isNaN(roomId)) {
            return fail(400, { message: '유용한 방 ID가 아닙니다.' });
        }

        await prisma.room.delete({ where: {id: roomId}});

        throw redirect(303, '/admin/rooms');
	}
};
