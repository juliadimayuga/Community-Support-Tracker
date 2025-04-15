const form = document.getElementById("volunteerForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages){
        el.remove();
    }

    if (validateForm()){
        form.submit(); 
    } 
    else{
        console.error("Form has errors"); 
    }
});

function validateForm(){
    let isFormValid = true;

    const charityName = document.getElementById("charityName");
    if (charityName.value.trim() === ""){
        showInputError(charityName, "Charity name cannot be blank.");
        isFormValid = false;
    }

    const hours = document.getElementById("hours");
    const hoursVolunteered = Number(hours.value);
    if (isNaN(hoursVolunteered) || hoursVolunteered < 1){
        showInputError(hours, "Enter a valid number.");
        isFormValid = false;
    }

    const date = document.getElementById("volunteerDate");
    const volunteerDate = date.value;
    if(!volunteerDate){
        showInputError(date, "Enter a valid date.")
    }
    else{
        const givenDate = new Date(volunteerDate);
        const currentDate = new Date();
            if (givenDate.getTime() > currentDate.getTime()){
            showInputError(date, "Enter a valid date.");
            isFormValid = false;
            }
    }

    const givenRating = document.querySelector('input[name="rating"]:checked');
    if (!givenRating || givenRating.value < 1){
        const rating = document.querySelector('input[name="rating"]');
        if (rating){
            showInputError(rating, "Rate your experience.");
        }
        isFormValid = false;
    }

    return isFormValid
}

function showInputError(inputElement, message){
    const container = inputElement.closest(".input-container");
    const errorDisplay = document.createElement("span");
    errorDisplay.innerText = message;
    errorDisplay.className = "error-message";
    errorDisplay.setAttribute("role", "alert");
    container.appendChild(errorDisplay);
}

function escapeHTML(input){
    console.log("Form successfully submitted.")
    return input
}