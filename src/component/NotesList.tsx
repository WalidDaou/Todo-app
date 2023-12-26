// NotesList.js
import React from 'react';
import Note from './Note';
import "./NotesList.css"

interface NoteItem {
  id: number;
  title: string;
  text: string;
  priority: number;
  category: string;
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

function NotesList({ notes, onEdit, onDelete, onMoveToDone, searchQuery,onEditCategoryPriority }: NotesListProps) {
  const sortedNotes = [...notes].sort((a, b) => a.priority - b.priority);

  const activeNotes = sortedNotes.filter((note) => !note.done);
  const doneNotes = sortedNotes.filter((note) => note.done);

  const filteredNotes = sortedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='notes-container'>
      <div className='active-notes'>
        <h2 className='Active'>Active Notes</h2>
        {filteredNotes.length > 0 ? (
          activeNotes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.text}
              priority={note.priority}
              category={note.category}
              onDelete={() => onDelete(note.id)}
              onEdit={(newText: string) => onEdit(note.id, newText)}
              onMoveToDone={() => onMoveToDone(note.id)}
              onEditCategoryPriority={(newCategory: string ,newPriority :number) => onEditCategoryPriority(note.id,newCategory,newPriority )}
             
            />
          ))
        ) : (
          <p>No active notes found.</p>
        )}
      </div>
      <div className='done-notes'>
        <h2 className='Done'>Done Items</h2>
        {filteredNotes.length > 0 ? (
          doneNotes.map((note) => (
            <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            priority={note.priority}
            category={note.category}
            onDelete={() => onDelete(note.id)}
            onEdit={(newText: string) => onEdit(note.id, newText)}
            onMoveToDone={() => onMoveToDone(note.id)}
            onEditCategoryPriority={(newCategory: string ,newPriority :number) => onEditCategoryPriority(note.id,newCategory,newPriority )}
           
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
