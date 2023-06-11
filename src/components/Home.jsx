// import React, { useContext, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { data } from "./Buttons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// function capitalizeSentences(event) {
//   const input = event.target;
//   const inputValue = input.value;

//   const sentences = inputValue.split(". ");
//   const capitalizedSentences = sentences.map((sentence) => {
//     if (sentence.length > 0) {
//       const capitalizedSentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
//       return capitalizedSentence;
//     }
//     return sentence;
//   });

//   const capitalizedValue = capitalizedSentences.join(". ");
//   input.value = capitalizedValue;
// }

// function Home() {
//   const location = useLocation();
//   const isHomePath = location.pathname === "/notes";
//   const temp = useContext(data);
//   const navigate = useNavigate();
//   console.log(temp);

//   const [notes, setNotes] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [editedNoteIndex, setEditedNoteIndex] = useState(null);

//   function handleInputChange(event) {
//     setInputValue(event.target.value);
//   }

//   function createNote() {
//     const newNote = {
//       note: inputValue,
//     };
//     setNotes((prevNotes) => [...prevNotes, newNote]);
//     setInputValue("");
//   }

//   function deleteNote(index) {
//     setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
//   }

//   function editNote(index) {
//     setInputValue(notes[index].note);
//     setEditing(true);
//     setEditedNoteIndex(index);
//     navigate("/");
//   }

//   function saveNote() {
//     if (editedNoteIndex !== null) {
//       setNotes((prevNotes) => {
//         const updatedNotes = [...prevNotes];
//         updatedNotes[editedNoteIndex].note = inputValue;
//         return updatedNotes;
//       });
//       setInputValue("");
//       setEditing(false);
//       setEditedNoteIndex(null);
//     }
//   }

//   function handleCancel() {
//     setEditing(false);
//     setInputValue("");
//   }

//   return (
//     <>
//       <div>
//         {!isHomePath && (
//           <div className={`${temp}text-area`}>
//             <textarea className={`${temp}text-input`} placeholder="Enter Your Text..." onKeyUp={capitalizeSentences} onChange={handleInputChange} value={inputValue} />
//           </div>
//         )}
//         <div>
//           {!isHomePath && (
//             <div>
//               <button className={`${temp}editButton`} onClick={(() => setEditing(!editing)) && handleCancel}>
//                 CANCEL
//               </button>
//               {editing ? (
//                 <button className={`${temp}saveButton`} onClick={saveNote}>
//                   SAVE
//                 </button>
//               ) : (
//                 <button className={`${temp}saveButton`} onClick={createNote}>
//                   SAVE
//                 </button>
//               )}
//             </div>
//           )}
//           {isHomePath && (
//             <div className={`${temp}text-area-over-notes`}>
//               <div className={`${temp}notes-container`}>
//                 {notes.length < 1 && <textarea className={`${temp}note-textarea`} placeholder=" Your Notes Will Be Shown Here..." />}
//                 {notes.map((note, index) => (
//                   <div key={index} style={{height: "100px"}}>
//                     <textarea
//                       className={`${temp}note-textarea`}
//                       value={note.note}
//                       readOnly={!editing}
//                       onClick={() => editNote(index)}
//                     />
//                     {(
//                       <button className={`${temp}delete-button`} onClick={() => deleteNote(index)}>
//                         <FontAwesomeIcon icon={faTimes} color={temp === "dark-" ? "white" : "black"}/>
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { saveNotes, loadNotes } from "./storage";

function capitalizeSentences(event) {
  const input = event.target;
  const inputValue = input.value;

  const sentences = inputValue.split(". ");
  const capitalizedSentences = sentences.map((sentence) => {
    if (sentence.length > 0) {
      const capitalizedSentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
      return capitalizedSentence;
    }
    return sentence;
  });

  const capitalizedValue = capitalizedSentences.join(". ");
  input.value = capitalizedValue;
}

function Home() {
  const location = useLocation();
  const isHomePath = location.pathname === "/notes";
  const temp = useContext(data);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function createNote() {
    const newNote = {
      note: inputValue,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setInputValue("");
  }

  function deleteNote(index) {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  }

  function editNote(index) {
    setInputValue(notes[index].note);
    setEditing(true);
    setEditedNoteIndex(index);
    navigate("/");
  }

  function saveNote() {
    if (editedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editedNoteIndex].note = inputValue;
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setInputValue("");
      setEditing(false);
      setEditedNoteIndex(null);
    }
  }

  function handleCancel() {
    setEditing(false);
    setInputValue("");
  }

  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);

  return (
    <>
      <div>
        {!isHomePath && (
          <div className={`${temp}text-area`}>
            <textarea
              className={`${temp}text-input`}
              placeholder="Enter Your Text..."
              onKeyUp={capitalizeSentences}
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>
        )}
        <div>
          {!isHomePath && (
            <div>
              <button className={`${temp}editButton`} onClick={() => {setEditing(!editing); handleCancel();}}>
                CANCEL
              </button>
              {editing ? (
                <button className={`${temp}saveButton`} onClick={saveNote}>
                  SAVE
                </button>
              ) : (
                <button className={`${temp}saveButton`} onClick={createNote}>
                  SAVE
                </button>
              )}
            </div>
          )}
          {isHomePath && (
            <div className={`${temp}text-area-over-notes`}>
              <div className={`${temp}notes-container`}>
                {notes.length < 1 && (
                  <textarea className={`${temp}note-textarea`} placeholder=" Your Notes Will Be Shown Here..." />
                )}
                {notes.map((note, index) => (
                  <div key={index} style={{ height: "100px" }}>
                    <textarea
                      className={`${temp}note-textarea`}
                      value={note.note}
                      readOnly={!editing}
                      onClick={() => editNote(index)}
                    />
                    {(
                      <button className={`${temp}delete-button`} onClick={() => deleteNote(index)}>
                        <FontAwesomeIcon icon={faTimes} color={temp === "dark-" ? "white" : "black"} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
