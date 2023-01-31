import { Component, For } from "solid-js";
import { currentBoardId, setCurrentBoardId } from "~/App";
import bunbunSvg from "~/assets/bunbun.svg";
import { useUser } from "~/hooks/user";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

interface NavbarProps {
  boards: { id: number; name: string }[];
}

export const Navbar: Component<NavbarProps> = (props) => {
  const { logout, user } = useUser();
  return (
    <nav class="-100 flex items-center gap-16  text-stone-900 dark:text-stone-100">
      <div class="flex select-none items-center">
        <h1 class="text-6xl font-black">
          <span class="text-amber-500">bun</span>

          <span class="-m-2 text-amber-400">bun</span>
        </h1>

        <img width={72} src={bunbunSvg} alt="bunbun logo" />
      </div>

      <ul class="flex gap-12">
        <For each={props.boards}>
          {(board) => (
            <li
              class="btn-sm btn border-0 bg-transparent text-stone-900  hover:bg-amber-100 dark:text-stone-100 hover:dark:bg-stone-700"
              classList={{
                "hover:bg-amber-500 bg-amber-400 dark:bg-stone-600 hover:dark:bg-stone-500":
                  currentBoardId() === board.id,
              }}
              onClick={() => {
                console.log(board);
                setCurrentBoardId(board.id);
              }}
            >
              {board.name}
            </li>
          )}
        </For>
      </ul>

      <ThemeSwitch />

      <section>Logged in as {user()?.email}</section>

      <button
        class="btn-sm btn border-0 bg-transparent text-stone-900  hover:bg-amber-100 dark:text-stone-100 hover:dark:bg-stone-700"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
};
