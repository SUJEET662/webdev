// document.addEventListener("DOMContentLoaded", () => {


//     const formHandle = document.getElementById("loginForm");

//     const savedEmail = localStorage.getItem("email");
//     const savedPassword = localStorage.getItem("password");

//     if (savedEmail !== null) {
//         document.getElementById("username").value = savedEmail;
//     }
//     if (savedPassword !== null) {
//         document.getElementById("password").value = savedPassword;
//     }

//     formHandle.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const email = document.getElementById("username").value.trim();
//         const password = document.getElementById("password").value.trim();


//         try {
//             localStorage.setItem("email", email);
//             localStorage.setItem("password", password);
//         } catch (err) {
//             console.error("error saving credentials", err);
//         }

//         try {
//             const res = await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ email, password })
//             });
//             const data = await res.json();
//             console.log(data);

//             if (data.success) {
//                 localStorage.setItem("token", data.token);
//                 console.log("Server confirmed success", data);
//                 const successMessage = document.querySelector(".successLogin");
//                 successMessage.textContent = "Login successful!";
//             }

//         } catch (error) {
//             console.error("Error:", error);
//         }

//         // const emailError = document.getElementById("emailError");
//         // const passwordError = document.getElementById("passwordError");

//         // emailError.textContent = "";
//         // passwordError.textContent = "";

//         // let isValid = true;

//         // if (email === "") {
//         //   emailError.textContent = "Email is required";
//         //   isValid = false;
//         // } else if (!email.includes("@")) {
//         //   emailError.textContent = "Enter a valid email";
//         //   isValid = false;
//         // }

//         // if (password === "") {
//         //   passwordError.textContent = "Password is required";
//         //   isValid = false;
//         // } else if (password.length < 6) {
//         //   passwordError.textContent = "Password must be at least 6 characters";
//         //   isValid = false;
//         // }]

//         // if (isValid) {
//         //   console.log("Form is valid Babu");
//         //   localStorage.setItem("email", email);
//         //   console.log("Email:", email);
//         //   console.log("Password:", password);

//         //   const successMessage = document.querySelector(".successLogin");
//         //   successMessage.textContent = "Login successful! redirecting.....";

//         //   setTimeout(()=>{
//         //     window.location.href = "index.html";
//         //   },5000);

//         //   alert(`Email: ${email}\nPassword: ${password}`);
//         // }
//     });
// });

document.addEventListener("DOMContentLoaded", () => {

    const formHandle = document.getElementById("loginForm");

    formHandle.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            console.log(data);

            if (data.success) {
                localStorage.setItem("email", email);
                localStorage.setItem("token", data.token);

                const successMessage = document.querySelector(".successLogin");
                successMessage.textContent = "Login successful!";

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);

            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server error");
        }
    });
});