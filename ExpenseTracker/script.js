let count = 1;
document.addEventListener(('DOMContentLoaded'),()=>{

    function addDataToLocalStorage(id,jsonData){
        try {
            localStorage.setItem(id,jsonData);            
        } catch (error) {
            console.log(error)
        }
    }

    function removeDataFromLocalStrorage(id){
        try {
            localStorage.removeItem(id);
            
        } catch (error) {
            console.log(error);
        }

    }

    const form = document.getElementById('expensetracker');
    const expenseamount = document.getElementById('expenseamount');
    const discription = document.getElementById('discription');
    const category = document.getElementById('category');

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        let expenseamountValue = expenseamount.value;
        let discriptionValue = discription.value;
        let categoryVal = category.value;

        const userData = {
            id:count,
            expenseamountValue: expenseamountValue,
            discriptionValue: discriptionValue,
            categoryVal:categoryVal,
        }
        count++;
        const userDataJson = JSON.stringify(userData);   
        
        addDataToLocalStorage(userData.id,userDataJson);
        addExpense(userData);
        form.reset();
    })


    function addExpense(userData){

        const ulList = document.getElementById('newexpense');

        const li = document.createElement('li');
        li.className = "expenseList";
        li.setAttribute('data-user-data', JSON.stringify(userData));

        const text = document.createTextNode("Expenseamount: "+userData.expenseamountValue+" Discription: "+userData.discriptionValue+" Category: "+userData.categoryVal);

        const deleteButton = document.createElement('button');
        deleteButton.classList = "delete";

        const editButton = document.createElement('button');
        editButton.classList = "edit";

        li.appendChild(text);
        deleteButton.appendChild(document.createTextNode('delete'));
        editButton.appendChild(document.createTextNode('edit'));

        li.appendChild(deleteButton);
        li.appendChild(editButton);

        ulList.appendChild(li);
    }


    const ulList = document.getElementById("newexpense");
    ulList.addEventListener('click',(e)=>{
        if(e.target.classList.contains('delete')){
            const li = e.target.parentElement;                        
            const userData = JSON.parse(li.getAttribute('data-user-data'))
            
            removeDataFromLocalStrorage(userData.id);
            li.remove();
        }
        if(e.target.classList.contains('edit')){
            const liEdit = e.target.parentElement;
            const userEditData = JSON.parse(liEdit.getAttribute('data-user-data'));

            let expenseamount = document.getElementById('expenseamount');
            let discription = document.getElementById("discription");
            let category = document.getElementById("category");

            expenseamount.value = userEditData.expenseamountValue;
            discription.value = userEditData.discriptionValue;
            category.value = userEditData.categoryVal;

            removeDataFromLocalStrorage(userEditData.id);
            liEdit.remove();
            if(count !== 1){
                count--;
            }            
        }
    })
    
    function displayExpense(){
        for(let i=0;i<localStorage.length;i++){
            const key = localStorage.key(i);
            const userData = JSON.parse(localStorage.getItem(key));
            addExpense(userData);
        }
        if(localStorage.length === 0){
            count = 1;
        }else{
            count++;
        }
    }

    window.addEventListener('load',()=>{
        displayExpense();
    })
})