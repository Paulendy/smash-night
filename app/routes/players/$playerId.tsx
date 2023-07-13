import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Player } from "~/models/player.server";
import { deletePlayer, getPlayer } from "~/models/player.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
    player: Player;
};

export async function loader({ request, params }: LoaderArgs) {
    await requireUserId(request);
    invariant(params.playerId, "playerId not found");

    const player = await getPlayer({ id: params.playerId });
    if (!player) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ player });
}

export const action: ActionFunction = async ({ request, params }) => {
    await requireUserId(request);
    invariant(params.playerId, "playerId not found");

    await deletePlayer({ id: params.playerId });

    return redirect("/players");
};

export default function PlayerDetailsPage() {
    const data = useLoaderData<typeof loader>() as LoaderData;

    return (
        <div>
            <h3 className="text-2xl font-bold">{data.player.name}</h3>
            <hr className="my-4" />
            <Form method="post">
                <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Delete
                </button>
            </Form>
        </div>
    );
}
