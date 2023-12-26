// Note.tsx

import React, { useState } from 'react';
import './Note.css';

interface NoteProps {
  id: number;
  title: string
  text: string;
  priority: number;
  category: string;
  onEdit: (newText: string) => void;
  onDelete: Function;
  onMoveToDone: (id: number) => void;

}

function Note({
  id,
  title,
  text,
  priority,
  category,
  onEdit,
  onDelete,
  onMoveToDone,

}: NoteProps) {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isMoveToDoneClicked, setMoveToDoneClicked] = useState(false); 

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleMoveToDoneClick = () => {
    setMoveToDoneClicked(true);
    onMoveToDone(id);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    setEditing(false);
  };
  const getBackgroundColor = () => {
    switch (category) {
      case 'home':
        return 'lightblue';
      case 'hobby':
        return 'lightgreen';
      case 'work':
        return 'lightcoral';
      case 'fun':
        return 'lightyellow';
      default:
        return 'lightgray';
    }
  };

  return (


    <div className={`Note priority-${priority}`}>
      {isEditing ? (
        <>
          <div className='noteText'>
            <textarea
              className='textare'
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={4}
            />
            <button onClick={handleSaveClick} className='save'>
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='noteED'>
            <div className='stuff'>
              <div className='titext'>
                <p className='title'>{title}</p>
                <p className='text'>{text}</p>
                </div>
              <div className='capr'> <p className='Priority'>Days:{priority}</p>
                <p style={{ backgroundColor: getBackgroundColor() }} className='Category'> {category}</p>
                </div>
            </div>
            <div className='ED'>
              <div>
              <button
                  onClick={handleMoveToDoneClick}
                  className={`MoveToDone ${
                    isMoveToDoneClicked ? 'clicked' : ''
                  }`}
                ></button>
                 
              
              </div>
              <div className='edidel'>
              <button onClick={handleEditClick} className='Edit'>
              <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => onDelete(id)} className='Delete'>
              <div className="fa-sharp fa-solid fa-trash" ></div>
              </button></div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Note;
