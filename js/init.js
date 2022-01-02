// notes array
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();
let currentDate = `${hour}:${minute}   ${mm}/${dd} `;

// Counter of notes
let noteNumber = 0;

let stickerData = [];
let paperBinArray = [];

let noteId = ` noteId${noteNumber} `;
let contentId = `content${noteNumber}`;
let noteDate = currentDate;
let addNoteContent;
let stickerNoteTemplate = `
			<div id="${noteId}" class="note col-md-4 col-lg-3 col-sm-6 mb-5">
			<textarea id="${contentId}" class="note-text-area">${addNoteContent}</textarea>
					<div class="note-content">
						<small>${noteDate}</small>
						<span onclick="deleteNote('${noteId}')" type="button" class="fas fa-trash-alt"></span>
						<span onclick="editNote('${contentId}',  ${noteNumber})" type="button" class="fas fa-save"></span>
					</div>
			</div>
			`;
