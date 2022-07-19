/*
    * * * * * * * *
    
    DESAFIO PLANILHA DE GASTOS:
    
    1. Desenvolva uma função que pedirá ao usuário que insira dados
    de uma nova despesa. Essa função quando chamada abrirá um prompt
    na tela com a pergunta: "Qual a descricao de sua despesa?".
    Depois de respondida, a mesma função abrirá um novo prompt com a
    pergunta: "Qual o valor de sua despesa?".
    
    2. Desenvolva uma nova função que pedirá ao usuário que insira
    dados de uma nova receita. Assim como a função acima essa deverá 
    pedir informações da descrição e valor da receita.
    
    3. Note que devemos interpretar o valor digitado pelo usuário como um
    number, e o resultado que recebemos de um prompt é uma string. Por isso
    é necessário fazer a conversão. Antes disso vamos validar se o que foi
    digitado é um número. Caso não seja um número deve-se enviar um alerta
    avisando ao usuário que aquele campo deve ser um número.
    Obs: aqui no Brasil temos a convenção de usar a vírgula como símbolo decimal
    mas o padrão internacional é o ponto, por isso vamos também validar antes de
    converter para número, que o valor digitado não contém uma vírgula.
    Se contiver, precisamos enviar um alerta ao usuário avisando que o padrão
    de símbolo decimal deve ser um ponto.
    
    * * * * * * * *
*/

let outcomeDescription = [];
let outcomeAmount = [];

let incomeDescription = [];
let incomeAmount = [];

function listLength() {
  return document.querySelectorAll(`li`).length;
}

function removeTransactiontFromList(trId) {
  // console.log(trId)

  // const removeTr = document.getElementById(trId)

  // outcomeAmount.pop(trId)

  // transactionList
  //   .removeChild(document.getElementById(trId));

  //   const items = document.querySelectorAll(`tr.${theadId}`, function(){

  //   })

  // console.log(outcomeAmount);
  let theadId = outcomeAmount.length - 1;

  document
    .getElementById("lista-transacoes-conteudo")
    .removeChild(document.getElementById(theadId));

  outcomeAmount.splice(theadId, 1);

  console.log(theadId, outcomeAmount);
}

function renderTransactions() {
  
}

function newOutcomePrompt() {
  let newOutcomeDescription = prompt("Qual a descrição de sua despesa?");

  let newOutcomeAmount = parseFloat(prompt("Qual o valor de sua despesa?"));

  if (isNaN(newOutcomeAmount)) {
    alert("Informe apenas números, por favor!");
  } else {
    outcomeDescription.push(newOutcomeDescription);
    outcomeAmount.push(newOutcomeAmount);

    const element = `<tr id=${outcomeAmount.length - 1} class="item">
    <td class="coluna-descricao">${newOutcomeDescription}</td>
    <td class="coluna-categoria">Despesa</td>
    <td class="coluna-valor">${Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newOutcomeAmount)}</td>
    <td class="coluna-categoria"><button id="removeTransactionBtn" onclick="removeTransactiontFromList(${
      outcomeAmount.length - 1
    })"><img src="./assets/trash.svg" alt="Deletar item" /></button></td>
    </tr>`;

    document.getElementById("lista-transacoes-conteudo").innerHTML += element;
    returnOutcomeSum();
  }
  balance();

  console.log(outcomeDescription);
  console.log(outcomeAmount);
}

function newIncomePrompt() {
  let newIncomeDescription = prompt("Qual a descrição de sua receita?");
  let newIncomeAmount = parseFloat(prompt("Qual o valor de sua receita?"));

  let theadId = listLength() + 1;

  const element = `<tr id="${theadId}">
  <td class="coluna-descricao">${newIncomeDescription}</td>
  <td class="coluna-categoria">Receita</td>
  <td class="coluna-valor">${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(newIncomeAmount)}</td>
  <td class="coluna-categoria"><button onclick="removeTransactiontFromList(${theadId})"><img src="./assets/trash.svg" alt="Deletar item" /></button></td>
    </tr>`;

  if (isNaN(newIncomeAmount)) {
    alert("Informe apenas números, por favor!");
  } else {
    document.getElementById("lista-transacoes-conteudo").innerHTML += element;
    returnIncomeSum();

    incomeDescription.push(newIncomeDescription);
    incomeAmount.push(newIncomeAmount);
  }
  balance();

  console.log(incomeDescription);
  console.log(incomeAmount);
}

function returnOutcomeSum() {
  let outcomeSum = 0;

  for (let i = 0; i < outcomeAmount.length; i++) {
    outcomeSum += outcomeAmount[i];
  }

  return outcomeSum;
}

function returnIncomeSum() {
  let incomeSum = 0;

  for (let i = 0; i < incomeAmount.length; i++) {
    incomeSum += incomeAmount[i];
  }

  return incomeSum;
}

function balance() {
  const element = `<p id="saldo">${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(returnIncomeSum() - returnOutcomeSum())}</p>`;
  document.getElementById("informacao").innerHTML = element;
}
