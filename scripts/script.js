const nameIncomeInput = document.getElementById("name-of-income");
const amountIncomeInput = document.getElementById("sum-of-income");
const nameExpensesInput = document.getElementById("name-of-expenses");
const amountExpensesInput = document.getElementById("sum-of-expenses");
const LIST_INCOME = document.getElementById("list-of-incoms");
const LIST_EXPENSES = document.getElementById("list-of-expenses");
const BUTTON_INCOME = document.getElementById("add-income");
const BUTTON_EPENSES = document.getElementById("add-expenses");
const balance = document.getElementById("cash-balance");






//Tworzy unikalne id dla poszczegolnych obiektow w tablicach przychodow i wydatkow
const generateIdIncome = () =>`id-${Math.round(Math.random()*1e8).toString()}`;
const generateIdExpenses = () =>`id-${Math.round(Math.random()*1e8).toString()}`;

let incomArray =[];
let expensesArray =[];
// Tworzymy i dodaje nowy element li do listy przychodow 
const addIncomeLlst =()=>{    
    const li = document.createElement("li");    
    li.innerHTML=`${nameIncomeInput.value} - ${Math.abs(amountIncomeInput.value)} PLN
        <div><button class="button-edit">Edytuj</button>
        <button class="remove-button">Usun</button></div>`;  
        LIST_INCOME.appendChild(li);
        li.classList.add("flex");
        addIncome();
        
}; 

BUTTON_INCOME.addEventListener('click', addIncomeLlst);



//Dodaje value z inputow przychodow
const addIncome=()=>{
    const incomeNameValue = nameIncomeInput.value;
    const incomeAmountValue = amountIncomeInput.value;
    
    nameIncomeInput.style.borderColor ="";
    amountIncomeInput.style.borderColor ="";
    
    if(incomeNameValue && incomeAmountValue){
        const position = {
            id: generateIdIncome(),
            description: incomeNameValue,
            amount:Number(incomeAmountValue)
        };
        console.log(position.id)
        incomArray.push(position);
        console.log(incomArray);
           
    } else{
        if(!incomeNameValue) nameIncomeInput.style.borderColor ="red";
    
        if(!incomeAmountValue)  amountIncomeInput.style.borderColor ="red";
    } 
    nameIncomeInput.value = "";
    amountIncomeInput.value = "";
    sumIncome();
    // deleteElement();
};

// Sumuje amount z tablicy przychodow
let totalIncome = 0;
const sumIncome =()=>{
    let resultIncome = incomArray.reduce((prev, next) => 
    prev + next.amount, 0);
    document.getElementById("total-income-sum").innerHTML = `<p>Suma przychodow: ${resultIncome}zł</p>`; 
    totalIncome = resultIncome;
    availableFunds();
};
   

//Usuwa elementy ze strony 
// const deleteIncome =()=>{
//     const REMOVE_BUTTON = document.querySelectorAll(" .remove-button");
//     for (let elem of REMOVE_BUTTON) {
//         elem.addEventListener('click', () => {
//         elem.parentNode.parentNode.remove(elem.id);
//     })
// }
// console.log(elem.parentNode.parentNode)
// };


//Modyfikacja dannych, w polu nazwa pszuchodu i kwota wpisujesz nowe danne i nizej wybierasz jeden element z listy ktory chcesz zmodyfikowac, naciskasz przycisk udytuj i nowe danne wprowadzone 
// function correctData(){
//     let editButtons = document.querySelectorAll("li .button-edit");
//     console.log(editButtons)
//     for (let element of editButtons) {
//        element.addEventListener('click', function() {
//         li.innerHTML = `${nameIncomeInput.value} - ${amountIncomeInput.value} PLN<div><button class="button-edit">Edytuj</button> <button class="remove-button">Usun</button></div>`; 
//        });
//     }   
// }


// Tworzymy i dodaje nowy element li do listy wydatkow
const addExpensesList =()=>{    
    const li = document.createElement("li");    
    li.innerHTML=`${nameExpensesInput.value} - ${Math.abs(amountExpensesInput.value)} PLN
        <div><button class="button-edit">Edytuj</button>
        <button class="remove-button" >Usun</button></div>`;  
        LIST_EXPENSES.appendChild(li);
        li.classList.add("flex");
        addExpenses();
};

BUTTON_EPENSES.addEventListener('click', addExpensesList);

  //Dodaje value z inputow wydatkow
const addExpenses=()=>{
    const expensesNameValue = nameExpensesInput.value;
    const expensesAmountValue = amountExpensesInput.value;
    
    nameExpensesInput.style.borderColor ="";
    amountExpensesInput.style.borderColor ="";
    
    if(expensesNameValue && expensesAmountValue){
        const position = {
            id: generateIdExpenses(),
            description: expensesNameValue,
            amount:Number(expensesAmountValue)
        };
           console.log(position.id)
           expensesArray.push(position);
           console.log(expensesArray);
           
    } else{
        if(!expensesNameValue) nameExpensesInput.style.borderColor ="red";
    
        if(!expensesAmountValue) amountExpensesInput.style.borderColor ="red";
    } 
    nameExpensesInput.value = "";
    amountExpensesInput.value ="";
    sumExpenses();  
};

// Sumuje amount z tablicy wydatkow
let totalExpense = 0;
const sumExpenses =()=>{
    let resultExpenses = expensesArray.reduce((prev, next) => 
    prev + next.amount, 0);
    document.getElementById("total-expenses-sum").innerHTML = `<p>Suma wydatkow: ${resultExpenses}zł</p>`; 
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




    