import React, { useState, useEffect } from 'react';
import AddNoteForm from './component/AddNoteForm';
import NotesList from './component/NotesList';
import SearchNote from './component/SearchNote';
import Searchinput from './component/SearchInput';
import './main.css';
import '@fortawesome/fontawesome-free/css/all.css';

type Note = {
  id: number;
  title: string;
  text: string;
  priority: number;
  category: string;
  days: string;
  done: boolean;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddNoteFormVisible, setAddNoteFormVisible] = useState(false);
  const [isFilteredNotesVisible, setFilteredNotesVisible] = useState(false); // New state for filtered notes

  const handleDelete = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEdit = (id: number, newText: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const handleEditCategoryPriority = (id: number, newCategory: string, newPriority: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
            ...note,
            category: newCategory,
            priority: newPriority,
          }
          : note
      )
    );
  };




  const handleAdd = (title: string, text: string, priority: number, category: string, days: string,) => {
    const newNote: Note = {
      id: new Date().getTime(),
      title: title,
      text: text,
      priority: priority,
      days: days,
      category: category,
      done: false,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setAddNoteFormVisible(false); // Hide the AddNoteForm after adding a note

    console.log('Saved Note:', newNote);

    // You can also log the updated list of notes if needed
    console.log('Updated Notes:', [...notes, newNote]);

  };


  const handleMoveToDone = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, done: !note.done } : note
      )
    );
  };

  const handleAddNoteButtonClick = () => {
    setAddNoteFormVisible(!isAddNoteFormVisible); // Toggle the visibility of AddNoteForm
  };

  const handleSearchNoteClick = () => {
    setFilteredNotesVisible(!isFilteredNotesVisible);
  };

  const handleAddNoteFormOutsideClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      (target.closest('.addNote') === null && isAddNoteFormVisible) ||
      (target.closest('.search') === null && isFilteredNotesVisible)
    ) {
      setAddNoteFormVisible(false);
      setFilteredNotesVisible(false);
    }
  };


  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);



  return (
    <div onClick={handleAddNoteFormOutsideClick}>
      <div className='taskX'> <h2 className='task'>tasX</h2> <h2 className='get'>-get things done</h2></div>
      <div className='plussearch'>
        <button className='add' onClick={handleAddNoteButtonClick}>+</button>
        <div className='search' onClick={handleSearchNoteClick}>
          <SearchNote searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
      </div>
      {isAddNoteFormVisible && (
        <div className='main'>
          <AddNoteForm onAdd={handleAdd} />
        </div>
      )}
      <div className='lignee'><div className='ligne'></div></div>
      {isFilteredNotesVisible && (
        <div className='filtered-notes'>
          <Searchinput notes={notes}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onMoveToDone={handleMoveToDone}
            searchQuery={searchQuery}
            // @ts-ignore
            onEditCategoryPriority={handleEditCategoryPriority} />
        </div>
      )}
      <NotesList
        notes={notes}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onMoveToDone={handleMoveToDone}
        searchQuery={searchQuery}
        // @ts-ignore
        onEditCategoryPriority={handleEditCategoryPriority}
      />


    </div>
  );
};

export default App;
