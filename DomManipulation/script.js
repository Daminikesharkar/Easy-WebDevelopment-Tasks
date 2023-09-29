console.log(document);
console.dir(document);

console.log(document.title);
document.title = "Dom manipulation";

console.log(document.all);
console.log(document.all[4]);

console.log(document.getElementById("title"));

var content = document.getElementById("header-title");
content.innerHTML = "<h3>change the title</h3>";
content.style.border = "1px solid black";

var addItem = document.getElementById("main");
console.log(addItem.childNodes[1]);
addItem.childNodes[1].style.fontWeight = "bold";
addItem.childNodes[1].style.color = "green";

var items = document.getElementsByClassName("list-group-item");
items[2].style.backgroundColor = "green";

for(let i=0;i<items.length;i++){
    items[i].style.fontWeight = "bold";
}

var li = document.getElementsByTagName("li");
console.log(li[4].innerText);

var qs = document.querySelector(".title");
console.log(qs);

var qsa = document.querySelectorAll(".title");
console.log(qsa);

var submit = document.querySelector('input[type="submit"]');
submit.value = "SEND";

var seconditem = document.querySelector(".list-group-item:nth-child(2)");
seconditem.style.backgroundColor = "green";

var thirditem = document.querySelector(".list-group-item:nth-child(3)");
thirditem.style.display = "none";

var odd = document.querySelectorAll("li:nth-child(odd)");
var even = document.querySelectorAll("li:nth-child(even)");

for(var i=0;i<odd.length;i++){
    odd[i].style.backgroundColor = "green"; 
    even[i].style.backgroundColor = "white";
}


//ParentNode and childNode
var items = document.querySelector("#items");
console.log(items.parentNode);
console.log(items.childNodes);
console.log(items.parentNode.parentNode);

//ParentElement
console.log(items.parentElement);

//children
console.log(items.children);
console.log(items.children[2]);

//first child and first element child
console.log(items.firstChild);
console.log(items.firstElementChild);

//last child and last element child
console.log(items.lastChild);
console.log(items.lastElementChild);

//next sibling and next element sibling
console.log(items.nextSibling);
console.log(items.nextElementSibling);

//previous sibling and previoselement sibling
console.log(items.previousSibling);
console.log(items.previousElementSibling);


//creating new element
var newDiv = document.createElement("div");
newDiv.className = "new-div";
newDiv.id = "newdiv";
newDiv.setAttribute("title","new div");

var text = document.createTextNode("Hello world");
newDiv.appendChild(text);

var h2 = document.querySelector('h1');
var container = document.querySelector('.container');

container.insertBefore(newDiv,h2);

//adding text before item 1

var newItem = document.createElement("li");
newItem.className = "list-group-item";
var text2 = document.createTextNode("Hello world");
newItem.appendChild(text2);
console.log(newItem);

container.insertBefore(newItem,h2);
