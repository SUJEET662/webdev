document.addEventListener("DOMContentLoaded", () => {

    const formHandle = document.getElementById("loginForm");

    formHandle.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // basic validation
        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter valid email");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {

            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();

            console.log(data);

            if (data.success) {

                // store token
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", email);

                document.querySelector(".successLogin").textContent =
                    "Login successful";

                // redirect
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);
            alert("Server error");

        }

    });

});