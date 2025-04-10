// src/routes/rooms/+page.server.ts
import prisma from '$lib/server/prisma';

export async function load() {
  const rooms = await prisma.room.findMany();
  return { rooms };
}
