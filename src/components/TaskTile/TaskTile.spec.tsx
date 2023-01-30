import { render } from "solid-testing-library";
import { describe, expect, it, vi } from "vitest";
import { tasks } from "~/mocks";
import { TaskTile } from "./TaskTile";

vi.mock("@thisbeyond/solid-dnd", () => ({
  createDraggable: () => () => ({}),
}));

describe("TaskTile", () => {
  it("matches snapshot", () => {
    expect(render(() => <TaskTile task={tasks[0]} />, {})).toMatchSnapshot();
  });
});
