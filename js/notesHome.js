// addNote function
addNewNote = () => {
  let noteData = {};
  let addNoteContent = document.getElementById("newTask").value;
  let stickyToAppend = "";
  if (addNoteContent) {
    let noteId = ` noteId${noteNumber - 1} `;
    let contentId = `content${noteNumber - 1}`;
    let noteDate = currentDate;
    noteData.content = addNoteContent;
    noteData.contenId = contentId;
    noteData.name = noteId;
    noteData.Date = currentDate;
    stickyToAppend = `
				<div id="${noteId}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
				<textarea id="${contentId}" class="note-text-area">${addNoteContent}</textarea>
            <div class="note-content">
              <small>${noteDate}</small>
              <span onclick="deleteNote('${noteId}')" type="button" class="fas fa-trash-alt"></span>
              <span onclick="editNote('${contentId}',  ${
      noteNumber - 1
    })" type="button" class="fas fa-save"></span>
            </div>
        </div>
    `;
    noteNumber++;
    document.getElementById("noteList").innerHTML += stickyToAppend;
    document.getElementById("newTask").value = "";
    stickerData.push(noteData);
    localStorage.setItem("stickerJSON", JSON.stringify(stickerData));
    setNumber();
    document.getElementById("newTask").focus();
  }
};

//showNotes after refresh the page
showNotes = () => {
  stickerData = JSON.parse(localStorage.getItem("stickerJSON"));
  stickerData.sort(
    (a, b) => new Date(a.Date).getTime() > new Date(b.Date).getTime()
  );
  for (let i = 0; i < stickerData.length; i++) {
    let noteData = stickerData[i];

    let stickyToAppend = "";
    addNoteContent = noteData.content;
    noteId = noteData.name;
    noteDate = noteData.Date;
    contentId = noteData.contenId;
    stickyToAppend = `
        <div id="${noteId}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
				<textarea id="${contentId}" class="note-text-area">${addNoteContent}</textarea>
            <div class="note-content">
              <small>${noteDate}</small>
              <span onclick="deleteNote('${noteId}')" type="button" class="fas fa-trash-alt"></span>
              <span onclick="editNote('${contentId}')" type="button" class="fas fa-save"></span>
            </div>
        </div>
    `;
    document.getElementById("noteList").innerHTML += stickyToAppend;
    getNumber();
  }
};
notificationNumber = () => {
  paperBinArray = JSON.parse(localStorage.getItem("paperBinJSON"));
  if (paperBinArray.length != 0) {
    let htmltoappend = "";
    htmltoappend = `${paperBinArray.length}<i class="fas fa-trash"></i><span class="sr-only">(current)</span>`;
    document.getElementById("notification").innerHTML = htmltoappend;
  }
};

editNote = (id) => {
  let number = id.slice(7);
  console.log(number);
  let note = document.getElementById(id).value;
  stickerData[number].content = note;
  stickerData[number].Date = currentDate;
  console.log(stickerData[number].content);
  localStorage.setItem("stickerJSON", JSON.stringify(stickerData));
  console.log(id);
};
// editNote = (id, number) => {
//   let note = document.getElementById(id).value;
//   stickerData[number].content = note;
//   stickerData[number].Date = currentDate;
//   console.log(stickerData[number].content);
//   location.reload();
//   localStorage.setItem("stickerJSON", JSON.stringify(stickerData));
//   console.log(id);
// };
// deleteNote function
deleteNote = (id) => {
  let noteToPaperBin = {};
  let newStickerarray = stickerData.filter((item) => item.name !== id);

  if (localStorage.getItem("paperBinJSON")) {
    paperBinArray = JSON.parse(localStorage.getItem("paperBinJSON"));
  }
  document.getElementById(id).remove();
  noteToPaperBin = stickerData.filter((item) => item.name == id);
  paperBinArray.push(noteToPaperBin[0]);

  localStorage.setItem("paperBinJSON", JSON.stringify(paperBinArray));
  localStorage.setItem("stickerJSON", JSON.stringify(newStickerarray));
  console.log(paperBinArray);
  location.reload();
};

// searcher
document.getElementById("searcher").addEventListener("input", (event) => {
  let searchValue = document
    .getElementById("searcher")
    .value.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  let stickyToAppend = "";
  for (let i = 0; i < stickerData.length; i++) {
    let noteData = stickerData[i];
    if (
      noteData.content
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(searchValue.toUpperCase()) ||
      searchValue === ""
    ) {
      stickyToAppend += `
      <div id="${noteId}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
				<textarea id="${contentId}" class="note-text-area">${addNoteContent}</textarea>
            <div class="note-content">
              <small>${noteDate}</small>
              <span onclick="deleteNote('${noteId}')" type="button" class="fas fa-trash-alt"></span>
              <span onclick="editNote('${contentId}')" type="button" class="fas fa-save"></span>
            </div>
        </div>
    `;
      document.getElementById("noteList").innerHTML = stickyToAppend;
    }
  }
});

//  Run function with enter key
document.onkeypress = function (e) {
  if ((e.keyCode == 13 || e.keyCode == 10) && e.ctrlKey == true) {
    addNewNote();
  }
};

// when the load page
document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.stickerJSON != undefined) {
    showNotes();
    if (localStorage.getItem("paperBinJSON") != null) {
      notificationNumber();
    }
  }
});
