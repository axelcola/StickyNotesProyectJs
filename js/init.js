// notes array
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();
let currentDate = `${mm}/${dd}/${yyyy}`;

// The first noteNumber is 1
let noteNumber = 0;

let stickerData = [];

// addNote function
addNewNote = () => {
  let noteData = {};
  let addNoteContent = document.getElementById("newTask").value;
  let stickyToAppend = "";
  if (addNoteContent != "") {
    noteNumber++;
    noteData.content = addNoteContent;
    noteData.name = ` noteId${noteNumber} `;
    noteData.Date = currentDate;
    stickyToAppend = `
        <div id="noteId${noteNumber}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
            <span>${addNoteContent}</span>
            <div class="note-content">
              <small>${currentDate}</small>
              <span onclick="deleteNote('noteId${noteNumber}')" type="button" class="fas fa-trash-alt"></span>
            </div>
        </div>
    `;
    document.getElementById("noteList").innerHTML += stickyToAppend;
    document.getElementById("newTask").value = "";
    stickerData.push(noteData);
    localStorage.setItem("stickerJSON", JSON.stringify(stickerData));
    console.log(stickerData);
  }
};

// delete function
deleteNote = (id) => {
  document.getElementById(id).remove();
  noteNumber--;
  let newStickerarray = stickerData.filter((item) => item.name !== id);
  console.log("newStickerArray", newStickerarray);
  localStorage.setItem("stickerJSON", JSON.stringify(newStickerarray));
  console.log(noteNumber);
};
//showNotes after refresh the page
showNotes = () => {
  noteNumber = 0;
  stickerData = JSON.parse(localStorage.getItem("stickerJSON"));
  for (let i = 0; i < stickerData.length; i++) {
    let noteData = stickerData[i];

    let addNoteContent = document.getElementById("newTask").value;
    let stickyToAppend = "";
    noteNumber++;
    addNoteContent = noteData.content;
    noteId = noteData.name;
    noteDate = noteData.Date;
    stickyToAppend = `
        <div id="${noteId}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
            <span>${addNoteContent}</span>
            <div class="note-content">
              <small>${noteDate}</small>
              <span onclick="deleteNote('${noteId}')" type="button" class="fas fa-trash-alt"></span>
            </div>
        </div>
    `;
    document.getElementById("noteList").innerHTML += stickyToAppend;
  }
};
searcher = () => {
  let searchValue = document.getElementById("searcher");
  let htmltoappend = "";
  for (let i = 0; i < stickerData.length; i++) {
    let noteData = stickerData[i];
    if (
      noteData.content
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchValue.toUpperCase())
    ) {
      let addNoteContent = document.getElementById("newTask").value;
      let stickyToAppend = "";
      noteNumber++;
      addNoteContent = noteData.content;
      noteId = noteData.name;
      noteDate = noteData.Date;
      stickyToAppend = `
        <div id="${noteId}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
            <span>${addNoteContent}</span>
            <div class="note-content">
              <small>${noteDate}</small>
              <span onclick="deleteNote('${noteId}')" type="button" class="fas fa-trash-alt"></span>
            </div>
        </div>
    `;
      document.getElementById("noteList").innerHTML += stickyToAppend;
    }
  }
};
// when the load page
document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.stickerJSON != undefined) {
    showNotes();
  }
});
