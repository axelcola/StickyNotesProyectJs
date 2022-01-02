showNotes = () => {
  noteNumber = 0;
  paperBinArray = JSON.parse(localStorage.getItem("paperBinJSON"));
  for (let i = 0; i < paperBinArray.length; i++) {
    let noteData = paperBinArray[i];

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
              <span onclick="deletePerm('${noteId}')" type="button" class="fas fa-trash-alt"></span>
              <span onclick="restoreNote('${noteId}')" type="button" class="fas fa-trash-restore-alt"></span>
            </div>
        </div>
    `;
    noteNumber++;
    document.getElementById("noteList").innerHTML += stickyToAppend;
  }
};
// deleteNote function
deletePerm = (id) => {
  if (confirm("Are you sure you want to delete this file permanently?")) {
    document.getElementById(id).remove;
    let newPaperBinArray = paperBinArray.filter((item) => item.name !== id);
    localStorage.setItem("paperBinJSON", JSON.stringify(newPaperBinArray));
    location.reload();
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
restoreNote = (id) => {
  if (localStorage.getItem("stickerJSON") != null) {
    stickerData = JSON.parse(localStorage.getItem("stickerJSON"));

    let noteToHome = {};
    document.getElementById(id).remove();
    noteToHome = paperBinArray.filter((item) => item.name == id);
    let noteData = noteToHome[0];
    stickerData.push(noteData);

    let newPaperBinArray = paperBinArray.filter((item) => item.name !== id);
    localStorage.setItem("paperBinJSON", JSON.stringify(newPaperBinArray));
    localStorage.setItem("stickerJSON", JSON.stringify(stickerData));
  }
};
deleteAll = () => {
  if (paperBinArray != "") {
    if (
      confirm("Are you sure you want to delete all these files permanently?")
    ) {
      paperBinArray = [];
      localStorage.setItem("paperBinJSON", JSON.stringify(paperBinArray));
      location.reload();
    }
  }
};
document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.paperBinJSON != undefined) {
    showNotes();
    if (localStorage.getItem("paperBinJSON") != null) {
      notificationNumber();
    }
  }
});
