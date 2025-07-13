const getOfClients = document.getElementById("getOfClients");
const searhOfClientsResult = document.getElementById("searhOfClientsResult");
const codeOfClientsShow = document.getElementById("codeOfClientsShow");
const scoreItems = document.createElement("b");
const getFilters = document.getElementById("getFilters");
const checkbox = document.getElementsByClassName("checkbox");

getOfClients.addEventListener("submit", function (e) {
  e.preventDefault();

  let dateSort = [];

  let clientsConditions = {
    operatorSName: userData.firstChild.textContent,
  };

  for (let index = 0; index < getOfClients.length; index++) {
    clientsConditions.status_1 = getOfClients[0].value;
    clientsConditions.status_2 = getOfClients[1].value;
  }

  // console.log(clientsConditions);

  // Функция для получения клиентов из Цикла контактов
  const clientsFromCK = async (clientsConditions) => {
    await fetch(
      `http://127.0.0.1:3001/api/v1/getOfClients?getOfClients=${[
        clientsConditions.operatorSName,
        clientsConditions.status_1,
        clientsConditions.status_2,
      ]}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let score = 0;
        scoreItems.innerHTML = ``;

        // console.log(data);
        searhOfClientsResult.innerHTML = "";
        data.map((el) => {
          if (el[Object.keys(el)] == "Более 6 месяцев назад") {
            el[Object.keys(el)] = "6 и более";
          } else {
            dateSort.push(el[Object.keys(el)].split(".")[1]);
            el[Object.keys(el)] = el[Object.keys(el)].slice(0, 10);
          }
          spanWithCode = document.createElement("span");
          spanWithCode.innerHTML = `<span class="clientsCode">${Object.keys(
            el
          )}</span><span>${Object.values(el).join().slice(0, 10)}</span>;`;

          if (el[Object.keys(el)] == "6 и более") {
            score++;
            searhOfClientsResult.prepend(spanWithCode);
          } else {
            dateSort.sort((a, b) => a - b);
          }
        });

        dateSort.map((el) => {
          if (el[Object.keys(el)] != "6 и более") {
            for (let index = 0; index < data.length; index++) {
              // console.log(Object.values(data[index]).join().split(".")[1]);
              if (Object.values(data[index]).join().split(".")[1] == el) {
                // console.log(el);
                // console.log(data[index]);
                spanWithCode = document.createElement("span");
                spanWithCode.innerHTML = `<span class="clientsCode">${Object.keys(
                  data[index]
                )}</span><span>${Object.values(data[index])
                  .join()
                  .slice(0, 10)}</span>;`;
                score++;
                searhOfClientsResult.append(spanWithCode);
              }
            }
          }
        });

        scoreItems.innerHTML = `${score}`;
        codeOfClientsShow.prepend(scoreItems);
        codeOfClientsShow.style.display = "block";
      });

    const clientsCode = document.getElementsByClassName("clientsCode");
    const goUp = document.getElementById("goUp");
    const goDown = document.getElementById("goDown");

    goUp.addEventListener("click", (event) => {
      goUp.style.display = "none";
      goDown.style.display = "contents";
      searhOfClientsResult.style =
        "width: 50vh; height: 100vh; flex-direction: column; right: 0px;";
    });
    goDown.addEventListener("click", (event) => {
      goDown.style.display = "none";
      goUp.style.display = "contents";
      searhOfClientsResult.style = "initial";
    });

    for (let index = 0; index < clientsCode.length; index++) {
      clientsCode[index].addEventListener("click", (event) => {
        serchData.value = event.target.innerText;
        pushEnter(event.target.innerText);        
      });
    }
  };

  clientsFromCK(clientsConditions);
});

// Выбираем клиентов по фильтрам

getFilters.addEventListener("click", (event) => {
  const getClientByFilter = async (filterItem) => {
    await fetch(
      `http://127.0.0.1:3001/api/v1/filterItem?filterItem=${filterItem}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);

        const clientsCode = document.getElementsByClassName("clientsCode");
        const labelSearch = document.getElementById(`label${filterItem}`);
        const commonResult = document.getElementsByClassName("commonResult");

        // убираем подчеркивания со всех лейблов

        for (let index = 0; index < checkbox.length; index++) {         

          const labelElement = document.querySelector(`label[for="${checkbox[index].id}"]`); 
          labelElement.style = "text-decoration: none";
          
        }

        labelSearch.nextElementSibling.style = "text-decoration: underline";
        // console.log(labelSearch.nextElementSibling);   

// Создаем массивы для отбора нужных клиентов и отфильтровывания нулей - 0
        let checkingList = [];
        let zeroList = [];

        if (filterItem != "potenc" && filterItem != "accountLinked") {
          
          data.map(el => {
            Object.values(el) == 0 ? zeroList.push(Object.keys(el).join()) : false;
          })
  
          data.map(el => checkingList.push(Object.keys(el).join()));
  
          // console.log(checkingList.includes(clientsCode[0].innerText));
  
          for (let index = 0; index < clientsCode.length; index++) {
            // console.log(checkingList.includes(clientsCode[index].innerText));
  
            if (checkingList.includes(clientsCode[index].innerText) == true && zeroList.includes(clientsCode[index].innerText) == false) {
                            
                // console.log(clientsCode[index].innerText);
                clientsCode[index].style.color = "blue";           
            } else {
              clientsCode[index].style.color = "brown";
            }
            
          }
        } else {
             
          data.map(el => checkingList.push(el.join()));

          for (let index = 0; index < clientsCode.length; index++) {
            // console.log(checkingList.includes(clientsCode[index].innerText));
  
            if (checkingList.includes(clientsCode[index].innerText) == true) {
                            
                // console.log(clientsCode[index].innerText);
                clientsCode[index].style.color = "blue";           
            } else {
              clientsCode[index].style.color = "brown";
            }
            
          }
  
          // console.log(checkingList.includes(clientsCode[0].innerText));
        }



      });
  };

  for (let index = 0; index < checkbox.length; index++) {
    const filtersItem = document.createElement("span");
    filtersItem.innerText = checkbox[index].id.slice(5);
    filtersItem.style = "cursor: pointer; font-weight: 600";
    getFilters.append(filtersItem);

    filtersItem.addEventListener("click", (event) => {
      
      getClientByFilter(event.target.innerText);

    });
  }
});
