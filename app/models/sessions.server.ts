import { supabase } from "./user.server";

export type Session = {
  id: string;
  location: string;
  play_date: Date;
};

export async function getSessionListItems() {
  const { data } = await supabase
    .from("sessions")
    .select("id, location, play_date");

  return data;
}

export async function createSession({
  location,
  play_date,
}: Pick<Session, "location" | "play_date">) {
  const { data, error } = await supabase
    .from("sessions")
    .insert([{ location, play_date }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteSession({ id }: Pick<Session, "id">) {
  const { error } = await supabase
    .from("sessions")
    .delete({ returning: "minimal" })
    .match({ id });

  if (!error) {
    return {};
  }

  return null;
}

export async function getSession({ id }: Pick<Session, "id">) {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (!error) {
    return {
      id: data.id,
      location: data.location,
      play_date: data.play_date,
    };
  }

  return null;
}
