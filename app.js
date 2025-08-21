const overlay = document.getElementById("overlay");
const showFormBtn = document.getElementById("show-form-btn");
const hideFormButton = document.getElementById("close-form-btn");
const noteForm = document.getElementById("note-form");

const editOverlay = document.getElementById("edit-overlay");
const editForm = document.getElementById("edit-form");
const hideEditBtn = document.getElementById("close-edit-btn");

const BASE_API_URL = "https://noteapp-ovs5.onrender.com/api/"

// show form
showFormBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
});

// hide form
hideFormButton.addEventListener("click", () => {
    overlay.style.display = "none";
});

// hide edit form
hideEditBtn.addEventListener("click", () => {
    editOverlay.style.display = "none";
});



// form submission
noteForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent default form submission

    const title = noteForm.querySelector("input[type='text']").value;
    const content = noteForm.querySelector("textarea").value;

    if (title && content) {
        // Create a new note element
        const noteData = {
            title: title,
            content: content
        };

        createNote(noteData);
       
        // Clear the form
        noteForm.reset();
        overlay.style.display = "none";
    }
});

// edit form submission
editForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent default form submission

    const title = editForm.querySelector("input[type='text']").value;
    const content = editForm.querySelector("textarea").value;
    const noteId = editForm.dataset.id;

    if (title && content) {
        const noteData = {
            title: title,
            content: content
        };

        editNote(noteId, noteData);
        

        // Clear the form
        editForm.reset();
        editOverlay.style.display = "none";
    }
});

// fetch all notes
const fetchAllNotes = async () => {
    const res = await fetch(`${BASE_API_URL}notes`);
    const data = await res.json();
    
    const notesContainer = document.querySelector(".notes");
    notesContainer.innerHTML = ""; // Clear existing notes
    data.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <hr>
        <p>${note.content}</p>
        <button class="edit-note" data-id="${note._id}"><i class="fa-solid fa-pencil"></i> </button>
        <button class="delete-note" data-id="${note._id}"><i class="fa-solid fa-trash"></i> </button>
    `;

        // Add event listeners for edit and delete buttons
        noteElement.querySelector(".edit-note").addEventListener("click", () => {
            editOverlay.style.display = "flex";
            editForm.querySelector("input[type='text']").value = note.title;
            editForm.querySelector("textarea").value = note.content;
            editForm.dataset.id = note._id; // Store the note ID in the form
        });

        noteElement.querySelector(".delete-note").addEventListener("click", async () => {
            await deleteNote(note._id);
            fetchAllNotes(); // Refresh notes after deletion
        });

        notesContainer.appendChild(noteElement);
    });
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
    fetchAllNotes(); // Refresh notes after creation
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
   fetchAllNotes(); // Refresh notes after editing
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