// notes array
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
                      <small>22/42/38</small>
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
