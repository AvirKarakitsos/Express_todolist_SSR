const listUsers = document.getElementById('listusers');
const sortDesc = document.querySelector('.fa-caret-down');
const sortAsc = document.querySelector('.fa-caret-up')

window.setTimeout(() => getUsers('http://localhost:3500/api/users'), 100);
//getUsers('http://localhost:3500/api/users')

function compareDates(date1,date2) {
    let ms = Math.abs(date1.getTime() - date2.getTime())
    let dist = 1000*60*60*24
    let days = Math.trunc(ms /dist)
    let weeks = Math.trunc(ms /(dist*7))

    if(weeks === 1) return "il y a "+weeks+" semaine"
    else if(weeks > 1) return "il y a "+weeks+" semaines"
    else if(days) return "il y a "+days+" jours"
    else return "aujourd'hui"
}

async function getUsers(url) {

    const users = await fetch(url).then(res => res.json())

    if(users.length) {
        const now = new Date()
        listUsers.innerHTML = users.map(value => 
            (`<tr id="line${value.id}">
                <td>${compareDates(now,new Date(value.date))}</td>
                <td  class="task">${value.task}</td>
                <td class="options">
                    <span  onclick="editTask(${value.id})"><i class="icone fa-solid fa-pen-to-square edit"></i></span>
                    <a href='#' onclick=
                        "event.preventDefault;
                        if(confirm('Voulez-vous supprimer le profil?')){
                            document.getElementById('form_${value.id}').submit();
                        };">
                        <i class="icone fa-solid fa-square-xmark delete"></i>
                    <form id="form_${value.id}" action="/${value.id}?_method=DELETE" method="POST"></form></a>
                </td>
            </tr>`)
        ).join('')
    } else {
        listUsers.innerHTML = "Pas de tâches"
    }
 

}

async function editTask(id) {
    const user = await fetch(`http://localhost:3500/api/users/${id}`).then(res => res.json()).then(res => res[0])
    const element = document.getElementById(`line${id}`)
    element.innerHTML = `<td colspan="3" class="rowEdit">
                            <form action="http://localhost:3500/${id}?_method=PUT" method="POST">
                            <input type="text" id="task" name="task" autocomplete="off" value="${user.task}">
                            <i onclick="cancelEdit(${user.id})" class="icone fa-solid fa-square-xmark delete"></i>
                            <button type="submit"><i class="icone fa-solid fa-square-check submit"></i></button>
                            </form>
                        </td>`
}

async function cancelEdit(id) {
    const user = await fetch(`http://localhost:3500/api/users/${id}`).then(res => res.json()).then(res => res[0])
    const element = document.getElementById(`line${id}`)
    element.innerHTML = `<tr id="line${user.id}" class="task">
                            <td>${compareDates(new Date(),new Date(user.date))}</td>
                            <td>${user.task}</td>
                            <td class="options">
                                <span  onclick="editTask(${user.id})"><i class="icone fa-solid fa-pen-to-square edit"></i></span>
                                <a href='#' onclick=
                                    "event.preventDefault;
                                    if(confirm('Voulez-vous supprimer le profil?')){
                                        document.getElementById('form_${user.id}').submit();
                                    };">
                                    <i class="icone fa-solid fa-square-xmark delete"></i>
                                <form id="form_${user.id}" action="/${user.id}?_method=DELETE" method="POST"></form></a>
                            </td>
                        </tr>`
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

