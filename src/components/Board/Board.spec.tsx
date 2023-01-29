import { render } from "solid-testing-library";
import { describe, expect, it, vi } from "vitest";
import { Board } from "./Board";

vi.mock("~/hooks", () => ({
  useColumns: () => ({}),
  usePendingChanges: {},
}));

vi.mock("~/api/columns", () => ({
  fetchBoardTasks: () => [],
}));

describe("Board", () => {
  it("matches snapshot", () => {
    expect(render(() => <Board id={1} />)).toMatchSnapshot();
  });
});
