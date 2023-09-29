document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration");

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
        
        const userDataJson = JSON.stringify(userData);
        localStorage.setItem(userData.email,userDataJson);
        form.reset();

        addUsers(userData.name,userData.email);
    });

    function addUsers(name,email){

        var newUserList = document.getElementById("newusers");

        var li = document.createElement("li");
        li.className="userList";

        var btn = document.createElement("button");
        btn.className = "btn delete";

        var text = document.createTextNode("Username: "+name+" Email: "+email);
        li.appendChild(text);


        btn.appendChild(document.createTextNode("Delete"));
        li.appendChild(btn);

        newUserList.appendChild(li);        
    }

    function displayUsers(){        
        for(var i=0;i<localStorage.length;i++){
            const key = localStorage.key(i); //email
            const value = JSON.parse(localStorage.getItem(key));
            addUsers(value.name,key);
            console.log(value.name,key);        
        }
    }

    var ul = document.getElementById("newusers");
    ul.addEventListener("click",deleteUser);

    function deleteUser(e){    
        if(e.target.classList.contains("delete")){            
                var li = e.target.parentElement;
                var text = li.firstChild.textContent;
                const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/g;
                const key = text.match(emailRegex);
                localStorage.removeItem(key);
                console.log(key);
                ul.removeChild(li);
        }  
    }
    
    window.addEventListener("load",() =>{
        displayUsers();
    })
});