import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'

const url = "https://crudcrud.com/api/5dd2a354e8bc4735a537266487de8602/userData";

const form = document.getElementById('registration');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');


function postData(userData){
    axios.post(url,userData)
        .then((response)=>{
            addUser(response.data)
        }).catch((error)=>{
            console.log(error);
        })
}

function getId(key){
    return new Promise ((resolve)=>{
        axios.get(url)
        .then((response)=>{
            const id = response.data.find((item)=>item.email == key);   
            resolve(id._id)         
        })
    }) 
    
}

function deleteData(key){
    getId(key)
        .then((id)=>{
            axios.delete(url+`/${id}`)
                .then((response)=>{
                    console.log(response)
                })
        })    
}

function updateData(key){

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');


    getId(key)
        .then((id)=>{
            const data ={
                username: username.value,
                email: email.value,
                password: password.value
            }
            axios.patch(url+`/${id}`,data)
                .then((response)=>{
                    addUser(response.data)
                })
        })
}


form.addEventListener("submit",(event)=>{
    event.preventDefault()

    const userData ={
        username: username.value,
        email: email.value,
        password: password.value
    }

    //post req to crud crud
    postData(userData);
    form.reset();
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
        
        //delete req
        deleteData(userData.email);
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

        // updateData(userData.email)
        deleteData(userData.email)
        li.remove();
    }
})

function displayUsers(){
    //get req
    axios.get(url)
        .then((response)=>{
            const length = Object.keys(response.data).length;
            for(let i=0;i<length;i++){
                const data = response.data[i];
                addUser(data);
            }
        })
}

window.addEventListener('load',()=>{
    displayUsers();
})