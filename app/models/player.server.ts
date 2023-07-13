import { supabase } from "./user.server";

export type Player = {
  id: string;
  name: string;
};

export async function getPlayerListItems() {
  const { data } = await supabase.from("players").select("id, name");

  return data;
}

export async function createPlayer({ name }: Pick<Player, "name">) {
  const { data, error } = await supabase
    .from("players")
    .insert([{ name }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deletePlayer({ id }: Pick<Player, "id">) {
  const { error } = await supabase
    .from("player")
    .delete({ returning: "minimal" })
    .match({ id });

  if (!error) {
    return {};
  }

  return null;
}

export async function getPlayer({ id }: Pick<Player, "id">) {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("id", id)
    .single();

  if (!error) {
    return {
      id: data.id,
      name: data.name,
    };
  }

  return null;
}
