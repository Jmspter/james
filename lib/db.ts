import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

// Initialize database tables
export async function initDatabase() {
    await sql`
        CREATE TABLE IF NOT EXISTS post_likes (
            id SERIAL PRIMARY KEY,
            post_slug VARCHAR(255) NOT NULL UNIQUE,
            like_count INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
}
