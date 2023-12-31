import { useRef, useState } from 'react';

import kitchenImg from './img/kitchen-bcg.jpg';
import cookingImg from './img/cooking-bcg.jpg';
import musicImg from './img/music-bcg.jpg';
import fireworkImg from './img/firework-bcg.jpg';
import videoImg from './img/movie-bcg.jpg';
import galaxyImg from './img/galaxy-bcg.jpg';
import spaceImg from './img/space-bcg.jpg';

const initalNotes = [
  {
    heading: '',
    text: '',
    background: '#fff',
    id: 335875,
  },
];

export default function App() {
  const [allNotes, setAllNotes] = useState(initalNotes);
  const [filteredNotes, setfilteredNotes] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [curOpen, setCurOpen] = useState(null);

  const bottomEl = useRef(null);

  function handleScrollToBottom() {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function handleFilterSearchResults(value) {
    setSearchInput(value);
    setCurOpen(false);

    setfilteredNotes(
      allNotes.filter(
        note =>
          note.heading.toLowerCase().includes(value.toLowerCase()) ||
          note.text.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  function handleUpdateNoteHeading(id, value) {
    setAllNotes(allNotes =>
      allNotes.map(note =>
        note.id === id ? { ...note, heading: value } : note
      )
    );

    setfilteredNotes(allFilteredNotes =>
      allFilteredNotes.map(note =>
        note.id === id ? { ...note, heading: value } : note
      )
    );
  }

  function handleUpdateNoteText(id, value) {
    setAllNotes(allNotes =>
      allNotes.map(note => (note.id === id ? { ...note, text: value } : note))
    );

    setfilteredNotes(allFilteredNotes =>
      allFilteredNotes.map(note =>
        note.id === id ? { ...note, text: value } : note
      )
    );
  }

  function handleUpdateNoteBackground(id, backgroundValue) {
    setAllNotes(AllNotes =>
      AllNotes.map(note =>
        note.id === id ? { ...note, background: backgroundValue } : note
      )
    );

    setfilteredNotes(AllFilteredNotes =>
      AllFilteredNotes.map(note =>
        note.id === id ? { ...note, background: backgroundValue } : note
      )
    );
  }

  function handleAddNote(note) {
    setAllNotes(allNotes => [...allNotes, note]);
    setSearchInput('');
  }

  function handleDeleteNote(id) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this note?`
    );
    if (confirmed) {
      setAllNotes(allNotes => allNotes.filter(note => note.id !== id));

      setfilteredNotes(allFilteredNotes =>
        allFilteredNotes.filter(note => note.id !== id)
      );
    }
  }

  return (
    <div className="app">
      <SearchBar
        searchInput={searchInput}
        onFilterSearchResults={handleFilterSearchResults}
      />
      <NotesContainer
        allNotes={allNotes}
        onUpdateNoteText={handleUpdateNoteText}
        onUpdateNoteHeading={handleUpdateNoteHeading}
        onUpdateNoteBackground={handleUpdateNoteBackground}
        onDeleteNote={handleDeleteNote}
        filteredNotes={filteredNotes}
        searchInput={searchInput}
        curOpen={curOpen}
        setCurOpen={setCurOpen}
      />
      <AddNoteBtn
        onAddNote={handleAddNote}
        onScrollToBottom={handleScrollToBottom}
      />
      <Footer bottomEl={bottomEl} />
    </div>
  );
}

function SearchBar({ searchInput, onFilterSearchResults }) {
  return (
    <div className="searchbar">
      <div className="section-center searchbar-center">
        <input
          type="text"
          placeholder="Search Notes"
          className="searchbar-input"
          id="search-notes"
          value={searchInput}
          onChange={e => onFilterSearchResults(e.target.value)}
        />
        <label htmlFor="search-notes" className="searchbar-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>
      </div>
    </div>
  );
}

function NotesContainer({
  allNotes,
  onUpdateNoteText,
  onUpdateNoteHeading,
  onUpdateNoteBackground,
  onDeleteNote,
  filteredNotes,
  searchInput,
  curOpen,
  setCurOpen,
}) {
  return (
    <div className="notes-container section-center">
      {!searchInput &&
        allNotes.map(note => (
          <Note
            note={note}
            onUpdateNoteText={onUpdateNoteText}
            onUpdateNoteHeading={onUpdateNoteHeading}
            onUpdateNoteBackground={onUpdateNoteBackground}
            onDeleteNote={onDeleteNote}
            curOpen={curOpen}
            onOpen={setCurOpen}
            key={note.id}
          />
        ))}

      {searchInput &&
        filteredNotes &&
        filteredNotes.map(note => (
          <Note
            note={note}
            onUpdateNoteText={onUpdateNoteText}
            onUpdateNoteHeading={onUpdateNoteHeading}
            onUpdateNoteBackground={onUpdateNoteBackground}
            onDeleteNote={onDeleteNote}
            curOpen={curOpen}
            onOpen={setCurOpen}
            key={note.id}
          />
        ))}

      {searchInput && filteredNotes.length <= 0 && (
        <div className="no-results-message">
          <h3>
            no results matched your search for{' '}
            <span className="no-results-input-text"> '{searchInput}'</span>
          </h3>
          <p className="no-results-note">
            please clear the search field to see all notes
          </p>
        </div>
      )}
    </div>
  );
}

function Note({
  note,
  onUpdateNoteText,
  onUpdateNoteHeading,
  onUpdateNoteBackground,
  onDeleteNote,
  curOpen,
  onOpen,
}) {
  const isOpen = note.id === curOpen;

  const [toggleNoteBtns, setToggleNoteBtns] = useState(true);
  const [toggleNoteBcg, setToggleNoteBcg] = useState(false);

  function handleToggleNoteBtns() {
    setToggleNoteBtns(noteBcg => !noteBcg);
  }

  function handleCloseSettings() {
    onOpen(null);
  }

  function handleFlipNote(id) {
    onOpen(id);
  }

  function changeNoteBcg(color, note) {
    onUpdateNoteBackground(note.id, color);
    setToggleNoteBcg(false);
  }

  function changeNoteImg(url, note) {
    onUpdateNoteBackground(note.id, url);
    setToggleNoteBcg(true);
  }

  return (
    <article
      className={isOpen && toggleNoteBcg ? 'note note-img' : 'note'}
      style={{ background: note.background }}
    >
      {!isOpen && (
        <>
          <div className="note-heading-wrapper">
            <input
              className="note-heading-input"
              style={
                note.background === '#fff'
                  ? { color: 'black' }
                  : { color: '#fff' }
              }
              type="text"
              value={note.heading}
              placeholder="Title"
              onChange={e => onUpdateNoteHeading(note.id, e.target.value)}
            />
            <button
              className="note-settings-btn"
              style={
                note.background === '#fff'
                  ? { color: 'black' }
                  : { color: '#fff' }
              }
              onClick={() => handleFlipNote(note.id)}
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
          <div className="note-text-wrapper">
            <div className="grow-wrap">
              <textarea
                className="note-text-textarea"
                style={
                  note.background === '#fff'
                    ? { color: 'black' }
                    : { color: '#fff' }
                }
                type="text"
                value={note.text}
                placeholder="Note"
                onChange={e => onUpdateNoteText(note.id, e.target.value)}
                onInput={e =>
                  (e.target.parentNode.dataset.replicatedValue = e.target.value)
                }
                onClick={e =>
                  (e.target.parentNode.dataset.replicatedValue = e.target.value)
                }
              />
            </div>
          </div>
        </>
      )}

      {isOpen && (
        <div className="note-back-container">
          {toggleNoteBtns ? (
            <div className="note-back-circle-container">
              <div
                className="note-back-circle note-coral"
                onClick={() => changeNoteBcg('#77172e', note)}
              ></div>
              <div
                className="note-back-circle note-sand"
                onClick={() => changeNoteBcg('#7c4a03', note)}
              ></div>
              <div
                className="note-back-circle note-sage"
                onClick={() => changeNoteBcg('#0c625d', note)}
              ></div>
              <div
                className="note-back-circle note-storm"
                onClick={() => changeNoteBcg('#284255', note)}
              ></div>
              <div
                className="note-back-circle note-dusk"
                onClick={() => changeNoteBcg('#472e5b', note)}
              ></div>
              <div
                className="note-back-circle note-blossom"
                onClick={() => changeNoteBcg('#6c394f', note)}
              ></div>
              <div
                className="note-back-circle note-white"
                onClick={() => changeNoteBcg('#fff', note)}
              ></div>
            </div>
          ) : (
            <div>
              <div className="note-back-circle-container">
                <img
                  src={kitchenImg}
                  alt="Kitchen"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${kitchenImg})`, note)}
                />
                <img
                  src={cookingImg}
                  alt="Cooking"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${cookingImg})`, note)}
                />
                <img
                  src={musicImg}
                  alt="Music"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${musicImg})`, note)}
                />
                <img
                  src={videoImg}
                  alt="Galxay"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${videoImg})`, note)}
                />
                <img
                  src={fireworkImg}
                  alt="Firework"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${fireworkImg})`, note)}
                />
                <img
                  src={galaxyImg}
                  alt="Galxay"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${galaxyImg})`, note)}
                />
                <img
                  src={spaceImg}
                  alt="Space"
                  className="note-back-img img"
                  onClick={() => changeNoteImg(`url(${spaceImg})`, note)}
                />
              </div>
            </div>
          )}
          <div className="note-back-btns-container">
            <button
              className="note-delete-btn note-back-btn"
              onClick={() => onDeleteNote(note.id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="note-img-color-btn note-back-btn"
              onClick={handleToggleNoteBtns}
            >
              {toggleNoteBtns ? (
                <i className="fa-regular fa-image"></i>
              ) : (
                <i className="fa-solid fa-palette"></i>
              )}
            </button>
            <button
              className="note-close-btn note-back-btn"
              onClick={handleCloseSettings}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function AddNoteBtn({ onAddNote, onScrollToBottom }) {
  function handleCreateNote(e) {
    e.preventDefault();

    const newNote = {
      heading: '',
      text: '',
      background: '#fff',
      id: crypto.randomUUID(),
    };

    onAddNote(newNote);
    onScrollToBottom();
  }

  return (
    <button className="add-note-btn" onClick={handleCreateNote}>
      <i className="fa-solid fa-plus fa-fw"></i>
    </button>
  );
}

function Footer({ bottomEl }) {
  return (
    <div className="footer" ref={bottomEl}>
      <p>
        Copyright &copy; Note Keeper App{' '}
        <span>
          {new Date().getFullYear()}. <br /> All rights reserved
        </span>
      </p>
      <p className="footer-creater">
        Created by: <span className="footer-name">Jacob Smith</span>
      </p>
    </div>
  );
}
