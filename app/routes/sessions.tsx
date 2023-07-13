import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { SyncLoader } from "react-spinners";
import type { Session } from "~/models/sessions.server";
import { getSessionListItems } from "~/models/sessions.server";
import { requireUserId } from "~/session.server";
import colors from 'tailwindcss/colors'

type LoaderData = {
    sessionListItems: Session[];
};

export async function loader({ request }: LoaderArgs) {
    await requireUserId(request);
    const sessionListItems = await getSessionListItems();
    return json({ sessionListItems });
}


export default function SessionsPage() {
    const data = useLoaderData<typeof loader>() as LoaderData;

    const navigation = useNavigation()

    return (
        <div className="flex h-full min-h-screen flex-col">
            {/* <Header /> */}
            <main className="flex h-full bg-white">
                <div className="h-full w-80 border-r bg-gray-50">
                    <Link to="new" className="block p-4 text-xl text-blue-500">
                        + New Session
                    </Link>

                    <hr />

                    {data.sessionListItems.length === 0 ? (
                        <p className="p-4">No sessions yet</p>
                    ) : (
                        <ol>
                            {data.sessionListItems.map((session) => (
                                <li key={session.id}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                                        }
                                        to={session.id}
                                    >
                                        🏠 {`${new Date(session.play_date).toISOString().substring(0, 10)} - ${session.location}`}
                                    </NavLink>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>

                <div className="flex-1 p-6">
                    {navigation.state == "idle" ? <Outlet /> : <SyncLoader loading={true} color={colors.slate[800]} />}
                </div>
            </main>
        </div>
    );
}
