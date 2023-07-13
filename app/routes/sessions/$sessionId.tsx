import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Session } from "~/models/sessions.server";
import { deleteSession, getSession } from "~/models/sessions.server";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
    session: Session;
};

export async function loader({ request, params }: LoaderArgs) {
    await requireUserId(request);
    invariant(params.sessionId, "sessionId not found");

    const session = await getSession({ id: params.sessionId });
    if (!session) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ session });
}

export const action: ActionFunction = async ({ request, params }) => {
    await requireUserId(request);
    invariant(params.sessionId, "sessionId not found");

    await deleteSession({ id: params.sessionId });

    return redirect("/sessions");
};

export default function SessionDetailsPage() {
    const data = useLoaderData<typeof loader>() as LoaderData;

    return (
        <div>
            <h3 className="text-2xl font-bold">{data.session.location}</h3>
            <p className="py-6">{new Date(data.session.play_date).toISOString().substring(0, 10)}</p>
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
