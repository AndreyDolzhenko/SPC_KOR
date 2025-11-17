const header = document.getElementById("header");
const sectionTitle = document.getElementById("sectionTitle");
const urgentScripts = document.getElementById("urgentScripts");
const greetings = document.getElementById("greetings");
const preparation = document.getElementById("preparation");
const preparationPlanBlock = document.getElementById("preparationPlan");
const contactScripts = document.getElementById("contact-scripts");
const buttonPrep = document.getElementsByClassName("buttonPrep");
const listScript = document.getElementById("list_script");
const rightBar = document.getElementById("right_bar");
const listPresentations = document.getElementById("list-presentations");
const btnBarSubDivision = document.getElementById("btn-bar_sub-division");
// const btnSubDivision = document.getElementsByClassName("btn_sub-division");
const content = document.getElementById("content");
const mainScenario = document.getElementById("main_scenario");
const inputName = document.getElementById("inputName");
const enterName = document.getElementById("enterName");
const presentationsUrgentScriptsClass = document.getElementsByClassName(
  "presentationsUrgentScripts"
);
const presentationsPotenzClass = document.getElementsByClassName(
  "presentationsPotenz"
);
const presentationsClass = document.getElementsByClassName("presentations");
const Services = document.getElementsByClassName("Services");
const progress = document.getElementById("progress");
const progress_bar_span = document.getElementById("progress_bar");
const progress_bar_color = document.getElementById("progress_bar_color");
let now_status = "SMB"; // переменная определяет выбранный подканал сбыта
const loader = document.getElementById("loader");
const many = document.getElementById("many");
const heart = document.getElementById("heart");
const userLink = document.getElementById("userLink");
const registration = document.getElementById("registration");
const header_tools = document.getElementById("header_tools");
const fullCheck = document.getElementById("100%");
const getEmployeesSchow = document.getElementById("getEmployeesSchow");
const statusData = document.getElementById("statusData");
const statusData_0 = document.getElementById("statusData_0");
const preferBlock = document.getElementById("preferBlock");

const popupOpen = document.getElementById("popup1"); // поле попапа
const textOutput = document.getElementById("popup1_txt"); // текстовое поле для попапа
let popupClose = document.getElementById("popup1_close"); // элемент (крестик) для закрытия попапа

let keySubDivision;
let firstSubDivision;
let previousElement = listScript;
let progress_counter;

// Загрузка страницы upload
const updatePass = document.getElementById("updatePass");
const updateLink = document.getElementById("updateLink");
updatePass.addEventListener("mouseout", (event) => {
  updatePass.value == "020493"
    ? (updateLink.style.pointerEvents = "auto")
    : false;
});
updateLink.addEventListener("click", (event) => {
  updatePass.value = "";
});
updatePass.addEventListener("mouseover", (event) => {
  updateLink.style.pointerEvents = "none";
});

let clientData; // данные о клиенте, полученные с сервера

let localPath = window.location.href;
const param = new URLSearchParams(window.location.search).get("fio_person");

// получение данных о пользователе из адресной строки
const getUsersAccaunt = () => {
  if (param === null) {
    userData.innerHTML = "Имя оператора";
  } else {
    paramsString = document.location.search;
    searchParams = new URLSearchParams(paramsString);
    userData.innerHTML = `${searchParams.get(
      "fio_person"
    )}<br>${searchParams.get("position_person")}`;
  }
};

getUsersAccaunt();

// работа с кнопками переключения КАНАЛОВ СБЫТА
const changeOfDivision = (newDivision) => {
  let btnSubDivision = document.getElementsByClassName("btn_sub-division");

  let nextSub = document.getElementById("btn-sub-division_" + newDivision);

  nextSub.style.background = "linear-gradient(45deg, black, transparent)";
  nextSub.style.color = "aliceblue";

  if (content.style.justifyContent != "") {
    content.style.justifyContent = "";
  }
  if (newDivision != keySubDivision) {
    keySubDivision = newDivision;
    for (btnPresentation of urgentScripts.children) {
      btnPresentation.style.display = "none";
    }
    for (btnSubDivision of btnSubDivision) {
      btnSubDivision.classList.remove("btn_selected");
    }
    for (clientStatus of listScript.children) {
      clientStatus.style.display = "none";
      if (
        subDivisionAndstatusScripts[keySubDivision]["status-scripts"][
          clientStatus.id
        ] != undefined
      ) {
        clientStatus.style.display = "";
      }
    }
    rightBar.style.display = "none";
    preparation.style.display = "";
    // event.target.classList.add("btn_selected");
  }
  greetings.style.display = "";
  // меняет цвет кнопок при переходе между подразделениями
  for (let index = 0; index < btnSubDivision.length; index++) {
    btnSubDivision[index].addEventListener("click", (event) => {
      nextSub.style.background = "aliceblue";
      nextSub.style.color = "black";

      for (let index = 0; index < btnSubDivision.length; index++) {
        if (btnSubDivision[index].value == event.target.value) {
          btnSubDivision[index].style.background =
            "linear-gradient(45deg, black, transparent)";
          btnSubDivision[index].style.color = "aliceblue";
        } else {
          btnSubDivision[index].style.background = "aliceblue";
          btnSubDivision[index].style.color = "black";
        }
      }
    });
  }
};

//РАБОТА С ПОПАПОМ
function popupOperation() {
  popup_0.style.opacity = "1";
  popup_0.style.visibility = "visible";
  popupOpen.style.opacity = "1";
  popupOpen.style.visibility = "visible";
  // описываем действие кнопки закрытия попапа
  popupClose.addEventListener("click", function () {
    popupOpen.style.opacity = "0";
    popupOpen.style.visibility = "hidden";
    popup_0.style.opacity = "0";
    popup_0.style.visibility = "hidden";
    textOutput.innerText = "";
  });
  // так же размещаем обработчик закрытия попапа на фон вокруг попапа
  popup_0.addEventListener("click", function () {
    popup_0.style.opacity = "0";
    popup_0.style.visibility = "hidden";
    popupOpen.style.opacity = "0";
    popupOpen.style.visibility = "hidden";
    textOutput.innerText = "";
  });
}

// кнопка возврата на стартовую страницу
iconHome.addEventListener("click", function (event) {
  document.location.reload();
});

// Кнопка ПРОВЕРКИ КЛИЕНТА

// Получаем дату актуальности клиентской базы

async function getActualDate() {
  let response = await fetch(
    `http://91.236.199.173:${3001}/api/v1/date`
    // `http://127.0.0.1:3001/api/v1/date`
    // `http://89.111.172.208:3001/api/v1/date`
  );

  searchDate = await response.json();

  const actualDate = document.getElementById("actualDate");

  actualDate.innerHTML = searchDate;
}

getActualDate();

// Функция для получения данных о клиенте

async function getDataOfCustomers(codeOfCustomer) {
  let response = await fetch(
    `http://91.236.199.173:${3001}/api/v1/customers?codeOfCustomer=${codeOfCustomer}`
    // `http://127.0.0.1:3001/api/v1/customers?codeOfCustomer=${codeOfCustomer}`
    // `http://89.111.172.208:3001/api/v1/customers?codeOfCustomer=${codeOfCustomer}`
  );

  const customerSearch = await response.json();

  // console.log(customerSearch);

  const clientDescription = commonResultOfChecking(
    customerSearch,
    codeOfCustomer
  );

  return clientDescription;
}

// Создание переменной с данными для чек-бокса по клиенту

const commonResultOfChecking = (data, codeOfCustomer) => {
  console.log(data);

  clientsName.innerText = data.clientsNames;
  clientsName_0.innerText = data.clientsNames;

  statusData.innerHTML = `${data.status_1}&nbsp;&nbsp;${data.status_2}`;
  statusData_0.innerHTML = `${data.status_1}&nbsp;&nbsp;${data.status_2}`;

  let colorDate = {};

  colorDate.debSumm =
    data.debSumm > 0
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.debDays =
    data.debDays > 0
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.cash =
    data.cash > 0
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.basket =
    data.basket > 0
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInPurchases =
    data.decreaseInPurchases != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInOffice =
    data.decreaseInOffice != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInPaper =
    data.decreaseInPaper != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInChemistry =
    data.decreaseInChemistry != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInParfum =
    data.decreaseInParfum != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInFood =
    data.decreaseInFood != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.decreaseInOrgtech =
    data.decreaseInOrgtech != "Нет."
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.osonCanc =
    data.osonCanc == "Да!"
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.osonChos =
    data.osonChos == "Да!"
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.osonProd =
    data.osonProd == "Да!"
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.snow =
    data.snow == "Да!"
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.potencChecing =
    data.potencChecing == "Не указан!"
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;
  colorDate.lastActivityOfCustomer =
    data.lastActivityOfCustomer == "Не привязан!"
      ? `<b style = "color: brown;">`
      : `<b style = "color: darkcyan;">`;

  const commonResult = `
	<p style = "text-decoration: underline;"><b>Свод по клиенту ${codeOfCustomer}:</b></p>
	<ul>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldebSumm"><label for="labeldebSumm"> ПДЗ сумм:</label> 
  ${colorDate.debSumm}
	${
    typeof data.debSumm == "number"
      ? (data.debSumm = data.debSumm.toFixed(2))
      : (data.debSumm = data.debSumm)
  }</b>
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldebDays"><label for="labeldebDays"> ПДЗ дней:</label>
  ${colorDate.debDays} 
	${data.debDays}</b>
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelcash"><label for="labelcash"> Рубликов:</label> 
	${colorDate.cash} 
	${
    typeof data.cash == "number"
      ? (data.cash = data.cash.toFixed(2))
      : (data.cash = data.cash)
  }</b>
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelbascket"><label for="labelbascket"> В корзине:</label> 
	${colorDate.basket} 
	${
    typeof data.basket == "number"
      ? (data.basket = data.basket.toFixed(2))
      : (data.basket = data.basket)
  }</b>
	</li>

  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInPurchases"><label for="labeldecreaseInPurchases" title="Процент снижения закупок Хозяйственных товаров 2025 к 2024"> ↓ Хоз:</label> 
	${colorDate.decreaseInPurchases} 
	${
    typeof data.decreaseInPurchases == "number"
      ? (data.decreaseInPurchases = data.decreaseInPurchases.toFixed(2) + "%")
      : (data.decreaseInPurchases = data.decreaseInPurchases)
  }</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInOffice"><label for="labeldecreaseInOffice" title="Процент снижения закупок Офисных товаров 2025 к 2024"> ↓ Офис:</label> 
	${colorDate.decreaseInOffice} 
	${
    typeof data.decreaseInOffice == "number"
      ? (data.decreaseInOffice = data.decreaseInOffice.toFixed(2) + "%")
      : (data.decreaseInOffice = data.decreaseInOffice)
  }</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInPaper"><label for="labeldecreaseInPaper" title="Процент снижения закупок Бумаги 2025 к 2024"> ↓ Бумага:</label> 
	${colorDate.decreaseInPaper} 
	${
    typeof data.decreaseInPaper == "number"
      ? (data.decreaseInPaper = data.decreaseInPaper.toFixed(2) + "%")
      : (data.decreaseInPaper = data.decreaseInPaper)
  }</b>
	</li>
  

  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInChemistry"><label for="labeldecreaseInChemistry" title="Процент снижения закупок Бытовой химии 2025 к 2024"> ↓ Быт.химия:</label> 
	${colorDate.decreaseInChemistry} 
	${
    typeof data.decreaseInChemistry == "number"
      ? (data.decreaseInChemistry = data.decreaseInChemistry.toFixed(2) + "%")
      : (data.decreaseInChemistry = data.decreaseInChemistry)
  }</b>
	</li>
  
  
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInParfum"><label for="labeldecreaseInParfum" title="Процент снижения закупок Косметики 2025 к 2024"> ↓ Косметика:</label> 
	${colorDate.decreaseInParfum} 
	${
    typeof data.decreaseInParfum == "number"
      ? (data.decreaseInParfum = data.decreaseInParfum.toFixed(2) + "%")
      : (data.decreaseInParfum = data.decreaseInParfum)
  }</b>
	</li>


  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInFood"><label for="labeldecreaseInFood" title="Процент снижения закупок Продуктов питания 2025 к 2024"> ↓ Бакалея:</label> 
	${colorDate.decreaseInFood} 
	${
    typeof data.decreaseInFood == "number"
      ? (data.decreaseInFood = data.decreaseInFood.toFixed(2) + "%")
      : (data.decreaseInFood = data.decreaseInFood)
  }</b>
	</li>

  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labeldecreaseInOrgtech"><label for="labeldecreaseInOrgtech" title="Процент снижения закупок Оргтехники 2025 к 2024"> ↓ Оргтехника:</label> 
	${colorDate.decreaseInOrgtech} 
	${
    typeof data.decreaseInOrgtech == "number"
      ? (data.decreaseInOrgtech = data.decreaseInOrgtech.toFixed(2) + "%")
      : (data.decreaseInOrgtech = data.decreaseInOrgtech)
  }</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelpotenc"><label for="labelpotenc"> Потенциал:</label> 
	${colorDate.potencChecing}${data.potencChecing}</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labellastActivityOfCustomer"><label for="labellastActivityOfCustomer"> Посещение ИМ:</label>
	${colorDate.lastActivityOfCustomer}${data.lastActivityOfCustomer}</b>
	</li>
	`;
  // console.log(data.decreaseInOffice);
  checkDescription.innerHTML = commonResult;

  return commonResult;
};

// Очищаем инпут serchData и сразу вставляем данные нового клиента

serchData.addEventListener("click", (event) => {
  serchData.value = "";

  // navigator.clipboard.readText()
  // .then(text => {
  //   serchData.value = text;
  //   textOutput.innerHTML = getDataOfCustomers(serchData.value);
  //   enterName.value = serchData.value;
  // })
  // .catch(err => {
  //   // возможно, пользователь не дал разрешение на чтение данных из буфера обмена
  //   console.log('Something went wrong', err);
  // });
});

// клик на кнопку
checkResultButton.addEventListener("click", (event) => {
  if (serchData.value == "") {
    checkDescription.innerHTML = "Получи свод по клиенту:";
  } else {
    const blankOfClient = document.getElementById("blankOfClient");
    blankOfClient.href = `https://www.officemag.ru/desk/clients/okt/detail.php?CODE=dmd${serchData.value}`;
    textOutput.innerHTML = getDataOfCustomers(serchData.value);
    enterName.value = serchData.value;
  }
});
// жмак на Enter
const pushEnter = (choiseCode) => {
  textOutput.innerHTML = getDataOfCustomers(choiseCode);
  enterName.value = choiseCode;
};

serchData.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (serchData.value == "") {
      checkDescription.innerHTML = "Получи свод по клиенту:";
    } else {
      pushEnter(serchData.value);

      // textOutput.innerHTML = getDataOfCustomers(serchData.value);
      // enterName.value = serchData.value;
    }
  }
});

// Строим список скриптов в зависимости от ПОДРАЗДЕЛЕНИЯ
function fillInTheListOfScripts() {
  listScript.innerHTML = "";
  for (clientStatus in ObjClientStatus) {
    newClientStatus = document.createElement("li");
    newClientStatus.id = clientStatus;
    newClientStatus.className = "status";
    newClientStatus.innerText = ObjClientStatus[clientStatus];
    // убираем в левом меню статусы, которые не соответствуют выбранному каналу сбыта
    newClientStatus.style.display =
      subDivisionAndstatusScripts[firstSubDivision]["status-scripts"][
        clientStatus
      ] != undefined
        ? "block"
        : "none";
    // вешаем клик на сценарии контакта
    newClientStatus.addEventListener("click", function (event) {
      greetings.style.display = "none"; // убираем строку с приветствием
      document.getElementById("objections").style.display = "flex";
      preparation.style.display = "none"; // убираем блок подготовки к контакту
      // getFromOrder.style.display = "none"; // убираем фильтры по клиентам
      preferBlock.style.display = "none"; // убираем фильтры по звонкам
      getOfClients.style.display = "none"; // убираем фильтры по клиентам
      rightBar.style.display = "flex";
      previousElement.style.color = "currentcolor";
      event.target.style.color = "brown";
      previousElement = event.target;
    });
    listScript.append(newClientStatus);
  }
}
// /Строим список скриптов в зависимости от подканала сбыта
// блок ввода Имени Клиента
enterName.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    clientName = enterName.value;
    inputName.style.display = "none";
    if (contactScripts.childElementCount < 1) {
      greetings.innerHTML = "Выберите статус клиента в колонке слева!";
      greetings.style.display = "";
    }
  }
});
// оформляем кнопки подготовки к контакту. Вешаем клик на кнопку СТАТУСА
btnBarSubDivision.addEventListener("click", function (event) {
  loader.style = "display: inline-block;";
  many.style.display = "none";
  heart.style.display = "block";
  progress.style.float = "inherit";
  now_status = event.target.value;

  if (event.target.className != "btn-bar") {
    changeOfDivision(event.target.value);
  }
});

i = 0;
for (subDivision in subDivisionAndstatusScripts) {
  if (i < 1) {
    keySubDivision = subDivision;
    firstSubDivision = subDivision;
  }
  newDivSubDivision = document.createElement("button");
  newDivSubDivision.id = "btn-sub-division_" + subDivision;
  newDivSubDivision.className =
    i > 0 ? "btn_sub-division" : "btn_sub-division btn_selected";
  newDivSubDivision.value = subDivision;
  newDivSubDivision.innerHTML = subDivisionAndstatusScripts[subDivision].name;
  btnBarSubDivision.append(newDivSubDivision);
  i++;
}
for (let index = 0; index < buttonPrep.length; index++) {
  buttonPrep[index].addEventListener("click", function (event) {
    const doNotMakeContactBlockId = document.getElementById(
      "doNotMakeContactBlock"
    );
    doNotMakeContactBlockId.innerHTML = "";
    preparationPlanBlock.innerHTML = "";
    preparationPlan[event.target.id].forEach((el) => {
      const elemPrep = document.createElement("li");
      elemPrep.innerHTML = el;
      preparationPlanBlock.append(elemPrep);
    });
    doNotMakeContactBlockId.innerHTML = doNotMakeContact[event.target.id];
    preferBlock.style.display = "none";
  });
}
// строим блок с возражениями.
Object.keys(objections).forEach((el, index) => {
  const button = document.createElement("button");
  button.className = "objections";
  button.id = `objections_${index}`;
  button.innerText = el;
  const objections = document.getElementById("objections");
  objections.append(button);
});
// строим блок с презентациями.
for (objPresentationsUrgentScripts of arrPresentationsUrgentScripts) {
  const newButton = document.createElement("button");
  newButton.className = "presentationsUrgentScripts";
  newButton.value = objPresentationsUrgentScripts["arr_sub-division"];
  newButton.style.display = "none";
  // newButton.style.width = "100px";
  newButton.innerText = objPresentationsUrgentScripts["title"];
  urgentScripts.append(newButton);
}
// /строим блок с презентациями.
// Не обязательная презентация.
listPresentations.innerHTML = "";
for (ObjPresentations of arrObjPresentations) {
  newPresentation = document.createElement("button");
  newPresentation.className = "presentations";
  newPresentation.value = ObjPresentations["status"];
  newPresentation.innerHTML = ObjPresentations["title"];
  listPresentations.append(newPresentation);
  // objections.style.display='none';
}
// вешаем попап на кнопку возражений
const objectionsCollection = document.getElementsByClassName("objections");
for (let index = 0; index < objectionsCollection.length; index++) {
  objectionsCollection[index].addEventListener("click", function (event) {
    popupOperation();
    textOutput.innerHTML = objections[event.target.innerText];
  });
}
// вешаем попап на кнопку презентаций
const presentationsCollection = [
  presentationsUrgentScriptsClass,
  presentationsPotenzClass,
  presentationsClass,
];
// Простое решение которое надо было использовать сразу.
textOutput.addEventListener("click", function (event) {
  if (event.target.id != "OSS") {
    popupOperation();
    const OSS = document.getElementById("OSS");
    OSS.innerHTML = onlineStoreServices[event.target.id];
  }
});
// /Простое решение которое надо было использовать сразу.
presentationsCollection.forEach((el) => {
  for (let index = 0; index < el.length; index++) {
    el[index].addEventListener("click", function (event) {
      popupOperation();
      if (event.target.className == "presentationsUrgentScripts") {
        textOutput.innerHTML =
          `<b>${clientName}</b>` +
          ", " +
          presentationsUrgentScripts[event.target.innerText];
        // вешаем попап на сервисы
        for (let index = 0; index < Services.length; index++) {
          Services[index].addEventListener("click", function (event) {
            popupOperation();
            const OSS = document.getElementById("OSS");
            OSS.innerHTML = onlineStoreServices[event.target.id];

            for (let index = 0; index < Services.length; index++) {
              Services[index].addEventListener("click", function (event) {
                popupOperation();
                const OSS = document.getElementById("OSS");
                OSS.innerHTML = onlineStoreServices[event.target.id];
              });
            }
          });
        }
      }
      if (event.target.className == "presentations") {
        for (ObjPresentations of arrObjPresentations) {
          if (ObjPresentations["title"] == event.target.innerHTML) {
            textOutput.innerHTML =
              ObjPresentations["sub_presentations"] == true
                ? '<span id="OSS">' + ObjPresentations["content"] + "</span>"
                : (textOutput.innerHTML = ObjPresentations["content"]);
          }
        }
        // вешаем попап на сервисы
        for (let index = 0; index < Services.length; index++) {
          Services[index].addEventListener("click", function (event) {
            popupOperation();
            const OSS = document.getElementById("OSS");
            OSS.innerHTML = onlineStoreServices[event.target.id];
          });
        }
      }
    });
  }
});
// выводим нужный сценарий контакта на экран

// АВТОРИЗАЦИЯ сотрудника

userData.addEventListener("click", (event) => {
  userLink.href = `file:///C:/Users/dolzhenko/Documents/GitHub/Simulator-of-negotiations-with-clients-SPK-/index.html?fio_person=${userData.firstChild.textContent}&position_person=${userData.lastChild.textContent}`;
});

////////////////////////

// Клики на пункты скрипта
listScript.addEventListener("click", function (event) {
  header.style = "display: none;";
  header_tools.style = "display: flex";

  let x = 0; // переменная для процента выполнения скрипта
  // console.log(dialogueStructure);

  // 100% checking

  fullCheck.addEventListener("click", (event) => {
    if (contactScripts.innerHTML != "" && fullCheck.checked == true) {
      const includesOfScript = contactScripts.querySelectorAll("li");
      for (let elem of includesOfScript) {
        // console.log(elem);
        elem.style.color = "tomato";
        dialogueStructure[elem.id] = "+";
      }
      x = 100;
      progress_bar_span.innerHTML = `${x}%`;
      progress_bar_color.style = `width: ${x}%;`;
      many.style = "display: block; position: absolute; right: -50px;";
      heart.style.display = "none";
    } else {
      const includesOfScript = contactScripts.querySelectorAll("li");
      for (let elem of includesOfScript) {
        // console.log(elem);
        elem.style.color = "black";
        dialogueStructure[elem.id] = "-";
      }
      x = 0;
      progress_bar_span.innerHTML = `${x}%`;
      progress_bar_color.style = `width: ${x}%;`;
      many.style.display = "none";
      heart.style.display = "block";
    }
    // console.log(dialogueStructure);
  });

  progress_bar_span.innerHTML = `${x}%`;
  progress_bar_color.style = `width: ${x}%;`;
  send.style.display = "block";
  send.disabled = false;

  const objections = document.getElementById("objections");
  thisStatus = event.target.innerText;

  // Вывод скрипта на экран
  if (event.target.id != "list_script") {
    //ОБНУЛЯЕМ ВСЕ ПАРАМЕТРЫ ПРЕДЫДУЩЕГО СКРИПТА

    contactScripts.innerHTML = "";
    contactScripts.style.display = "block";
    many.style.display = "none";
    heart.style.display = "block";
    dialogueStructure = {};
    fullCheck.checked = false;

    if (content.style.justifyContent != "space-between") {
      content.style.justifyContent = "space-between";
    }
    i = 0;
    if (
      subDivisionAndstatusScripts[keySubDivision]["status-scripts"][
        event.target.id
      ] != undefined
    ) {
      let liId = 0;

      /// ВЫВОД скрипта из БАЗЫ

      console.log("ВЫВОД скрипта из БАЗЫ");

      const getDataFromBack = {
        status_name: event.target.innerText,
        channel_name: keySubDivision,
        priority: 1,
      };

      const getScriptsByParams = async (filters = {}) => {
        try {
          // Создаем query строку из фильтров
          const queryParams = new URLSearchParams();

          // Добавляем только те параметры, которые есть в filters
          if (filters.status_name)
            queryParams.append("status_name", filters.status_name);
          if (filters.channel_name)
            queryParams.append("channel_name", filters.channel_name);
          if (filters.priority)
            queryParams.append("priority", filters.priority);
          if (filters.order) queryParams.append("order", filters.order);

          const queryString = queryParams.toString();
          const url = queryString
            ? `http://89.111.172.208:3008/api/scripts?${queryString}`
            : "/api/scripts";

          console.log("Fetching from URL:", url);

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const scripts = await response.json();
          scripts.forEach((element) => {
            // console.log(element.content);
          });

          scripts.forEach((el) => {
            console.log("keySubDivision - ", event.target.innerText);
            // console.log("subDivisionAndstatusScripts - ", subDivisionAndstatusScripts);
            const newLiScript = document.createElement("li");
            // присваиваем Id каждому пункту скрипта
            newLiScript.id = liId;
            // dialogueStructure[clientStatusForSend] = newLiScript.id;
            dialogueStructure[newLiScript.id] = "-";
            newLiScript.innerHTML =
              i % 2 == 0
                ? `<b>${clientName}, </b>` + el.content
                : el.content[0].toUpperCase() + el.content.slice(1);
            contactScripts.append(newLiScript);

            i++;

            // ниже - скрипт отвечающий за прогресс-бар и изменение цвета пунктов скрипта, по которым кликнули

            newLiScript.addEventListener("click", function (event) {
              fullCheck.checked = false;
              if (newLiScript.style.color != "tomato") {
                progress_bar_span.innerHTML = `${Math.round(
                  (x += progress_counter)
                )}%`;
                newLiScript.style.color = "tomato";
                dialogueStructure[newLiScript.id] = "+";
              } else {
                progress_bar_span.innerHTML = `${Math.round(
                  (x -= progress_counter)
                )}%`;
                newLiScript.style.color = "black";
                dialogueStructure[newLiScript.id] = "-";
              }
              progress_bar_color.style = `width: ${x}%;`;
              if (x > 70) {
                many.style =
                  "display: block; position: absolute; right: -50px;";
                heart.style.display = "none";
                progress.style.float = "Left";
              } else {
                many.style.display = "none";
                heart.style.display = "block";
                progress.style.float = "inherit";
              }
              // console.log(x);
            });

            liId++; // увеличиваем Id на единицу
          });

          progress_counter = 100 / contactScripts.children.length;

          // console.log(
          //   "contactScripts.children.length - ",
          //   contactScripts.children.length
          // );

          return scripts;
        } catch (error) {
          console.error("Ошибка при получении скриптов:", error);
          return [];
        }
      };

      getScriptsByParams(getDataFromBack);

      /// НАЧАЛО вывода СКРИПТА
      // for (scriptPoint of subDivisionAndstatusScripts[keySubDivision][
      //   "status-scripts"
      // ][event.target.id]) {
      //   // console.log("keySubDivision - ", keySubDivision);
      //   // console.log("subDivisionAndstatusScripts - ", subDivisionAndstatusScripts);
      //   const newLiScript = document.createElement("li");
      //   // присваиваем Id каждому пункту скрипта
      //   newLiScript.id = liId;
      //   // dialogueStructure[clientStatusForSend] = newLiScript.id;
      //   dialogueStructure[newLiScript.id] = "-";
      //   newLiScript.innerHTML =
      //     i % 2 == 0
      //       ? `<b>${clientName}, </b>` + scriptPoint
      //       : scriptPoint[0].toUpperCase() + scriptPoint.slice(1);
      //   contactScripts.append(newLiScript);

      //   i++;

      //   // ниже - скрипт отвечающий за прогресс-бар и изменение цвета пунктов скрипта, по которым кликнули

      //   newLiScript.addEventListener("click", function (event) {
      //     fullCheck.checked = false;
      //     if (newLiScript.style.color != "tomato") {
      //       progress_bar_span.innerHTML = `${Math.round(
      //         (x += progress_counter)
      //       )}%`;
      //       newLiScript.style.color = "tomato";
      //       dialogueStructure[newLiScript.id] = "+";
      //     } else {
      //       progress_bar_span.innerHTML = `${Math.round(
      //         (x -= progress_counter)
      //       )}%`;
      //       newLiScript.style.color = "black";
      //       dialogueStructure[newLiScript.id] = "-";
      //     }
      //     progress_bar_color.style = `width: ${x}%;`;
      //     if (x > 70) {
      //       many.style = "display: block; position: absolute; right: -50px;";
      //       heart.style.display = "none";
      //       progress.style.float = "Left";
      //     } else {
      //       many.style.display = "none";
      //       heart.style.display = "block";
      //       progress.style.float = "inherit";
      //     }
      //     // console.log(x);
      //   });

      //   liId++; // увеличиваем Id на единицу
      // }

      /// ОКОНЧАНИЕ вывода СКРИПТА

      //if(){
      // ВЫВОД КНОПОК ПРЕЗЕНТАЦИИ
      for (presentationsUrgentScript of urgentScripts.children) {
        presentationsUrgentScript.style.display = "";
        if (!presentationsUrgentScript.value.includes(keySubDivision)) {
          presentationsUrgentScript.style.display = "none";
        }
      }
      //}
      for (presentat of listPresentations.children) {
        presentat.style.display = "";
        // УБИРАЕМ ЛИШНИЕ КНОПКИ ПРЕЗЕНТАЦИИ
        if (!presentat.value.includes(event.target.id)) {
          presentat.style.display = "none";
        }
      }
    } else {
      contactScripts.innerHTML = "Такого сценария пока нет.";
    }
    const employeeName = document.getElementById("employeeName");
    employeeName.innerText = userData.firstChild.textContent.split(" ")[1];
  }
  // progress_counter = 100 / contactScripts.children.length;

  // console.log("contactScripts.children.length - ", contactScripts.children.length);

  // ОТПРАВКА РЕЗУЛЬТАТОВ

  // Функция для отправки результатов на сервер
  const sendResult = async (dataToSend) => {
    await fetch(
      `http://91.236.199.173:${PORT}/api/v1/dialogues`,
      // `http://127.0.0.1:3001/api/v1/dialogues`,
      // `http://89.111.172.208:3001/api/v1/dialogues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
  };

  // ДЕЙСТВИЕ ПО ОТПРАВКЕ РЕЗУЛЬТАТОВ
  send.addEventListener("click", (event) => {
    event.preventDefault();

    const dataToSend = {
      fio: userData.firstChild.textContent,
      jobTitle: userData.lastChild.textContent,
      dataClient: clientName,
      subDiv: keySubDivision,
      dataStatus: thisStatus,
      progress: x.toFixed(),
      questions: JSON.stringify(dialogueStructure),
    };

    // Отправляем результаты, если progress не 0 !!!
    // dataToSend.progress != 0 ? sendResult(dataToSend) : false;

    if (
      dataToSend.progress != 0 &&
      userData.textContent != "Имя оператора" &&
      x != 0
    ) {
      sendResult(dataToSend)
        .then((value) => {
          messageFromBase("Данные отправлены!");

          loader.style = "display: none;";
          x = 0; // переменная для процента выполнения скрипта
          contactScripts.style.color = "black";
          progress_bar_span.innerHTML = `${x}%`;
          progress_bar_color.style = `width: ${x}%;`;
          send.disabled = true;
          inputName.style.display = "block";
          inputName.style.position = "fixed";
          inputName.style.zIndex = "2";
          inputName.style.background = "antiquewhite";

          document.getElementById("enterName").placeholder = "Имя клиента";
          document.getElementById("enterName").value = "";
          document
            .querySelectorAll("li")
            .forEach((el) => (el.style.color = "black"));

          // console.log("It's allright!");
        })
        .catch((e) => {
          messageFromBase("Подключение к базе отсутствует!");
          // console.log("Connection error!");
        });
    }
  });
});

// строим основную страницу и левое меню
function homePage() {
  sectionTitle.innerHTML += `Сценарии контакта`;
  fillInTheListOfScripts();
}

// Проверка на сотрудника

async function getDataOfEmployee(person) {
  let response = await fetch(
    `http://91.236.199.173:3001/api/v1/employee?person=${person}`
    // `http://127.0.0.1:3001/api/v1/employee?person=${person}`
    // `http://89.111.172.208:3001/api/v1/employee?person=${person}`
  );

  const employeeSearch = await response.json();

  return employeeSearch;
}

// Сравнение фио из базы и фио из URL
let matchingEmployee = (param, result) => {
  if (param == result) {
    return true;
  } else {
    return false;
  }
};

const person = new URLSearchParams(window.location.search).get("person");

param != "Долженко Андрей Александрович"
  ? (updatePlace.style.display = "none")
  : true;

getDataOfEmployee(person).then((result) =>
  console.log(matchingEmployee(param, result))
);

// Если вход не через СДО
getDataOfEmployee(person).then((result) => {
  const matchingResult = matchingEmployee(param, result);
  if (param === null || matchingResult == false) {
    matchingResult == false
      ? (userData.innerHTML = `Нет такого пользователя в базе.<br>Войдите в программу через портал СДО!`)
      : (userData.innerHTML = "Войдите в программу через портал СДО!");
    document.getElementById("instructions").style.display = "none";
    checkDescription.style.display = "none";
    clientsName.style.display = "none";
    clientsName_0.style.display = "none";
  } else {
    homePage();
    paramsString = document.location.search;
    searchParams = new URLSearchParams(paramsString);
    userData.innerHTML = `${searchParams.get(
      "fio_person"
    )}<br>${searchParams.get("position_person")}`;
    switch (userData.lastChild.textContent) {
      case "Оператор клиентской базы по региону г. Москва и Московской области":
        changeOfDivision("SMB");

        break;

      case "Оператор клиентской базы крупного бизнеса по региону г. Москва и Московской области":
        changeOfDivision("KB");
        break;

      case "Специалист по развитию стратегических клиентов по региону г. Москва и Московской области":
        changeOfDivision("SRK");
        break;

      case "Специалист по развитию ключевых клиентов по региону г.Москва и Московской области":
        changeOfDivision("SRK");
        break;

      case "GOS": // if (x === 'value2')
        break;

      case "OPS": // if (x === 'value2')
        break;

      default:
        changeOfDivision("SMB");
        break;
    }

    Object.values(employeesesListAdmin).map((el) => {
      if (userData.lastChild.textContent == el) {
        document.getElementById("registration_button").style.display = "inline";
        getEmployeesSchow.style.display = "inline";
        getEmployeesSchow.addEventListener("click", (event) => {
          allEmployees("all");
        });
      } else {
      }
    });
  }
});

// homePage();

// Функция для получения всех сотрудников

const allEmployees = async () => {
  let response = await fetch(
    `http://91.236.199.173:3001/api/v1/employees`
    // `http://127.0.0.1:3001/api/v1/employees`
    // `http://89.111.172.208:3001/api/v1/employees`
  );

  let res = await response.json();

  getEmployeesSchow.innerHTML = `<option disabled selected>Имя сотрудника</option>`;

  // console.log(res);

  res.map((el) => {
    const newOptionItem = document.createElement("option");
    newOptionItem.value = el;
    newOptionItem.innerText = el;
    getEmployeesSchow.append(newOptionItem);
  });

  getEmployeesSchow.addEventListener("click", (event) => {
    userData.firstChild.textContent = getEmployeesSchow.value;
  });
};

/*

ОЗОН + Снегурочка из строки 324

<li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelosonCanc"><label for="labelosonCanc"> ОЗОН (канц):</label>   
	${colorDate.osonCanc}${data.osonCanc}</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelosonChos"><label for="labelosonChos"> ОЗОН (хоз):</label> 
	${colorDate.osonChos}${data.osonChos}</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelosonProd"><label for="labelosonProd"> ОЗОН (прод):</label>
	${colorDate.osonProd}${data.osonProd}</b>
	</li>

  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelsnow"><label for="labelsnow" title = 'Потенциальный участник акции по бумаге "Снегурочка"'> Снегурочка:</label>
	${colorDate.snow}${data.snow}</b>
	</li>
  */
