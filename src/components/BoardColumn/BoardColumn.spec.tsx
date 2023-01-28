import { render } from "solid-testing-library";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { tasks } from "~/mocks";
import { IBoardColumn } from "~/types";
import { BoardColumn } from "./BoardColumn";

const column: IBoardColumn = {
  id: 1,
  name: "Test",
  created_at: "2021-08-01T12:00:00.000Z",
};

vi.mock("@thisbeyond/solid-dnd", () => ({
  createDraggable: () => () => ({}),
  createDroppable: () => () => ({}),
}));

describe("BoardColumn", () => {
  it("matches snapshot", () => {
    expect(
      render(() => (
        <BoardColumn
          column={column}
          tasks={tasks}
          onDeleteColumn={() => null}
        />
      ))
    ).toMatchSnapshot();
  });
});
