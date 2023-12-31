import React, { useState } from 'react';
import Note from './Note';
import "./NotesList.css";

interface NoteItem {
  id: number;
  title: string;
  text: string;
  priority: number;
  category: string;
  days: string;
  done: boolean;
}

interface NotesListProps {
  notes: NoteItem[];
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
  onMoveToDone: (id: number) => void;
  searchQuery: string;
  onEditCategoryPriority: (newCategory: string, newPriority: number) => void;
}

function NotesList({ notes, onEdit, onDelete, onMoveToDone, searchQuery, onEditCategoryPriority }: NotesListProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.days).getTime();
    const dateB = new Date(b.days).getTime();

    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const activeNotes = sortedNotes.filter((note) => !note.done);
  const doneNotes = sortedNotes.filter((note) => note.done);

  const filteredNotes = sortedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className='notes-container'>
      <div className='active-notes'>
        <div className='donee'>
          <h2 className='Active'>Active Notes</h2>
          <div className='acds'>
            <button id='fa' className='asc' onClick={toggleSortOrder}>
              <i className="fa-solid fa-caret-up" />
            </button>
            <button id='fa' className='desc' onClick={toggleSortOrder}>
              <i className="fa-solid fa-caret-down" />
            </button>
          </div>
        </div>
        {filteredNotes.length > 0 ? (
          activeNotes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.text}
              priority={note.priority}
              days={note.days}
              category={note.category}
              onDelete={() => onDelete(note.id)}
              onEdit={(newText: string) => onEdit(note.id, newText)}
              onMoveToDone={() => onMoveToDone(note.id)}
              //@ts-ignore
              onEditCategoryPriority={(newCategory: string, newPriority: number) => onEditCategoryPriority(note.id, newCategory, newPriority)}
            />
          ))
        ) : (
          <p>No active notes found.</p>
        )}
      </div>
      <div className='done-notes'>
        <div className='donee'>
          <h2 className='Done'>Done Items</h2>
          <div className='acds'>
            <button id='fa' className='asc' onClick={toggleSortOrder}>
              <i className="fa-solid fa-caret-up" />
            </button>
            <button id='fa' className='desc' onClick={toggleSortOrder}>
              <i className="fa-solid fa-caret-down" />
            </button>
          </div>
        </div>
        {filteredNotes.length > 0 ? (
          doneNotes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.text}
              priority={note.priority}
              days={note.days}
              category={note.category}
              onDelete={() => onDelete(note.id)}
              onEdit={(newText: string) => onEdit(note.id, newText)}
              onMoveToDone={() => onMoveToDone(note.id)}
              //@ts-ignore
              onEditCategoryPriority={(newCategory: string, newPriority: number) => onEditCategoryPriority(note.id, newCategory, newPriority)}
            />
          ))
        ) : (
          <p>No done items found.</p>
        )}
      </div>
    </div>
  );
}

export default NotesList;
