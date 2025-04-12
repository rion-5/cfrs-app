// import type { RequestHandler } from '@sveltejs/kit';
// import { json } from '@sveltejs/kit';
// import db from '$lib/server/prisma';

// export const POST: RequestHandler = async ({ request }) => {
//   const data = await request.json();
//   const { date, room, startTime, userId, name, email, phone } = data;

//   // 예약 중복 확인 (예시)
//   const existing = await db.reservation.findFirst({
//     where: { date, room, startTime }
//   });

//   if (existing) {
//     return json({ message: '이미 예약된 시간입니다.' }, { status: 409 });
//   }

//   // 저장
//   await db.reservation.create({
//     data: {
//       date,
//       room,
//       startTime,
//       userId,
//       name,
//       email,
//       phone
//     }
//   });

//   return json({ message: '예약 성공' });
// };
