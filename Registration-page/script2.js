import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'


document.addEventListener("DOMContentLoaded", function() {
    async function getData(){
        try {
            let responseData = await axios.get("https://crudcrud.com/api/f09dd60c95be4a1b88486075d2d45ea2/appointmentData");
            console.log(responseData.data);
            return responseData.data;                        
        } catch (error) {
            console.log(error);            
        }
    }

    async function getDataByKey(email){
        try {
    
            let responseData = await axios.get('https://crudcrud.com/api/f09dd60c95be4a1b88486075d2d45ea2/appointmentData',);
            console.log(email)
            const matchingId = responseData.data.find(item => item.email === email);
            console.log(matchingId);
            return matchingId._id; 
        } catch (error) {
            console.log(error);        
        }
    }

    async function postData(userData){
        try {
            let responseData = await axios.post('https://crudcrud.com/api/f09dd60c95be4a1b88486075d2d45ea2/appointmentData',userData);
            console.log(responseData.data);
            
        } catch (error) {
            console.log(error);        
        }
    }

    async function deleteData(email){
        let id = await getDataByKey(email);   
 
        try{
            let responseData = await axios.delete(`https://crudcrud.com/api/f09dd60c95be4a1b88486075d2d45ea2/appointmentData/${id}`,)
            console.log(responseData)
        }catch(error){
            console.log(error)
        }
    
    }
    
    async function updateData(email){
        let id = await getDataByKey(email)
        const updateData = {
            username: 'Damini',
            email: 'damini@gmail.com'
        }
        try{
            let responseData = await axios.put(`https://crudcrud.com/api/f09dd60c95be4a1b88486075d2d45ea2/appointmentData/${id}`,updateData)
            console.log(responseData)
    
        }catch(error){
            console.log(error)
        }
    
    }

    const form = document.getElementById("registration");

    //post
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        const userData = {
            name : username,
            email : email,
            password : password
        };

        postData(userData);
        form.reset();
        addUsers(userData.name,userData.email);
    });


    //adding fetched data into UL
    function addUsers(name,email){

        var newUserList = document.getElementById("newusers");

        var li = document.createElement("li");
        li.className="userList";

        var btn = document.createElement("button");
        btn.className = "btn delete";

        var editBtn = document.createElement("button");
        editBtn.className = "btn edit";

        var text = document.createTextNode("Username: "+name+" Email: "+email);
        li.appendChild(text);


        btn.appendChild(document.createTextNode("Delete"));
        li.appendChild(btn);

        editBtn.appendChild(document.createTextNode("Edit"));
        li.appendChild(editBtn);

        newUserList.appendChild(li);        
    }



    //get
    async function displayUsers(){  
        
        let responseData = await getData();
        console.log(Object.keys(responseData).length);
        let length = Object.keys(responseData).length;

        
        for(var i=0;i<length;i++){
            const key = responseData[i].email; 
            const value = responseData[i].name;
            addUsers(value,key);
            console.log(value,key);        
        }
    }

    var ul = document.getElementById("newusers");
    ul.addEventListener("click",deleteUser);

    //delete
    async function deleteUser(e){    
        if(e.target.classList.contains("delete")){   
            
                var li = e.target.parentElement;
                var text = li.firstChild.textContent;
                const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/g;
                const key = text.match(emailRegex);
    
                await deleteData(key[0]);
                ul.removeChild(li);
        }  
    }

    var ulEdit = document.getElementById("newusers");
    ulEdit.addEventListener("click",edituser);

    async function edituser(e){
        if(e.target.classList.contains("edit")){

            var li = e.target.parentElement;
            var text = li.firstChild.textContent;
            const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/g;
            const key = text.match(emailRegex);   
            
            var uname = text.split(" ");
            
            var username = document.getElementById("username");
            var email = document.getElementById("email");

            username.value = uname[1];
            email.value = key;


            await updateData(key[0],);
            ul.removeChild(li);
        }
    }
    
    window.addEventListener("load",() =>{
        displayUsers();
    })
});