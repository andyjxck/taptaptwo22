import { sql } from "../../../db"; // Make sure this path is correct

async function handler({ action }) {
  try {
    switch (action) {
      case "getLeaderboard": {
        // Query for the leaderboard. Adjust fields/table names as needed!
        const result = await sql`
          SELECT user_id, profile_name, total_coins_earned
          FROM users
          ORDER BY total_coins_earned DESC
          LIMIT 100
        `;
        return { coins: result }; // key "coins" matches what your frontend expects
      }
      // Add other cases as needed
      default:
        return { error: "Invalid action" };
    }
  } catch (error) {
    console.error("Leaderboard error:", error);
    return { error: "Failed to get leaderboard" };
  }
}

export async function POST(request) {
  const result = await handler(await request.json());
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
