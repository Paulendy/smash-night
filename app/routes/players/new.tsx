import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createPlayer } from "~/models/player.server";
import { requireUserId } from "~/session.server";


export const action: ActionFunction = async ({ request }) => {
    await requireUserId(request);
    const formData = await request.formData();
    const name = formData.get("name");

    if (typeof name !== "string" || name.length === 0) {
        return json({ errors: { name: "Name is required" } }, { status: 400 });
    }

    const player = await createPlayer({ name });
    return redirect(`/players/${player.id}`);
};

export default function NewPlayerPage() {


    return (
        <Form
            method="post"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
            }}
        >
            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Name: </span>
                    <input
                        name="name"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                    />
                </label>
            </div>

            <div className="text-right">
                <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Save
                </button>
            </div>
        </Form>
    );
}
