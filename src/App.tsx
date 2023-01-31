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

  const { signIn, isLoggedIn } = useUser();

  createEffect(() => {
    if (currentBoardId()) return;
    const firstBoard = boards()?.[0];
    if (firstBoard) setCurrentBoardId(firstBoard.id);
  });

  return (
    <main class="flex h-screen w-screen flex-col bg-stone-50 p-8 dark:bg-stone-900">
      <Show
        when={isLoggedIn()}
        fallback={
          <section>
            <button
              class="btn-sm btn border-0 bg-transparent text-stone-900  hover:bg-amber-100 dark:text-stone-100 hover:dark:bg-stone-700"
              onClick={signIn}
            >
              Sign in
            </button>
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
