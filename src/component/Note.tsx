import React, { useState } from 'react';
import './Note.css';

interface NoteProps {
  id: number;
  title: string;
  text: string;
  priority: number;
  category: string;
  onEdit: (newText: string) => void;
  onDelete: Function;
  onMoveToDone: (id: number) => void;
  onEditCategoryPriority: (newCategory: string, newPriority: number) => void;
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
  onEditCategoryPriority,
}: NoteProps) {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isMoveToDoneClicked, setMoveToDoneClicked] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedPriority, setEditedPriority] = useState(priority);

  const handleEditClick = () => {
    setEditing(true);
    setEditedCategory(category);
    setEditedPriority(priority);
  };

  const handleMoveToDoneClick = () => {
    onMoveToDone(id);
    setMoveToDoneClicked(!isMoveToDoneClicked);
  };

  const handleSaveClick = () => {
    onEdit(editedText);
    onEditCategoryPriority(editedCategory, editedPriority);
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
        <div className='noteEdit'>
          <div className='noteText'>
            <textarea
              className='textare'
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={4}
            />
            <div className='pricat'>
              <div className='PRIORITY'>
                <label>
                  Days:
                  <input
                    type="radio"
                    value={1}
                    checked={editedPriority === 1}
                    onChange={() => setEditedPriority(1)}
                  />
                  1
                </label>
                <label>
                  <input
                    type="radio"
                    value={2}
                    checked={editedPriority === 2}
                    onChange={() => setEditedPriority(2)}
                  />
                  2
                </label>
                <label>
                  <input
                    type="radio"
                    value={3}
                    checked={editedPriority === 3}
                    onChange={() => setEditedPriority(3)}
                  />
                  3
                </label>
                <label>
                  <input
                    type="radio"
                    value={4}
                    checked={editedPriority === 4}
                    onChange={() => setEditedPriority(4)}
                  />
                  4
                </label>
              </div>
              <div className='editedCategory'>
                <label className='Cate'>Category:</label>
                <div className='CATEGORY'>
                  <select
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                  >
                    <option value="home">Home</option>
                    <option value="stuff">Stuff</option>
                    <option value="hobby">Hobby</option>
                    <option value="fun">Fun</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSaveClick} className='save'>
            Save
          </button>
        </div>
      ) : (
        <div className='noteED'>
          <div className='stuff'>
            <div className='titext'>
              <p className='title'>{title}</p>
              <p className='text'>{text}</p>
            </div>
            <div className='capr'>
              <p className='Priority'>Days:{priority}</p>
              <p style={{ backgroundColor: getBackgroundColor() }} className='Category'>
                {category}
              </p>
            </div>
          </div>
          <div className='ED'>
            <div>

              <button
                onClick={handleMoveToDoneClick}
                className='MoveToDone'
              />

            </div>
          
            {isMoveToDoneClicked && (
        <div onClick={handleMoveToDoneClick} className='check'>
          <i className="fa-solid fa-check"></i>
        </div>
      )}

            <div className='edidel'>
              <button onClick={handleEditClick} className='Edit'>
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => onDelete(id)} className='Delete'>
                <div className="fa-sharp fa-solid fa-trash"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
