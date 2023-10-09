const form = document.getElementById("expensetracker");

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

        const amount = document.getElementById("expenseamount").value;
        const disctiption = document.getElementById("discription").value;
        const category = document.getElementById("category").value;


        console.log("expenseamount:", amount);
        console.log("discription:", disctiption);
        console.log("category:", category);

        const userData = {
            expenseamount : amount,
            discription : disctiption,
            category : category
        };
        
        const userDataJson = JSON.stringify(userData);
        localStorage.setItem(userData.expenseamount,userDataJson);
        form.reset();

        addUsers(userData.expenseamount,userData.discription,userData.category);
});
function addUsers(expenseamount,discription,category){

    var newUserList = document.getElementById("newexpense");

    var li = document.createElement("li");
    li.className="expenseList";

    var btn = document.createElement("button");
    btn.className = "btn btn-outline-dark m-2 delete";

    var editBtn = document.createElement("button");
    editBtn.className = "btn btn-outline-dark m-2 edit";

    var text = document.createTextNode("Expenseamount: "+expenseamount+" Discription: "+discription+" Category: "+category);
    li.appendChild(text);


    btn.appendChild(document.createTextNode("Delete"));
    li.appendChild(btn);

    editBtn.appendChild(document.createTextNode("Edit"));
    li.appendChild(editBtn);

    newUserList.appendChild(li);        
}

var ul = document.getElementById("newexpense");
ul.addEventListener("click",deleteUser);

function deleteUser(e){    
    if(e.target.classList.contains("delete")){            
        var li = e.target.parentElement;
        var text = li.firstChild.textContent;
        var texts = text.split(" ");
        const key = texts[1];
        localStorage.removeItem(key);
        ul.removeChild(li);
    }  
}


var ulEdit = document.getElementById("newexpense");
ulEdit.addEventListener("click",edituser);

function edituser(e){
    if(e.target.classList.contains("edit")){

        var li = e.target.parentElement;
        var text = li.firstChild.textContent;

        var texts = text.split(" ");
        const key = texts[1];
                        
        var expenseamount = document.getElementById("expenseamount");
        var disctiption = document.getElementById("discription");
        var category = document.getElementById("category");

        expenseamount.value = key;
        disctiption.value = texts[3];
        category.value = texts[5]

        localStorage.removeItem(key);
        ul.removeChild(li);
    }
}

function displayUsers(){        
    for(var i=0;i<localStorage.length;i++){
        const key = localStorage.key(i); 
        const value = JSON.parse(localStorage.getItem(key));
        addUsers(value.expenseamount,key);
        console.log(key,value.discription,value.category);        
    }
}

window.addEventListener("load",() =>{
    displayUsers();
})