import { Component, For } from "solid-js";
import { setCurrentBoardId } from "~/App";
import bunbunSvg from "~/assets/bunbun.svg";

interface NavbarProps {
  boards: { id: number; name: string }[];
}

export const Navbar: Component<NavbarProps> = (props) => (
  <nav class="flex items-center gap-16">
    <div class="flex items-center">
      <h1 class="text-6xl font-black">
        <span class="text-amber-900">bun</span>

        <span class="text-amber-400 -m-1">bun</span>
      </h1>

      <img class="-m-1" width={70} src={bunbunSvg} alt="bunbun logo" />
    </div>

    <ul class="flex gap-16">
      <For each={props.boards}>
        {(board) => (
          <li
            class="btn"
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
  </nav>
);
