const listUsers = document.getElementById('listusers');

window.setTimeout(getUsers, 500);
//getUsers()
async function getUsers() {

    const users = await fetch('http://localhost:3500/api/users').then(res => res.json())
 
    listUsers.innerHTML = users.map(value => 
        (`<ul>
            <li id="line${value.id}">
                ${value.id}\t${value.name}\t${value.country}\t
                <span  onclick="editTask(${value.id})">editer</span>\t
                <a href='#' onclick=
                    "event.preventDefault;
                    if(confirm('Voulez-vous supprimer le profil?')){
                        document.getElementById('form_${value.id}').submit();
                    };">
                supprimer
                <form id="form_${value.id}" action="/users/${value.id}?_method=DELETE" method="POST"></form></a>
            </li>
        </ul>`)
    ).join('')

}

async function editTask(id) {
    const user = await fetch(`http://localhost:3500/api/users/${id}`).then(res => res.json()).then(res => res[0])
    console.log(user)
    const element = document.getElementById(`line${id}`)
    element.innerHTML = `<form action="http://localhost:3500/users/${id}?_method=PUT" method="POST">

                            <label for="name">Nom</label>
                            <input type="text" id="name" name="name" autocomplete="off" value="${user.name}">
                            
                            <label for="country">Pays</label>
                            <input type="text" id="country" name="country" autocomplete="off" value="${user.country}">

                            <input type="submit" value="Modifier">
                        </form>`
}

