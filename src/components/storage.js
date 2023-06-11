// storage.js

export function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
  export function loadNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  }
  