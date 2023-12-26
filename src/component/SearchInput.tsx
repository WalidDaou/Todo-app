// NotesList.js
import React from 'react';
import Note from './Note';
import "./NotesList.css"
import './SearchInput.css'
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

function SearchInput({ notes, onEdit, onDelete, onMoveToDone, searchQuery,onEditCategoryPriority }: NotesListProps) {
  const sortedNotes = [...notes].sort((a, b) => a.priority - b.priority);

  const activeNotes = sortedNotes.filter((note) => !note.done);
  const doneNotes = sortedNotes.filter((note) => note.done);

  const filteredNotes = sortedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
 
   
      <div >
      
        <div className='filtered-notes'>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
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
          <p>No matching notes found.</p>
        )}</div>
      </div>

 
  );
}


export default SearchInput;
