import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from "solid-js";
import { Board, Navbar } from "~/components";
import { fetchBoards } from "~/api";
import { useUser } from "./hooks/user";

export const [currentBoardId, setCurrentBoardId] = createSignal<number | null>(
  null
);

const App: Component = () => {
  const [boards] = createResource(fetchBoards);

  const { user, signIn } = useUser();

  createEffect(() => {
    console.log("currentBoardId", currentBoardId());
    if (currentBoardId()) return;
    const firstBoard = boards()?.[0];
    if (firstBoard) setCurrentBoardId(firstBoard.id);
  });

  return (
    <main class="flex h-screen w-screen flex-col bg-stone-50 p-8 dark:bg-stone-900">
      <Show
        when={!!user()}
        fallback={
          <section>
            <button onClick={signIn}>Sign in</button>
          </section>
        }
      >
        <Navbar boards={boards() ?? []} />

        <Show when={currentBoardId()} fallback={"Loading..."}>
          <Board id={currentBoardId() as number} />
        </Show>
      </Show>
    </main>
  );
};

export default App;
