import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import { Board, Navbar } from "~/components";
import { fetchBoards } from "~/api";

export const [currentBoardId, setCurrentBoardId] = createSignal<number | null>(
  null
);

const App: Component = () => {
  const [boards] = createResource(fetchBoards);

  createEffect(() => {
    console.log("currentBoardId", currentBoardId());
    if (currentBoardId()) return;
    const firstBoard = boards()?.[0];
    if (firstBoard) setCurrentBoardId(firstBoard.id);
  });

  return (
    <main class="p-8 w-screen h-screen flex flex-col">
      <Navbar boards={boards() ?? []} />

      <Show when={currentBoardId()} fallback={"Loading..."}>
        <Board id={currentBoardId() as number} />
      </Show>
    </main>
  );
};

export default App;
