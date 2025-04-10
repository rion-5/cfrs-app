// src/routes/admin/rooms/new/+page.server.ts
import type { Actions } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const type = data.get('type') as 'STUDY' | 'LECTURE' | 'READING';
    const capacity = parseInt(data.get('capacity') as string);
    const location = data.get('location') as string;

    await prisma.room.create({
      data: { name, type, capacity, location }
    });

    throw redirect(303, '/admin/rooms');
  }
};
