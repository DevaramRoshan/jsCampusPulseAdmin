const tableBody = document.querySelector(".tableBody");
const table = document.getElementById("table");
const updateInputList = document.getElementsByClassName("updateInputs");
const updateForm = document.getElementById("updateForm");
const search = document.getElementById("search");
const addCollegeForm = document.getElementById("addCollegeForm");

async function showCollegeData() {
    const result = await fetch("https://campuspulseserver.onrender.com/colleges");
    const data = await result.json();
    loadCollegesTable(data);
}

function loadCollegesTable(arr) {
    const tbody = document.createElement("tbody");
    arr.forEach((val) => {
        const values = Object.values(val);
        const tr = document.createElement("tr");
        const img = document.createElement("img");
        const td = document.createElement("td");
        img.setAttribute("src", `${val.collegeLogoUrl}`);
        img.style = `
        height:100px;
        width:100px;
        `
        td.appendChild(img);
        tr.appendChild(td);

        for (let i = 2; i <= 5; i++) {
            const td = document.createElement("td");
            td.textContent = values[i];
            tr.appendChild(td);
        }
        const tdButton = document.createElement("td");
        const updateBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        updateBtn.textContent = "Update";
        updateBtn.setAttribute("class", "actionBtns btn btn-primary");
        updateBtn.setAttribute("type", "button");
        updateBtn.setAttribute("data-bs-toggle", "modal");
        updateBtn.setAttribute("data-bs-target", "#staticBackdrop");

        deleteBtn.setAttribute("class", "actionBtns btn btn-primary");

        updateBtn.addEventListener("click", (e) => {
            showUpdateForm(val);
        });
        deleteBtn.addEventListener("click", (e) => {
            deleteCollege(val);
        });
        tdButton.appendChild(updateBtn);
        tdButton.appendChild(deleteBtn);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}


function showUpdateForm(val) {
    updateInputList[0].value = val.collegeLogoUrl;
    updateInputList[1].value = val.collegeName;
    updateInputList[2].value = val.collegeAdmin;
    updateInputList[3].value = val.email;
    updateInputList[4].value = val.password;
    sessionStorage.clear();
    sessionStorage.setItem("id", val._id);
}

updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    const fd = new FormData(updateForm);
    const urlencoded = new URLSearchParams(fd);
    const id = sessionStorage.getItem("id");
    sessionStorage.removeItem("id");
    const result = await fetch(`https://campuspulseserver.onrender.com/colleges/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: urlencoded
    });
    const resultData = await result.json();
    if (resultData._id == id) {
        window.location.reload();
    }
    else {
        alert("error occured while updating");
    }
})

async function deleteCollege(val) {
    const result = await fetch(`https://campuspulseserver.onrender.com/colleges/${val._id}`, {
        method: "DELETE"
    });
    const resultData = await result.json();
    if (resultData.message == "deleted college") {
        window.location.reload();
    }
    else {
        alert("error occured while deleting college");
    }
}

addCollegeForm.addEventListener("submit", async (e) => {
    const fd = new FormData(addCollegeForm);
    const urlencoded = new URLSearchParams(fd);
    const sendCollegeData = await fetch(`https://campuspulseserver.onrender.com/colleges`, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: urlencoded
    });
    const receivedData = await sendCollegeData.json();
    console.log(receivedData);
})

search.addEventListener("input", async () => {

})

showCollegeData();