const tableBody = document.querySelector(".tableBody");
const table = document.getElementById("table");

async function showCollegeData() {
    const result = await fetch("https://campuspulseserver.onrender.com/colleges");
    const data = await result.json();
    console.log(data);
    loadCollegesTable(data);
}

function loadCollegesTable(arr) {
    const tbody = document.createElement("tbody");
    arr.forEach((val) => {
        const values = Object.values(val);
        console.log(values);
        const tr = document.createElement("tr");
        const img = document.createElement("img");
        const td = document.createElement("td");
        console.log(val.schoolLogoUrl);
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
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}
showCollegeData();