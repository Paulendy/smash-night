import { Link } from "@remix-run/react";

export default function PlayerIndexPage() {
    return (
        <p>
            No player selected. Select a player on the left, or{" "}
            <Link to="new" className="text-blue-500 underline">
                create a new player.
            </Link>
        </p>
    );
}
