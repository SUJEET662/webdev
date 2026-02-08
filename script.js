const button = document.querySelector(".submitbutton");
const email = document.querySelector("#username");
const password = document.querySelector("#password");

// button.addEventListener("click", () => {
//     const emailValue = email.value;
//     const passwordValue = password.value;

//     alert(`Email: ${emailValue}\nPassword: ${passwordValue} `);
// });


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
    
        const email = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value.trim(); 

        let isValid = true;

        // Email validation
        if(email === "") {
            alert("Email is required.");
            isValid = false;
        }
        else if(!email.includes("@")) {
            alert("Please enter a valid email address with @.");
            isValid = false;
        }

        // Password validation
        if(password === "") {
            alert("Password is required.");
            isValid = false;
        }
        else if(password.length < 6) {
            alert("Password must be at least 6 characters long.");
            isValid = false;
        }

        // If validation passes, show success
        if(isValid) {
            alert(`Success!\nEmail: ${email}\nPassword: ${password}`);
        }
    });
});