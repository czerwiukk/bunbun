import { createResource } from "solid-js";
import { supabase } from "~/utils";

const [getUserData] = createResource(() => supabase.auth.getUser());

const logout = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};

const signIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
};

const allowedUserEmails = import.meta.env.VITE_ALLOWED_EMAILS.split(",");

export const useUser = () => {
  const user = () => getUserData()?.data.user;

  const isLoggedIn = () => Boolean(user());

  return {
    user,
    logout,
    signIn,
    isLoggedIn,
  };
};
