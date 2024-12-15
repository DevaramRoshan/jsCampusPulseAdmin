const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

loginForm.addEventListener("submit", async (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    const fd = new FormData(loginForm);
    const urlencoded = new URLSearchParams(fd);
    const sendingFormData = await fetch(`https://campuspulseserver.onrender.com/admin`, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: urlencoded
    });
    const message = await sendingFormData.json();
    if (message.message == "verified") {
        window.location.href = "./main/main.html";
    }
    else {
        alert("access denied");
    }
})