// notes array
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();
let currentDate = `${mm}/${dd}/${yyyy}`;
let note = {
    "number": 0,
}
// add note function
addNewNote = () => {
    let addNote = document.getElementById("newTask").value;
    let stickyToAppend = "";
    if (addNote != ""){
    note.number ++;
        stickyToAppend = `
                <div id="noteId${note.number}" class="note">
                    <span>${addNote}</span>
                    <div class="note-content">
                      <small>${currentDate}</small>
                      <span onclick="deleteNote('noteId${note.number}')" type="button" class="fas fa-trash-alt"></span>
                    </div>
                </div>
            `
        document.getElementById("noteList").innerHTML += stickyToAppend;
        document.getElementById("newTask").value = "";
        
    }
};
// delete function
deleteNote = (id) => {
    document.getElementById(id).remove();
}
