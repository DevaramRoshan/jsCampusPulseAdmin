const guestLogin = document.getElementById("guestLoginBtn");
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");


guestLogin.addEventListener("click", () => {
    window.location.href = "../college page/main.html";
});

loginForm.addEventListener("submit", async () => {
    const sendingFormData = await fetch(``, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    });
    console.log(sendingFormData);
})