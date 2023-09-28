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