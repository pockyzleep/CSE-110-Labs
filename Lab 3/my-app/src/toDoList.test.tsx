import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";
import { ToDoList } from "./toDoList";

describe("Read", () => {
  test("check all item occurences", () => {
    render(<ToDoList />);

    const itemNames = ["Apples", "Bananas"];
    itemNames.forEach((name) => {
      const groceryItem = screen.getByText(name);
      expect(groceryItem).toBeInTheDocument();
    });
  });

  test("verify box count", () => {
    render(<ToDoList />);
    const boxes = screen.getAllByRole("checkbox");

    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

    fireEvent.click(boxes[1]);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

    fireEvent.click(boxes[0]);
    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

    fireEvent.click(boxes[1]);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });
});
