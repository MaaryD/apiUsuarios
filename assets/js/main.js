console.log("Entro al main.js");

const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx";
const tblUsers = document.getElementById("tblUsers");

function cargarUsers() {
    fetch(base_url_api + "/Main/alumnos", 
    {method: "GET"})
        .then(response => response.json())
        .then(result => {
            console.log(result);
            tblUsers.innerHTML = "";
            for (const user of result.data) {
                let tr = `<tr>
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.paterno}</td>
                <td>${user.materno}</td>
                <td>${user.email}</td>
                </tr>`;
                
                tblUsers.innerHTML += tr;
            }
        })
        .catch(error => console.log(error));
}

function addUser(){
    console.log("Entró a addUser");
    let form_data = new FormData();
    form_data.append("nombre", document.getElementById("name").value);
    form_data.append("paterno", document.getElementById("firstLastName").value);
    form_data.append("materno", document.getElementById("secondLastName").value);
    form_data.append("email", document.getElementById("email").value);

    fetch(base_url_api + "/Main/alumnos", 
    {
        method: "POST",
        body: form_data
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            cleanForm();
            cargarUsers();

        })
        .catch(error => console.log(error));
}

function cleanForm(){
    document.getElementById("name").value = "";
    document.getElementById("firstLastName").value = "";
    document.getElementById("secondLastName").value = "";
    document.getElementById("email").value = "";
}

cargarUsers();