import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

// attempted tests (some initial redundancy for some tests but a nice purview to trial and err)
describe("Read Dummy Notes", () => {
  test("Check initial dummy notes", () => {
    render(<StickyNotes />);
    for (let i = 1; i <= 6; i++) {
      const noteNum = screen.getByText(`test note ${i} title`);
      expect(noteNum).toBeInTheDocument();
    }
  });

  describe("Read", () => {
    test("confirm present notes", () => {
      render(<StickyNotes />);

      dummyNotesList.forEach((note) => {
        const titleElem = screen.getByTestId(`note-title-${note.id}`);
        expect(titleElem).toHaveTextContent(note.title);

        const noteElem = screen.getByTestId(`note-${note.id}`);
        expect(noteElem).toBeInTheDocument();

        const contentElem = screen.getByTestId(`note-content-${note.id}`);
        expect(contentElem).toHaveTextContent(note.content);
      });
    });

    describe("Create", () => {
      test("create new note", () => {
        render(<StickyNotes />);

        // create new note
        const submitButton = screen.getByText("Create Note");
        const newTitle = screen.getByPlaceholderText("Note Title");
        const newContent = screen.getByPlaceholderText("Note Content");

        fireEvent.change(newTitle, { target: { value: "New Note" } });
        fireEvent.change(newContent, {
          target: { value: "New Content" },
        });
        fireEvent.click(submitButton);

        // confirm new note made
        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("New Content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
      });
    });
  });

  describe("Update", () => {
    test("update note title", () => {
      render(<StickyNotes />);

      // select first note using click()
      const firstNote = screen.getByTestId(`note-${dummyNotesList[0].id}`);
      fireEvent.click(firstNote);

      // update title
      const titleElement = screen.getByTestId(
        `note-title-${dummyNotesList[0].id}`
      );

      // refer: https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property
      fireEvent.input(titleElement, {
        target: { textContent: "Updated Title" },
        currentTarget: { textContent: "Updated Title" },
      });
      fireEvent.blur(titleElement);

      expect(titleElement).toHaveTextContent("Updated Title");
    });

    test("updates note content when edited", () => {
      render(<StickyNotes />);

      // Click the first note to select it
      const firstNote = screen.getByTestId(`note-${dummyNotesList[0].id}`);
      fireEvent.click(firstNote);

      // Get the content element and simulate editing
      const contentElement = screen.getByTestId(
        `note-content-${dummyNotesList[0].id}`
      );
      fireEvent.input(contentElement, {
        target: { textContent: "Updated Content" },
        currentTarget: { textContent: "Updated Content" },
      });
      fireEvent.blur(contentElement);

      expect(contentElement).toHaveTextContent("Updated Content");
    });
  });

  describe("Delete", () => {
    test("trigger x button to delete note", () => {
      render(<StickyNotes />);

      const note1 = dummyNotesList[0].id;
      const deleteButton = screen.getByTestId(`delete-note-${note1}`);

      // delete the singular note
      fireEvent.click(deleteButton);

      // check
      expect(screen.queryByTestId(`note-${note1}`)).not.toBeInTheDocument();
    });

    test("edge case: remove succeeding note and retain that the first precedent note is still there", () => {
      render(<StickyNotes />);

      const note2 = dummyNotesList[1].id;
      const xButton = screen.getByTestId(`delete-note-${note2}`);

      // remove 2nd note
      fireEvent.click(xButton);

      // check first note presence else fail
      expect(
        screen.getByTestId(`note-${dummyNotesList[0].id}`)
      ).toBeInTheDocument();
      expect(screen.queryByTestId(`note-${note2}`)).not.toBeInTheDocument();
    });
  });
});
