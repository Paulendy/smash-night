import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createSession } from "~/models/sessions.server";
import { requireUserId } from "~/session.server";

let curr = (new Date());


export const action: ActionFunction = async ({ request }) => {
    await requireUserId(request);
    const formData = await request.formData();
    const location = formData.get("location");
    const play_date = new Date(formData.get("play_date")!.toString()) || curr;

    if (typeof location !== "string" || location.length === 0) {
        return json({ errors: { location: "Location is required" } }, { status: 400 });
    }

    const session = await createSession({ location, play_date });
    return redirect(`/sessions/${session.id}`);
};

export default function NewSessionPage() {


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
                    <span>Location: </span>
                    <input
                        name="location"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                    />
                </label>
            </div>
            <div>
                <label className="flex w-full flex-col gap-1">
                    <span>Play Date: </span>
                    <input
                        name="play_date"
                        type="date"
                        defaultValue={curr.toISOString().substring(0, 10)}
                        className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
                    ></input>
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
