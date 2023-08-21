import { useState } from 'react';

const initalNotes = [
  {
    heading: 'Grocery List',
    text: 'oranges, apples, lunch meat, corn, carrots',
    id: 335875,
  },
  {
    heading: 'P90X Videos',
    text: 'chest and back, plyometrics, shoulders and arms, legs and back, back and byceps',
    id: 449883,
  },
];

export default function App() {
  const [allNotes, setAllNotes] = useState(initalNotes);
  const [openModal, setopenModal] = useState(false);

  const [currentNote, setCurrentNote] = useState(null);

  function handleUpdateNoteHeading(id, value) {
    setAllNotes(allNotes =>
      allNotes.map(note =>
        note.id === id ? { ...note, heading: value } : note
      )
    );
  }

  function handleUpdateNoteText(id, value) {
    setAllNotes(allNotes =>
      allNotes.map(note => (note.id === id ? { ...note, text: value } : note))
    );
  }

  function handleToggleModal() {
    setopenModal(modal => !modal);
  }

  function handleAddNote(note) {
    setAllNotes(allNotes => [...allNotes, note]);
  }

  function handleCurrentNote(note) {
    setCurrentNote(note);
  }

  return (
    <div className="app">
      <SearchBar />
      <NotesContainer
        allNotes={allNotes}
        onCurrentNote={handleCurrentNote}
        onUpdateNoteText={handleUpdateNoteText}
        onUpdateNoteHeading={handleUpdateNoteHeading}
      />
      <AddNoteBtn onToggleModal={handleToggleModal} />
      {openModal && (
        <Modal onToggleModal={handleToggleModal} onAddNote={handleAddNote} />
      )}
    </div>
  );
}

function SearchBar() {
  return (
    <div className="searchbar">
      <form className="section-center searchbar-center">
        <input
          type="text"
          placeholder="Search Notes"
          className="searchbar-input"
        />
        <button className="searchbar-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
}

function NotesContainer({
  allNotes,
  onUpdateNoteText,
  onUpdateNoteHeading,
  onCurrentNote,
}) {
  return (
    <div className="notes-container section-center ">
      {allNotes.map(note => (
        <Note
          note={note}
          onCurrentNote={onCurrentNote}
          onUpdateNoteText={onUpdateNoteText}
          onUpdateNoteHeading={onUpdateNoteHeading}
          key={note.id}
        />
      ))}
    </div>
  );
}

function Note({ note, onUpdateNoteText, onUpdateNoteHeading, onCurrentNote }) {
  return (
    <div className="note" onClick={() => onCurrentNote(note)}>
      <div className="note-heading-wrapper">
        <input
          className="note-heading-input"
          type="text"
          value={note.heading}
          onChange={e => onUpdateNoteHeading(note.id, e.target.value)}
        />
        <button className="note-settings-btn">
          <i className="fa-solid fa-ellipsis-vertical note-settings"></i>
        </button>
      </div>
      <textarea
        className="note-text-textarea"
        type="text"
        value={note.text}
        onChange={e => onUpdateNoteText(note.id, e.target.value)}
      />
    </div>
  );
}

function AddNoteBtn({ onToggleModal }) {
  return (
    <button className="add-note-btn" onClick={onToggleModal}>
      <i className="fa-solid fa-plus fa-fw"></i>
    </button>
  );
}

function Modal({ onToggleModal, onAddNote }) {
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');

  function handleCreateNote(e) {
    e.preventDefault();

    if (!heading || !text) return;

    const newNote = {
      heading,
      text,
      id: crypto.randomUUID(),
    };

    onToggleModal();
    console.log(newNote);
    onAddNote(newNote);
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleCreateNote}>
          <div className="modal-heading">
            <label htmlFor="heading" className="modal-label">
              Note Heading:
            </label>
          </div>
          <div>
            <input
              type="text"
              className="modal-input"
              id="heading"
              value={heading}
              onChange={e => setHeading(e.target.value)}
            />
          </div>
          <div className="modal-text">
            <label htmlFor="text" className="modal-label">
              Note Text:
            </label>
            <input
              type="text"
              className="modal-input"
              id="text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          <button className="modal-create-btn">Create Note</button>
        </form>
        <button className="modal-close-btn" onClick={onToggleModal}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
}
