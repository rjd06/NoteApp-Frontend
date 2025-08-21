const overlay = document.getElementById("overlay");
const showFormBtn = document.getElementById("show-form-btn");
const hideFormButton = document.getElementById("close-form-btn");
const noteForm = document.getElementById("note-form");

// show form
showFormBtn.addEventListener("click", ()=>{
    overlay.style.display = "flex";
});

// hide form
hideFormButton.addEventListener("click", ()=>{
    overlay.style.display = "none";
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