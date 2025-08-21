const overlay = document.getElementById("overlay");
const showFormBtn = document.getElementById("show-form-btn");
const hideFormButton = document.getElementById("close-form-btn");
showFormBtn.addEventListener("click", ()=>{
    overlay.style.display = "flex";
});
hideFormButton.addEventListener("click", ()=>{
    overlay.style.display = "none";
});