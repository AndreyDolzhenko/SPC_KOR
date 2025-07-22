const getOfClients = document.getElementById("getOfClients");
const searhOfClientsResult = document.getElementById("searhOfClientsResult");
const codeOfClientsShow = document.getElementById("codeOfClientsShow");
const scoreItems = document.createElement("b");
const getFilters = document.getElementById("getFilters");
const checkbox = document.getElementsByClassName("checkbox");
const header_tools_left = document.getElementsByClassName("header_tools_left");
const listOfStatuisScenar = document.getElementById("listOfStatuisScenar");
const getFromOrder = document.getElementById("getFromOrder");
const ordersList = document.getElementsByClassName("ordersList");

// функция для получения клиентов из СПИСКА НАЗНАЧЕННЫХ

const ordersToEmployee = async (employeeName, orderType) => {

  let dateSort = [];

  await fetch(
    // `http://91.236.199.173:3001/api/v1/getOrdersToEmployee?getOrdersToEmployee=${employeeName}`
    `http://127.0.0.1:3001/api/v1/getOrdersToEmployee?getOrdersToEmployee=${[employeeName, orderType]}`    
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      let score = 0;
        scoreItems.innerHTML = ``;

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

        for (let index = 0; index < dateSort.length - 1; ) {
          if (dateSort[index] == dateSort[index + 1]) {
            dateSort.splice(index, 1);
          } else {
            index++;
          }
        }

        dateSort.map((el) => {
          for (let index = 0; index < data.length; index++) {
            if (Object.values(data[index]).join().split(".")[1] == el) {
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
        if (clientsCode[index].className == "clientsCode underLine") {
          clientsCode[index].classList.remove("underLine");
        } else {
          clientsCode[index].classList.add("underLine");
        }
        serchData.value = event.target.innerText;
        pushEnter(event.target.innerText);
      });
    }
};

// кнопки запросов из Списков поручений

  for (let index = 0; index < ordersList.length; index++) {

    ordersList[index].addEventListener("click", (event) => {

      console.log(event.target.id);

      ordersToEmployee([userData.firstChild.textContent, event.target.id]);    

    });
  }


getOfClients.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(getOfClients[0].value);

  let dateSort = [];

  let clientsConditions = {
    operatorSName: userData.firstChild.textContent,
  };

  for (let index = 0; index < getOfClients.length; index++) {
    clientsConditions.status_1 = String(getOfClients[0].value);
    clientsConditions.status_2 = getOfClients[1].value;
  }

  // console.log(clientsConditions);

  // Функция для получения клиентов из Цикла контактов
  const clientsFromCK = async (clientsConditions) => {
    await fetch(
      // `http://127.0.0.1:3001/api/v1/getOfClients?getOfClients=${[
      //   clientsConditions.operatorSName,
      //   clientsConditions.status_1,
      //   clientsConditions.status_2,
      // ]}`
      `http://91.236.199.173:3001/api/v1/getOfClients?getOfClients=${[
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

        for (let index = 0; index < dateSort.length - 1; ) {
          if (dateSort[index] == dateSort[index + 1]) {
            dateSort.splice(index, 1);
          } else {
            index++;
          }
        }

        dateSort.map((el) => {
          for (let index = 0; index < data.length; index++) {
            if (Object.values(data[index]).join().split(".")[1] == el) {
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
        });

        scoreItems.innerHTML = `${score}`;
        codeOfClientsShow.prepend(scoreItems);
        codeOfClientsShow.title = clientsConditions.status_1;
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
        if (clientsCode[index].className == "clientsCode underLine") {
          clientsCode[index].classList.remove("underLine");
        } else {
          clientsCode[index].classList.add("underLine");
        }
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
      `http://91.236.199.173:3001/api/v1/filterItem?filterItem=${filterItem}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (filterResult) {
        const clientsCode = document.getElementsByClassName("clientsCode");
        const labelSearch = document.getElementById(`label${filterItem}`);
        const commonResult = document.getElementsByClassName("commonResult");

        // убираем подчеркивания со всех лейблов

        for (let index = 0; index < checkbox.length; index++) {
          const labelElement = document.querySelector(
            `label[for="${checkbox[index].id}"]`
          );
          labelElement.style = "text-decoration: none";
        }

        labelSearch.nextElementSibling.style = "text-decoration: underline";

        // Создаем массивы для отбора нужных клиентов и отфильтровывания нулей - 0
        let checkingList = [];
        let zeroList = [];
        let scoreChoiseClients = 0;

        if (filterItem != "potenc" && filterItem != "accountLinked") {
          filterResult.map((el) => {
            Object.values(el) == 0
              ? zeroList.push(Object.keys(el).join())
              : false;
          });

          filterResult.map((el) => checkingList.push(Object.keys(el).join()));

          for (let index = 0; index < clientsCode.length; index++) {
            if (
              checkingList.includes(clientsCode[index].innerText) == true &&
              zeroList.includes(clientsCode[index].innerText) == false
            ) {
              scoreChoiseClients++;
              clientsCode[index].style.color = "blue";
            } else {
              clientsCode[index].style.color = "brown";
            }
          }
        } else {
          filterResult.map((el) => checkingList.push(el.join()));

          for (let index = 0; index < clientsCode.length; index++) {
            if (checkingList.includes(clientsCode[index].innerText) == true) {
              clientsCode[index].style.color = "blue";
            } else {
              clientsCode[index].style.color = "brown";
              scoreChoiseClients++;
            }
          }
        }
        const scoreChoiseClientsResult = document.createElement("div");

        scoreChoiseClientsResult.style =
          "color: blue; font-weight: 600; font-size: 14px;";
        scoreChoiseClientsResult.innerHTML = `Статистика выбора: ${scoreChoiseClients}`;
        listOfStatuisScenar.lastChild.remove();
        listOfStatuisScenar.append(scoreChoiseClientsResult);
      });
  };

  serchData.value == "" ? alert("Выберите клиента для получения Фильтров!") : getFilters.innerHTML = "";

  for (let index = 0; index < checkbox.length; index++) {
    console.log(checkbox.length)
    const filtersItem = document.createElement("button");
    filtersItem.classList.add("filtersButton");
    filtersItem.name = checkbox[index].id.slice(5)
    filtersItem.innerText = checkbox[index].nextSibling.innerText.slice(0, -1);       
    getFilters.append(filtersItem);

    filtersItem.addEventListener("click", (event) => {
      getClientByFilter(event.target.name);
    });
  }
});
