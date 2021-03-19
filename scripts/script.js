const nameIncomeInput = document.getElementById("name-of-income");
const amountIncomeInput = document.getElementById("sum-of-income");
const nameExpensesInput = document.getElementById("name-of-expenses");
const amountExpensesInput = document.getElementById("sum-of-expenses");
const LIST_INCOME = document.getElementById("list-of-incoms");
const LIST_EXPENSES = document.getElementById("list-of-expenses");
const BUTTON_INCOME = document.getElementById("add-income");
const BUTTON_EXPENSES = document.getElementById("add-expenses");
const balance = document.getElementById("cash-balance");


let incomArray =[];
let expensesArray =[];

//Filtruje tablie po usunienciu elementu o konkretnym id listy przychodow
const BUTTON_DELETE_INCOME = document.querySelector('#deleteIncome');
let lastIdIncome = 0;
const deleteInc = (id) => {
    incomArray = incomArray.filter(v => v.id !== id);
    document.querySelector(`li#income_${id}`).remove();
    sumIncome();
};

//Modyfikuje danne w tablice prychodow, edytuje dowolny element po wpisaniu danych do input-a "Nazwa przychodu" i "Kwota" i dokona zmiany po nacisnieciu przyciska edytuj obok wybranego elelmanta z listy. 
const correctIncomePosition = (id) =>{
    const BUTTON_EDIT_INCOME = document.querySelector("#buttonEditIncome");
    const newIncomeNameValue = nameIncomeInput.value;
    const newIncomeAmountValue = Number(amountIncomeInput.value);
    let getItId = id; 
    let eddiIncomeArray =[];

    nameIncomeInput.style.borderColor ="";
    amountIncomeInput.style.borderColor ="";

    document.querySelector(`li#income_${id}`).innerHTML=`${newIncomeNameValue} - ${Math.abs(newIncomeAmountValue)} PLN<div> <button id="buttonEditIncome" onclick = "correctIncomePosition(${getItId})">Edytuj</button> <button id="deleteIncome" onclick="deleteInc(${getItId})">Usun</button></div>`; 

    if(newIncomeNameValue && newIncomeAmountValue){
        const newPosition = {
            id: getItId,
            description: newIncomeNameValue,
            amount:Number(newIncomeAmountValue)
        };
        eddiIncomeArray.push(newPosition);
    } else{
        if(!newIncomeNameValue) nameIncomeInput.style.borderColor ="red";

        if(!newIncomeAmountValue)  amountIncomeInput.style.borderColor ="red";
    } 

    nameIncomeInput.value = "";
    amountIncomeInput.value = "";

    incomArray = incomArray.map(x => {
        const item = eddiIncomeArray.find(({ id }) => id === x.id);
        return item ? item : x;
      });
     sumIncome();
};

// Tworzy i dodaje nowy element li do listy przychodow 
const addIncomeLlst =(position)=>{    
    const li = document.createElement("li");   
    li.id = `income_${position.id}`; 
    li.innerHTML=`${position.description} - ${Math.abs(position.amount)} PLN
        <div> <button id="buttonEditIncome" onclick = "correctIncomePosition(${position.id})">Edytuj</button>
        <button id="deleteIncome" onclick="deleteInc(${position.id})">Usun</button></div>`;  
        LIST_INCOME.appendChild(li);
        li.classList.add("flex"); 
}; 

//Dodaje value z inputow przychodow
const addIncome=()=>{
    const incomeNameValue = nameIncomeInput.value;
    const incomeAmountValue = amountIncomeInput.value;
    
    nameIncomeInput.style.borderColor ="";
    amountIncomeInput.style.borderColor ="";
    
    if(incomeNameValue && incomeAmountValue){
        const position = {
            id: lastIdIncome + 1,
            description: incomeNameValue,
            amount:Number(incomeAmountValue)
        };
        incomArray.push(position);
        addIncomeLlst(position);
        // correctPosition(position);
        lastIdIncome++;

    } else{
        if(!incomeNameValue) nameIncomeInput.style.borderColor ="red";
    
        if(!incomeAmountValue)  amountIncomeInput.style.borderColor ="red";
    } 
    nameIncomeInput.value = "";
    amountIncomeInput.value = "";
    sumIncome(); 
};

BUTTON_INCOME.addEventListener('click', addIncome);
// Sumuje amount z tablicy przychodow
let totalIncome = 0;
const sumIncome =()=>{
    let resultIncome = incomArray.reduce((prev, next) => 
    prev + next.amount, 0);
    document.getElementById("total-income-sum").innerHTML = `<p>Suma przychodów: ${resultIncome} zł</p>`; 
    totalIncome = resultIncome;
    availableFunds();
};

//Filtruje tablie po usunienciu elementu o konkretnym id z listy wydatkow
const BUTTON_DELETE_EXPENSES = document.querySelector('#deleteExpenses');
let lastIdExpenses = 0;
const deleteExp = (id) => {
    expensesArray = expensesArray.filter(v => v.id !== id);
    document.querySelector(`li#expenses_${id}`).remove();
    sumExpenses();
};

//Modyfikuje danne w tablice wydatkow, edytuje dowolny element po wpisaniu danych do input-a "Nazwa przychodu" i "Kwota" i dokona zmiany po nacisnieciu przyciska edytuj obok wybranego elelmanta z listy. 
const correctExpensePosition = (id) =>{
    const BUTTON_EDIT_ESPENSE = document.querySelector("#buttonEditExpense");
    const newExpenseNameValue =  nameExpensesInput.value;;
    const newExpenseAmountValue = Number(amountExpensesInput.value);
    let getItId = id; 
    let eddiExpenseArray =[];

    nameExpensesInput.style.borderColor ="";
    amountExpensesInput.style.borderColor ="";

    document.querySelector(`li#expenses_${id}`).innerHTML=`${newExpenseNameValue} - ${Math.abs(newExpenseAmountValue)} PLN<div> <button id="buttonEditExpense" onclick="correctExpensePosition(${getItId})">Edytuj</button> <button id="deleteIncome" onclick="deleteInc(${getItId})">Usun</button></div>`; 

    if(newExpenseNameValue && newExpenseAmountValue){
        const newPosition = {
            id: getItId,
            description: newExpenseNameValue,
            amount:Number(newExpenseAmountValue)
        };
        eddiExpenseArray.push(newPosition);
    } else{
        if(!newExpenseNameValue) nameExpensesInput.style.borderColor ="red";

        if(!newExpenseAmountValue)  amountExpensesInput.style.borderColor ="red";
    } 

    nameExpensesInput.value = "";
    amountExpensesInput.value = "";

    expensesArray = expensesArray.map(x => {
        const item = eddiExpenseArray.find(({ id }) => id === x.id);
        return item ? item : x;
      });
      sumExpenses();
};

// Tworzy i dodaje nowy element li do listy wydatkow
const addExpensesList =(position)=>{    
    const li = document.createElement("li"); 
    li.id = `expenses_${position.id}`;  
    li.innerHTML=`${position.description} - ${Math.abs(position.amount)} PLN
        <div> <button id = "buttonEditExpense" onclick = "correctExpensePosition(${position.id})">Edytuj</button> <button id="deleteExpenses" onclick="deleteExp(${position.id})">Usun</button></div>`;  
        LIST_EXPENSES.appendChild(li);
        li.classList.add("flex");
};

//Dodaje value z inputow wydatkow
const addExpenses=()=>{
    const expensesNameValue = nameExpensesInput.value;
    const expensesAmountValue = amountExpensesInput.value;
    
    nameExpensesInput.style.borderColor ="";
    amountExpensesInput.style.borderColor ="";
    
    if(expensesNameValue && expensesAmountValue){
        const position = {
            id: lastIdExpenses + 1,
            description: expensesNameValue,
            amount:Number(expensesAmountValue)
        };
        expensesArray.push(position);
        addExpensesList(position)
        lastIdExpenses++;
           
    } else{
        if(!expensesNameValue) nameExpensesInput.style.borderColor ="red";
    
        if(!expensesAmountValue) amountExpensesInput.style.borderColor ="red";
    } 
    nameExpensesInput.value = "";
    amountExpensesInput.value ="";
    sumExpenses();  
};

BUTTON_EXPENSES.addEventListener('click', addExpenses);
// Sumuje amount z tablicy wydatkow
let totalExpense = 0;
const sumExpenses =()=>{
    let resultExpenses = expensesArray.reduce((prev, next) => 
    prev + next.amount, 0);
    document.getElementById("total-expenses-sum").innerHTML = `<p class ="">Suma wydatków: ${resultExpenses} zł</p>`; 
    totalExpense = resultExpenses;
    availableFunds();
};

//Roznica dochodow i wydatkow
const availableFunds=()=>{
    if(totalIncome > totalExpense){
        result = totalIncome - totalExpense
        balance.innerHTML= `<p>Możesz jeszcze wydać ${result} złotych</p>`;
        balance.classList.add("active");
    } else if(totalIncome < totalExpense){
        result = totalIncome - totalExpense
        balance.innerHTML= `<p>Bilans jest ujemny.<br /> Jesteś na minusie ${result} złotych`;
        balance.classList.add("active");
    }else {
        balance.innerHTML= `<p>Bilans wynosi zero</p>`;
        balance.classList.add("active");
    }
};



    