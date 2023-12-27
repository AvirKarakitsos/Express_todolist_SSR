const listUsers = document.getElementById('listusers');
const sortDesc = document.querySelector('.fa-caret-down');
const sortAsc = document.querySelector('.fa-caret-up');

//window.setTimeout(() => getUsers('http://localhost:3500/api/users'), 500);
getUsers('http://localhost:3500/api/users')

function compareDates(date1,date2) {
    let ms = Math.abs(date1.getTime() - date2.getTime())
    let dist = 1000*60*60*24
    let days = Math.trunc(ms /dist)
    if(days) return "il y a "+days+" jour(s)"
    else return "aujourd'hui"
    
    
}

async function getUsers(url) {

    const users = await fetch(url).then(res => res.json())

    if(users.length) {
        const now = new Date()
        listUsers.innerHTML = users.map(value => 
            (`<li id="line${value.id}">
                    ${compareDates(now,new Date(value.date))}\t${value.task}\t
                    <span  onclick="editTask(${value.id})">editer</span>\t
                    <a href='#' onclick=
                        "event.preventDefault;
                        if(confirm('Voulez-vous supprimer le profil?')){
                            document.getElementById('form_${value.id}').submit();
                        };">
                    supprimer
                    <form id="form_${value.id}" action="/${value.id}?_method=DELETE" method="POST"></form></a>
                </li>`)
        ).join('')
    } else {
        listUsers.innerHTML = "Pas de tâches"
    }
 

}

async function editTask(id) {
    const user = await fetch(`http://localhost:3500/api/users/${id}`).then(res => res.json()).then(res => res[0])
    const element = document.getElementById(`line${id}`)
    element.innerHTML = `<form action="http://localhost:3500/${id}?_method=PUT" method="POST">

                            <label for="task">Nom</label>
                            <input type="text" id="task" name="task" autocomplete="off" value="${user.task}">
                            <i onclick="cancelEdit(${user.id})" class="fa-solid fa-square-xmark"></i>
                            <input type="submit" value="OK">
                        </form>`
}
async function cancelEdit(id) {
    const user = await fetch(`http://localhost:3500/api/users/${id}`).then(res => res.json()).then(res => res[0])
    const element = document.getElementById(`line${id}`)
    element.innerHTML = `<li id="line${user.id}">
                            ${compareDates(new Date(),new Date(user.date))}\t${user.task}\t
                            <span  onclick="editTask(${user.id})">editer</span>\t
                            <a href='#' onclick=
                                "event.preventDefault;
                                if(confirm('Voulez-vous supprimer le profil?')){
                                    document.getElementById('form_${user.id}').submit();
                                };">
                            supprimer
                            <form id="form_${user.id}" action="/${user.id}?_method=DELETE" method="POST"></form></a>
                        </li>`
}

sortDesc.addEventListener("click",function() {
    getUsers('http://localhost:3500/api/users/desc')
    this.style.display = "none" 
    sortAsc.style.display = "block"
})

sortAsc.addEventListener("click",function() {
    getUsers('http://localhost:3500/api/users/asc')
    this.style.display = "none" 
    sortDesc.style.display = "block"
})

