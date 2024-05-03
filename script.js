
//setting up the buttons
const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".num");
const currentlyTyped = document.querySelector(".currently-typed");
allButtons.forEach((button) => {
    button.textContent = button.value;
});
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentlyTyped.textContent === "0") {
            currentlyTyped.textContent = button.value;
        } else {
            currentlyTyped.textContent += button.value;
        }
    })
})