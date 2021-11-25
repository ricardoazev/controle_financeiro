const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSclass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')// criando elemento html em java script

    li.classList.add(CSSclass)
    li.innerHTML = `
    ${name} 
    <span>${operator} R$${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">
      x
    </button> 
    `
    transactionUl.append(li)
}

const getExpenses = transactionsAmounts =>  Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts    
.reduce((accumulator, transaction) => accumulator + transaction, 0)
.toFixed(2)

const getTotal =  transactionsAmounts => transactionsAmounts
.reduce((accumulator, transaction) => accumulator + transaction, 0)
.toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({ amount}) => amount)
    const total = getTotal(transactionsAmounts)
    const income  = getIncome(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`

}

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
} 

init()

const updateLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000) //retorna numero aleatorio
const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    })
}

const cleanInouts = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubimit =  event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    if (isSomeInputEmpty){
        alert('Por favor, preencha tanto o nome quanto o valor da transação.')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInouts()

    


}

form.addEventListener('submit', handleFormSubimit)