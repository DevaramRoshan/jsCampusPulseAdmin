const tableBody = document.querySelector(".tableBody");
const table = document.getElementById("table");
const updateInputList = document.getElementsByClassName("updateInputs");
const updateForm = document.getElementById("updateForm");
const search = document.getElementById("search");
const addSchoolForm = document.getElementById("addSchoolForm");
const tbody = document.createElement("tbody");

async function showSchoolData() {
    const result = await fetch("https://campuspulseserver.onrender.com/schools");
    const data = await result.json();
    loadSchoolsTable(data);
}

function loadSchoolsTable(arr) {
    arr.forEach((val) => {
        const values = Object.values(val);
        const tr = document.createElement("tr");
        const img = document.createElement("img");
        const td = document.createElement("td");
        img.setAttribute("src", `${val.schoolLogoUrl}`);
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
            deleteSchool(val);
        });
        tdButton.appendChild(updateBtn);
        tdButton.appendChild(deleteBtn);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}

function showUpdateForm(val) {
    updateInputList[0].value = val.schoolLogoUrl;
    updateInputList[1].value = val.schoolName;
    updateInputList[2].value = val.schoolAdmin;
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
    const result = await fetch(`https://campuspulseserver.onrender.com/schools/${id}`, {
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
});

async function deleteSchool(val) {
    const result = await fetch(`https://campuspulseserver.onrender.com/schools/${val._id}`, {
        method: "DELETE"
    });
    const resultData = await result.json();
    if (resultData.message == "deleted school") {
        window.location.reload();
    }
    else {
        alert("error occured while deleting college");
    }
}

addSchoolForm.addEventListener("submit", async (e) => {
    const fd = new FormData(addSchoolForm);
    const urlencoded = new URLSearchParams(fd);
    const sendSchoolData = await fetch(`https://campuspulseserver.onrender.com/schools`, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: urlencoded
    });
    const receivedData = await sendSchoolData.json();
})

search.addEventListener("input", async (e) => {
    const currVal = e.target.value;
    const result = await fetch("https://campuspulseserver.onrender.com/schools");
    const resultData = await result.json();
    tbody.innerHTML = "";
    for (let i = 0; i < resultData.length; i++) {
        const currSchoolName = resultData[i].schoolName;
        if (currSchoolName.includes(currVal)) {
            loadSchoolsTable([resultData[i]]);
        }
    }
})
showSchoolData();