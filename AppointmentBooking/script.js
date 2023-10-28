const form = document.getElementById('registration');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');


function addUserToLocalStrorage(key,jsonData){
    try {
        localStorage.setItem(key,jsonData);
        
    } catch (error) {
        console.log(error);
    }
}

function removeUserDataFromLocalStorage(key){
    try {
        localStorage.removeItem(key);
        
    } catch (error) {
        console.log(error)
    }
}


form.addEventListener("submit",(event)=>{
    event.preventDefault()

    const userData ={
        username: username.value,
        email: email.value,
        password: password.value
    }

    //local storage
    const jasonData = JSON.stringify(userData);
    addUserToLocalStrorage(userData.email,jasonData);
    form.reset();
    addUser(userData);
})

function addUser(userData){
    const ulList = document.getElementById('newusers');

    const li = document.createElement('li');
    li.className="userList";
    li.setAttribute('data-user-data', JSON.stringify(userData));

    var btn = document.createElement("button");
    btn.className = "btn delete";

    var editBtn = document.createElement("button");
    editBtn.className = "btn edit";

    var text = document.createTextNode("Username: "+userData.username+" Email: "+userData.email);
    li.appendChild(text);


    btn.appendChild(document.createTextNode("Delete"));
    editBtn.appendChild(document.createTextNode("Edit"));

    li.appendChild(btn);
    li.appendChild(editBtn);

    ulList.appendChild(li);
}

const ulList = document.getElementById('newusers');
ulList.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        const li = e.target.parentElement;
        const userData = JSON.parse(li.getAttribute('data-user-data'))
        
        removeUserDataFromLocalStorage(userData.email)
        li.remove();
    }
    if(e.target.classList.contains('edit')){
        const li = e.target.parentElement;
        const userData = JSON.parse(li.getAttribute('data-user-data'))

        const uname = document.getElementById('username')
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        uname.value = userData.username;
        email.value = userData.email;
        password.value = ""

        removeUserDataFromLocalStorage(userData.email);
        li.remove();
    }
})

function displayUsers(){
    for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(key))
        addUser(userData)
    }
}

window.addEventListener('load',()=>{
    displayUsers();
})