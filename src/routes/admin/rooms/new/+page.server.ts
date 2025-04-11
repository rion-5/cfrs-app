// src/routes/admin/rooms/new/+page.server.ts
import type { Actions } from './$types';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const type = formData.get('type') as 'STUDY' | 'LECTURE' | 'READING';
    const capacity = parseInt(formData.get('capacity') as string);
    const location = formData.get('location') as string;

    await prisma.room.create({
      data: { name, type, capacity, location }
    });

    throw redirect(303, '/admin/rooms');
  }
};
