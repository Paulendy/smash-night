import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import type { Player } from "~/models/player.server";
import { getPlayerListItems } from "~/models/player.server";
import { requireUserId } from "~/session.server";
import { SyncLoader } from "react-spinners";
import colors from 'tailwindcss/colors'


type LoaderData = {
    playerListItems: Player[];
};

export async function loader({ request }: LoaderArgs) {
    await requireUserId(request);
    const playerListItems = await getPlayerListItems();
    return json({ playerListItems });
}


export default function PlayersPage() {
    const data = useLoaderData<typeof loader>() as LoaderData;

    const navigation = useNavigation()

    return (
        <div className="flex h-full min-h-screen flex-col">
            {/* <Header /> */}
            <main className="flex h-full bg-white">
                <div className="h-full w-80 border-r bg-gray-50">
                    <Link to="new" className="block p-4 text-xl text-blue-500">
                        + New Player
                    </Link>

                    <hr />

                    {data.playerListItems.length === 0 ? (
                        <p className="p-4">No players yet</p>
                    ) : (
                        <ol>
                            {data.playerListItems.map((player) => (
                                <li key={player.id}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                                        }
                                        to={player.id}
                                    >
                                        🧙‍♂️ {`${player.name}`}
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