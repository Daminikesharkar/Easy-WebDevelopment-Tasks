import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'

let count = 1;
let url = 'https://crudcrud.com/api/bb1c08231616404fa9c7308c7699df6e/orders';

document.addEventListener('DOMContentLoaded',()=>{

    async function postData(userData){
        try {
            const response = await axios.post(url,userData);
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    }

    async function getId(key){
        try {
            const response = await axios.get(url);
            const matchingId = response.data.find(item => item.id === key);
            console.log(matchingId);
            return matchingId._id;
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteData(key){
        try {
            let id = await getId(key);
            console.log(id);
            const response = await axios.delete(url+`/${id}`);
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    }

    const form = document.getElementById('orders');

    //getting input fields into variable
    const price = document.getElementById("add-price");
    const dish = document.getElementById("add-dish");
    const table = document.getElementById("table");
    

    //adding submit event listner to the form
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let priceValue = price.value;
        let dishValue = dish.value;
        let tableValue = table.value;
        

        const userData = {
            id: count,
            priceValue: priceValue,
            dishValue: dishValue,
            tableValue: tableValue,
        }
        count++;
        postData(userData);
        addOrder(userData);
        form.reset();
        console.log(userData);       
    })

    //add order according to tables
    function addOrder(userData){

        let whichTable = "";
        let tableUl = "";

        //get div according to table
        if(userData.tableValue === 'table1'){
            console.log("yes1");
            whichTable = userData.tableValue;
            tableUl = document.getElementById('table1ul')

        }else if(userData.tableValue === 'table2'){
            console.log("yes2");
            whichTable = userData.tableValue;
            tableUl = document.getElementById('table2ul')
        }else if(userData.tableValue === 'table3'){
            console.log("yes3");
            whichTable = userData.tableValue;
            tableUl = document.getElementById('table3ul')
        }

        const orderList = document.createElement('li');
        orderList.className = whichTable;
        orderList.setAttribute('data-user-data', JSON.stringify(userData));
        orderList.style.marginBottom = "10px";
        orderList.style.marginLeft="20px";

        const text = document.createTextNode("Id: "+userData.id+" Dish: "+userData.dishValue+" Price: "+userData.priceValue);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        orderList.setAttribute('data-user-data', JSON.stringify(userData));
        deleteButton.style.width="70px";
        deleteButton.style.height="30px"
        deleteButton.style.marginLeft="20px";
        
        deleteButton.appendChild(document.createTextNode("Delete"));
        orderList.appendChild(text);
        orderList.appendChild(deleteButton);

        tableUl.appendChild(orderList);        
    }

    const orderUl = document.getElementById('new-tasks');
    orderUl.addEventListener("click",(e)=>{
        if(e.target.classList.contains('delete')){
            let li = e.target.parentElement;
            let userData = JSON.parse(li.getAttribute('data-user-data')); 
            let key = userData.id; 
            
            deleteData(key);
            li.remove();          
        }
    })

    async function displayOrders(){
        try {
            const response = await axios.get(url);
            let length = Object.keys(response.data).length;

            for(let i=0;i<length;i++){
                const data = response.data[i];
                addOrder(data);
                count = data.id;
            }

            if(length === 0){
                count = 1;
            }else{
                count++;
            }  

        } catch (error) {
            console.log(error);
        }
    }

    window.addEventListener('load',()=>{
        displayOrders();
    })
})