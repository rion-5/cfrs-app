import { json } from '@sveltejs/kit';
import db from '$lib/server/prisma';
import { startOfDay, addHours, setHours, setMinutes } from 'date-fns';

export const GET = async ({ url }) => {
  const dateStr = url.searchParams.get('date');
  if (!dateStr) return json({ error: 'date query param required' }, { status: 400 });

  const date = new Date(dateStr);
  const start = setHours(setMinutes(startOfDay(date), 0), 9); // 09:00
  const end = setHours(setMinutes(startOfDay(date), 0), 23); // 23:00

  const rooms = await db.room.findMany({ where: { type: 'STUDY' } });
  const reservations = await db.reservation.findMany({
    where: {
      startTime: { gte: start },
      endTime: { lte: end }
    }
  });

  const result = rooms.map(room => {
    const status = [];
    for (let i = 9; i <= 21; i += 2) {
      const slotStart = new Date(date);
      slotStart.setHours(i, 0, 0, 0);
      const slotEnd = addHours(slotStart, 2);

      const isReserved = reservations.some(r =>
        r.roomId === room.id &&
        !(r.endTime <= slotStart || r.startTime >= slotEnd) // 시간 겹침 여부
      );

      status.push({
        start: `${i}:00`,
        available: !isReserved
      });
    }

    return {
      roomId: room.id,
      name: room.name,
      status
    };
  });

  return json(result);
};
