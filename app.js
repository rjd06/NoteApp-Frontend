const overlay = document.getElementById("overlay");
const showFormBtn = document.getElementById("show-form-btn");
const hideFormButton = document.getElementById("close-form-btn");
const noteForm = document.getElementById("note-form");

const editOverlay = document.getElementById("edit-overlay");
const editForm = document.getElementById("edit-form");
const hideEditBtn = document.getElementById("close-edit-btn");

const BASE_API_URL = "https://noteapp-ovs5.onrender.com/api/"

// show form
showFormBtn.addEventListener("click", ()=>{
    overlay.style.display = "flex";
});

// hide form
hideFormButton.addEventListener("click", ()=>{
    overlay.style.display = "none";
});

// hide edit form
hideEditBtn.addEventListener("click", ()=>{
    editOverlay.style.display = "none";
});



// form submission
noteForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent default form submission

    const title = noteForm.querySelector("input[type='text']").value;
    const content = noteForm.querySelector("textarea").value;

    if (title && content) {
        // Create a new note element
        const note = document.createElement("div");
        note.classList.add("note");
        note.innerHTML = `
            <h3>${title}</h3>
            <hr>
            <p>${content}</p>
            <button class="edit-note"><i class="fa-solid fa-pencil"></i> </button>
            <button class="delete-note"><i class="fa-solid fa-trash"></i> </button>
        `;

        // Append the new note to the notes container
        document.querySelector(".notes").appendChild(note);

        // Clear the form
        noteForm.reset();
        overlay.style.display = "none";
    }
});


// fetch all notes
const fetchAllNotes = async ()=>{
const res = await fetch(`${BASE_API_URL}notes`);
const data = await res.json();
console.log(data);
return data;    
};

fetchAllNotes();


// create note
const createNote = async (noteData) => {
    const res = await fetch(`${BASE_API_URL}note/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteData)
    });
    const data = await res.json();
    console.log(data);
    return data;
};

// edit note
const editNote = async (noteId, noteData) => {
    const res = await fetch(`${BASE_API_URL}note/update/${noteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteData)
    });
    const data = await res.json();
    console.log(data);
    return data;
};
// delete note
const deleteNote = async (noteId) => {
    const res = await fetch(`${BASE_API_URL}note/delete/${noteId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    console.log(data);
    return data;
};