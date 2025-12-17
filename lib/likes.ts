"use server";

import { sql } from "./db";

// Validate post slug format (alphanumeric, hyphens, underscores only)
function isValidSlug(slug: string): boolean {
    if (!slug || typeof slug !== "string") return false;
    if (slug.length > 100) return false; // Prevent excessively long slugs
    return /^[a-z0-9-_]+$/i.test(slug);
}

export async function getLikeCount(postSlug: string): Promise<number> {
    if (!isValidSlug(postSlug)) {
        return 0;
    }
    
    try {
        const result = await sql`
            SELECT like_count FROM post_likes WHERE post_slug = ${postSlug}
        `;
        return result[0]?.like_count ?? 0;
    } catch {
        return 0;
    }
}

export async function incrementLike(postSlug: string): Promise<number> {
    if (!isValidSlug(postSlug)) {
        throw new Error("Invalid post slug");
    }
    
    try {
        // Upsert: insert or update if exists
        const result = await sql`
            INSERT INTO post_likes (post_slug, like_count, updated_at)
            VALUES (${postSlug}, 1, CURRENT_TIMESTAMP)
            ON CONFLICT (post_slug)
            DO UPDATE SET 
                like_count = post_likes.like_count + 1,
                updated_at = CURRENT_TIMESTAMP
            RETURNING like_count
        `;
        return result[0]?.like_count ?? 1;
    } catch (error) {
        console.error("Error incrementing like:", error);
        throw new Error("Failed to add like");
    }
}

export async function getAllLikeCounts(): Promise<Record<string, number>> {
    try {
        const result = await sql`
            SELECT post_slug, like_count FROM post_likes
            LIMIT 1000
        `;
        return result.reduce<Record<string, number>>((acc, row) => {
            acc[row.post_slug as string] = row.like_count as number;
            return acc;
        }, {});
    } catch {
        return {};
    }
}
