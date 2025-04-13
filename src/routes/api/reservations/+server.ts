// // src/routes/api/reservations/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { sql } from '$lib/server/db';

export const GET: RequestHandler = async ({ url }) => {
	const date = url.searchParams.get('date');
	if (!date) return new Response('Missing date parameter', { status: 400 });

	try {
		const result = await sql`
			SELECT * FROM "Reservation"
			WHERE DATE("startTime") = ${date}
			ORDER BY "startTime"
		`;

		return new Response(JSON.stringify(result.rows), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error(err);
		return new Response('Internal Server Error', { status: 500 });
	}
};
