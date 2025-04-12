import type { RequestHandler } from '@sveltejs/kit';
import { pool } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
  const { roomId, userId, name, email, phone, startTime, endTime } = await request.json();

  try {
    const query = `
      INSERT INTO reservation (room_id, user_id, name, email, phone, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
    `;

    const values = [roomId, userId, name, email, phone, startTime, endTime];
    const res = await pool.query(query, values);

    return new Response(JSON.stringify({ id: res.rows[0].id }), { status: 201 });
  } catch (err) {
    console.error('예약 등록 에러:', err);
    return new Response('서버 에러', { status: 500 });
  }
};
