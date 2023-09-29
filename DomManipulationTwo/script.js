var form = document.getElementById("addForm");
var itemList = document.getElementById("items");

form.addEventListener("submit",addItem);
function addItem(e){
    e.preventDefault();

    var val = document.getElementById("item");
    var discription = document.getElementById("discription");
    
    var li = document.createElement('li');
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(val.value));
    li.appendChild(document.createTextNode(" "+discription.value));

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

//filter items
var filter = document.getElementById("filter");
filter.addEventListener("keyup",filterItems);
function filterItems(e){
    //get filter text
    var text = e.target.value.toLowerCase();
    
    var items = itemList.getElementsByTagName("li");
    Array.from(items).forEach((item)=>{
        console.log(item.childElementCount)

        var itemtext = item.firstChild.textContent;
        var discriptionText = item.firstChild.nextSibling.textContent;      
        
        if(itemtext.toLowerCase().indexOf(text) != -1 || (item.childElementCount > 1 && discriptionText.toLowerCase().indexOf(text) != -1)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    })
}