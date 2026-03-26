document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value.trim();


        let isValid = true;

        if (name === "") {
            alert("Name is required");
            isValid = false;
        }

        else if (email === "") {
            alert("Email is required");
            isValid = false;
        }

        else if (!email.includes("@")) {
            alert("Enter a valid email");
            isValid = false;
        }

        else if (password === "") {
            alert("Password is required");
            isValid = false;
        }

        else if (password.length < 6) {
            alert("Password must be at least 6 characters");
            isValid = false;
        }

        if (isValid) {

            try {
                const respose = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                });
                const data = await respose.json();

                if (data.success) {

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("email", email);

                    console.log("TOKEN:", data.token);

                    alert("Signup successful!");

                    window.location.href = "login.html";
                }
                else {
                    alert("Signup failed: " + data.message);
                }
            }
            catch (error) {
                console.error("Error:", error);
                alert("server error during signup");
            }


            // localStorage.setItem("name", name);
            // localStorage.setItem("email", email);
            // localStorage.setItem("password", password);

            // alert("Signup Successful!");
        }

    });

});
