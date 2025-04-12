import  prisma  from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const rooms = await prisma.room.findMany({
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
  });

  return { rooms };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const roomId = Number(formData.get('roomId'));
    const userId = formData.get('userId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;

    // 기본 유효성 검사
    if (!roomId || !userId || !name || !startTime || !endTime) {
      return fail(400, { error: '필수 항목이 누락되었습니다.' });
    }

    try {
      await prisma.reservation.create({
        data: {
          roomId,
          userId,
          name,
          email,
          phone,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        }
      });

      // 성공 시 예약 목록으로 리디렉션
      throw redirect(303, '/admin/reservations');
    } catch (err) {
      console.error(err);
      return fail(500, { error: '예약 저장 중 오류가 발생했습니다.' });
    }
  }
};
