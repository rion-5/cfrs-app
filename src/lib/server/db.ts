// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// src/lib/server/db.ts

import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();
export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// 템플릿 리터럴 SQL → 바인딩용 함수
export const sql = (strings: TemplateStringsArray, ...values: unknown[]) => {
	const text = strings.reduce(
		(prev, curr, i) => prev + (i < values.length ? `$${i + 1}` : '') + curr,
		''
	);
	return pool.query(text, values);
};
