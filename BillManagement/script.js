import axios from 'https://cdn.jsdelivr.net/npm/axios@1.5.1/+esm'
document.addEventListener('DOMContentLoaded', function() { 
       
    //post data into crudcrud
    async function postData(data){
        try {
            let response = await axios.post('https://crudcrud.com/api/344c530f8712499fb5b15435ddbc3df0/data',data);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    async function getSingleEntry(data){
        try {
            let response = await axios.get('https://crudcrud.com/api/344c530f8712499fb5b15435ddbc3df0/data');
            console.log("innn",response.data)
            const matchingId = response.data.find(item => item.priceAdded === data);
            console.log(matchingId._id);
            return matchingId._id;
            
        } catch (error) {
            console.log(error);
        }
    }

    //delete from crudcrud
    async function deleteData(data){
        // console.log("data -->",data,data.dishAdded)
        let id = await getSingleEntry(data);
        try {
            let response = await axios.delete(`https://crudcrud.com/api/344c530f8712499fb5b15435ddbc3df0/data/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    //access elements
    const addBtn = document.getElementById('add-btn');
    const addPriceInput = document.getElementById('add-price');
    const addDishInput = document.getElementById('add-dish');
    const tableInput = document.getElementById('table');
    let userdata= {}

    addBtn.addEventListener("click",async ()=>{
        let priceAdded = addPriceInput.value;
        let dishAdded = addDishInput.value;
        let tableAdded = tableInput.value;

        userdata = {
            priceAdded: priceAdded,
            dishAdded: dishAdded,
            tableAdded: tableAdded
        }
    
        if (priceAdded=='' || dishAdded == '' || tableAdded == ''){
            alert('No task is added ')
        }else{
            console.log(userdata);
            await postData(userdata);
            addBill(userdata);
        }        
    })


    //adding note to UI
    function addBill(userdata){
                
        const mainDiv = document.getElementById('new-tasks');
        let tablediv = document.getElementById('table1div');

        if(userdata.tableAdded == 'table1'){
           tablediv = document.getElementById('table1div');
        }else if(userdata.tableAdded == 'table2'){
            tablediv = document.getElementById('table2div');
        }else{
            tablediv = document.getElementById('table3div');
        }

        const divInner = document.createElement('div');
        const inputField1 = document.createElement('input');
        const inputField2 = document.createElement('input');    
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        divInner.id = "innerdiv";
        inputField1.class = 'addednote';
        inputField1.id = 'addednoteid';
        inputField1.value = userdata.priceAdded;
        inputField1.disabled = true;

        inputField2.value = userdata.dishAdded;
        inputField2.class = 'addednote';
        inputField2.id = 'addednoteid';
        inputField2.disabled = true;

        editBtn.class = 'editnote';
        deleteBtn.class = 'deletenote';

        let textNode = document.createTextNode(userdata.priceAdded);
        inputField1.appendChild(textNode);
        let textNode2 = document.createTextNode(userdata.dishAdded);
        inputField2.appendChild(textNode2);

        editBtn.appendChild(document.createTextNode("edit"));
        deleteBtn.appendChild(document.createTextNode("delete"));

        divInner.appendChild(inputField1);       
        divInner.appendChild(inputField2); 
        divInner.appendChild(editBtn);
        divInner.appendChild(deleteBtn);

        tablediv.appendChild(divInner);
        mainDiv.appendChild(tablediv);
    }

    //deleting and editing note
    let parentDiv = document.getElementById('new-tasks');
    parentDiv.addEventListener("click",modifyNote)

    let tableDiv = document.getElementById('table1div');
    async function modifyNote(e){
        if(e.target.class == 'deletenote'){ 
            if(userdata.tableAdded == 'table1'){
                tableDiv = document.getElementById('table1div');
            }else if(userdata.tableAdded == 'table2'){
                tableDiv = document.getElementById('table2div');
            }else{
                tableDiv = document.getElementById('table3div');
            }

            const div = e.target.parentElement; 
            let value = div.firstChild.value;  
            console.log(value);  
            tableDiv.removeChild(div);       
            await deleteData(value);
            
        }          
    }

    async function displayOrders(){
        try {
            let response = await axios.get('https://crudcrud.com/api/344c530f8712499fb5b15435ddbc3df0/data');
            let length = Object.keys(response.data).length;
            
            for(let i=0;i<length;i++){
                let data = response.data[i];
                console.log(data)
                addBill(data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    window.addEventListener("load",()=>{
        displayOrders();
    })
})

