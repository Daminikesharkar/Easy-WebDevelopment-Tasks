var form = document.getElementById("addForm");
var itemList = document.getElementById("items");

form.addEventListener("submit",addItem);
function addItem(e){
    e.preventDefault();

    var val = document.getElementById("item");
    
    var li = document.createElement('li');
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(val.value));

    //create and add delete button
    var btn = document.createElement('button');
    btn.className = "btn btn-danger btn-sm float-right delete";
    btn.appendChild(document.createTextNode('X'));
    li.appendChild(btn);

    //create and add edit button
    var btn2 = document.createElement('button');
    btn2.className = "btn btn-danger btn-sm float-right delete";
    btn2.style.marginRight = "10px";
    btn2.appendChild(document.createTextNode('E'));
    li.appendChild(btn2);

    itemList.appendChild(li);
    form.reset();
}

//delete items 
itemList.addEventListener("click",deleteElement);
function deleteElement(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure?")){
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}
