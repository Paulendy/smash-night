import { Link } from "@remix-run/react";

export default function SessionIndexPage() {
    return (
        <p>
            No session selected. Select a session on the left, or{" "}
            <Link to="new" className="text-blue-500 underline">
                create a new session.
            </Link>
        </p>
    );
}
