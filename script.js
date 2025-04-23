const form = document.getElementById("volunteerForm");

let totalHours = 0;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    for (const el of errorMessages){
        el.remove();
    }

    if (validateForm()){
        const formInfo = {charityName: document.getElementById("charityName").value,
            hours: Number(document.getElementById("hours").value),
            date: document.getElementById("volunteerDate").value,
            rating: document.querySelector('input[name="rating"]:checked').value};

        totalHours += formInfo.hours;

        let storedInfo = JSON.parse(localStorage.getItem('logs')) || [];

        const tableBody = document.querySelector("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `<td>${formInfo.charityName}</td>
        <td>${formInfo.hours}</td>
        <td>${formInfo.date}</td>
        <td>${formInfo.rating}</td>
        <td><button class="delete-btn">Delete</button></td>`;
        tableBody.appendChild(row);

        row.querySelector(".delete-btn").addEventListener("click", () => {
            row.remove();
            totalHours -= formInfo.hours;
            storedInfo = storedInfo.filter(item => item.charityName !== formInfo.charityName || 
                item.hours !== formInfo.hours || 
                item.date !== formInfo.date || 
                item.rating !== formInfo.rating);
            localStorage.setItem('logs', JSON.stringify(storedInfo));
            document.getElementById("totalHours").textContent = `Total Hours Volunteered: ${totalHours}`;
        });
        storedInfo.push(formInfo);
        localStorage.setItem('logs', JSON.stringify(storedInfo));
        document.getElementById("totalHours").textContent = `Total Hours Volunteered: ${totalHours}`;
        form.reset();
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
        isFormValid = false;
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

document.addEventListener("DOMContentLoaded", () => {
    totalHours = 0;
    let storedInfo = JSON.parse(localStorage.getItem('logs')) || [];

    storedInfo.forEach(item =>{
        const tableBody = document.querySelector("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `<td>${item.charityName}</td>
        <td>${item.hours}</td>
        <td>${item.date}</td>
        <td>${item.rating}</td>
        <td><button class="delete-btn">Delete</button></td>`;
        tableBody.appendChild(row);

        row.querySelector(".delete-btn").addEventListener("click", () => {
            row.remove();
            totalHours -= item.hours;
            storedInfo = storedInfo.filter(storedItem => storedItem.charityName !== item.charityName || 
                storedItem.hours !== item.hours || 
                storedItem.date !== item.date || 
                storedItem.rating !== item.rating);
            localStorage.setItem('logs', JSON.stringify(storedInfo));
            document.getElementById("totalHours").textContent = `Total Hours Volunteered: ${totalHours}`;
        });
        totalHours += item.hours;
    });
    document.getElementById("totalHours").textContent = `Total Hours Volunteered: ${totalHours}`;
});