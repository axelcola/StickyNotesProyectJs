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

getNumber = () => {
  if (localStorage.getItem("storageNumber")) {
    let storageNumber = Number(localStorage.getItem("storageNumber"));
    noteNumber = storageNumber;
  }
};
setNumber = () => {
  localStorage.setItem("storageNumber", noteNumber);
};

let stickerData = [];
let paperBinArray = [];
