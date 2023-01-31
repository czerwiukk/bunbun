import { createResource } from "solid-js";
import { supabase } from "~/utils";

const [user] = createResource(() => supabase.auth.getUser());
const logout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};
const signIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const useUser = () => {
  return {
    user: () => user()?.data.user,
    logout,
    signIn,
    isLoggedIn: () => Boolean(user()?.data.user),
  };
};
