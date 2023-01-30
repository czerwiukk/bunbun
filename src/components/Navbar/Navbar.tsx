import { Component, For } from "solid-js";
import { currentBoardId, setCurrentBoardId } from "~/App";
import bunbunSvg from "~/assets/bunbun.svg";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

interface NavbarProps {
  boards: { id: number; name: string }[];
}

export const Navbar: Component<NavbarProps> = (props) => (
  <nav class="flex items-center gap-16">
    <div class="flex items-center select-none">
      <h1 class="text-6xl font-black">
        <span class="text-amber-500">bun</span>

        <span class="text-amber-400 -m-2">bun</span>
      </h1>

      <img width={72} src={bunbunSvg} alt="bunbun logo" />
    </div>

    <ul class="flex gap-12">
      <For each={props.boards}>
        {(board) => (
          <li
            class="btn btn-sm bg-transparent hover:bg-amber-100 hover:dark:bg-stone-700  text-stone-900 dark:text-stone-100 border-0"
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
  </nav>
);
