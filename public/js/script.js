const listUsers = document.getElementById('listusers');

window.setTimeout(getUsers, 500);
//getUsers()
async function getUsers() {

    const users = await fetch('http://localhost:3500/api/users').then(res => res.json())

    if(users.length) {
        listUsers.innerHTML = users.map(value => 
            (`<ul>
                <li id="line${value.id}">
                    ${value.task}\t
                    <span  onclick="editTask(${value.id})">editer</span>\t
                    <a href='#' onclick=
                        "event.preventDefault;
                        if(confirm('Voulez-vous supprimer le profil?')){
                            document.getElementById('form_${value.id}').submit();
                        };">
                    supprimer
                    <form id="form_${value.id}" action="/${value.id}?_method=DELETE" method="POST"></form></a>
                </li>
            </ul>`)
        ).join('')
    } else {
        listUsers.innerHTML = "Pas de tâches"
    }
 

}

async function editTask(id) {
    const user = await fetch(`http://localhost:3500/api/users/${id}`).then(res => res.json()).then(res => res[0])
    console.log(user)
    const element = document.getElementById(`line${id}`)
    element.innerHTML = `<form action="http://localhost:3500/${id}?_method=PUT" method="POST">

                            <label for="task">Nom</label>
                            <input type="text" id="task" name="task" autocomplete="off" value="${user.task}">

                            <input type="submit" value="Modifier">
                        </form>`
}

