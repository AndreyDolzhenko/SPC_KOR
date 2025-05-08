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
const userLink = document.getElementById("userLink");
const registration = document.getElementById("registration");
const header_tools = document.getElementById("header_tools");

const popupOpen = document.getElementById("popup1"); // поле попапа
const textOutput = document.getElementById("popup1_txt"); // текстовое поле для попапа
let popupClose = document.getElementById("popup1_close"); // элемент (крестик) для закрытия попапа

let keySubDivision;
let firstSubDivision;
let previousElement = listScript;
let progress_counter;

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

// Функция для получения данных о клиенте

function getDataOfCustomers(codeOfCustomer) {
  fetch(
    `http://91.236.199.173:${3001}/api/v1/customers?codeOfCustomer=${codeOfCustomer}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

const commonResultOfChecking = () => {
  clientsName.innerText = informationOutput(clientsNames);
  clientsName_0.innerText = informationOutput(clientsNames);

  const commonResult = `
	<p style = "text-decoration: underline;"><b>Свод по клиенту ${
    serchData.value
  }:</b></p>
	<ul>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox"> ПДЗ сумм: 
  <b style = "color: brown;">
	${informationOutput(debtSumm)}</b>;
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox"> ПДЗ дней:
  <b style = "color: brown;"> 
	${informationOutput(debtDays)}</b>;
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox"> Рубликов: 
	<b style = "color: brown;"> 
	${informationOutput(cash)}</b>;
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox"> В корзине: 
	<b style = "color: brown;"> 
	${informationOutput(basket)}</b>;
	</li>
	<li class = "commonResult"> <input type="checkbox" class = "checkbox"> ОЗОН(канц): 
	${
    checkForAvailability(osonCanc) == 1
      ? `<b style = "color: brown;"> Да!</b>`
      : `<b style = "color: brown;"> Нет.</b>`
  }
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox"> ОЗОН(хоз): 
	${
    checkForAvailability(osonChos) == 1
      ? `<b style = "color: brown;"> Да!</b>`
      : `<b style = "color: brown;"> Нет.</b>`
  }
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox"> ОЗОН(прод):
	${
    checkForAvailability(osonProd) == 1
      ? `<b style = "color: brown;"> Да!</b>`
      : `<b style = "color: brown;"> Нет.</b>`
  }
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox"> Потенциал: 
	${
    checkForAvailability(potencChecing) == 1
      ? `<b style = "color: brown;">указан.</b>`
      : `<b style  = "color: red;"> НЕ указан!</b>`
  }
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox"> Учётная запись клиента
	${
    checkForAvailability(accountLinked) == 1
      ? `<b style = "color: brown;"> привязана!</b>`
      : `<b style  = "color: red;"> НЕ привязана!</b>`
  }
	</li>
	`;

  checkDescription.innerHTML = commonResult;

  getDataOfCustomers(serchData.value);

  return commonResult;
};

// клик на кнопку
checkResultButton.addEventListener("click", (event) => {
  //   popupOperation();
  textOutput.innerHTML = commonResultOfChecking();
});
// жмак на Enter
serchData.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    if (serchData.value == "") {
      checkDescription.innerHTML = "Получи свод по клиенту:";
    } else {
      // popupOperation();
      textOutput.innerHTML = commonResultOfChecking();
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

listScript.addEventListener("click", function (event) {
  header.style = "display: none;";
  header_tools.style = "display: flex";
  // loader.style = 'display: none;';
  // registration.style = 'display: none';
  let x = 0; // переменная для процента выполнения скрипта
  progress_bar_span.innerHTML = `${x}%`;
  progress_bar_color.style = `width: ${x}%;`;
  send.style.display = "block";
  send.disabled = false;

  const objections = document.getElementById("objections");
  thisStatus = event.target.innerText;

  // now_status == 'OPS' ? objections.style.display = 'none' : true;
  if (event.target.id != "list_script") {
    contactScripts.innerHTML = "";
    contactScripts.style.display = "block";
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
      for (scriptPoint of subDivisionAndstatusScripts[keySubDivision][
        "status-scripts"
      ][event.target.id]) {
        const newLiScript = document.createElement("li");
        // присваиваем Id каждому пункту скрипта
        newLiScript.id = liId;
        // dialogueStructure[clientStatusForSend] = newLiScript.id;
        dialogueStructure[newLiScript.id] = "-";
        newLiScript.innerHTML =
          i % 2 == 0
            ? `<b>${clientName}, </b>` + scriptPoint
            : scriptPoint[0].toUpperCase() + scriptPoint.slice(1);
        contactScripts.append(newLiScript);

        i++;
        // ниже - скрипт отвечающий за прогресс-бар и изменение цвета пунктов скрипта, по которым кликнули
        newLiScript.addEventListener("click", function (event) {
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
            many.style = "display: block; position: absolute; right: -50px;";
            progress.style.float = "Left";
          } else {
            many.style.display = "none";
            progress.style.float = "inherit";
          }
        });

        liId++; // увеличиваем Id на единицу
      }
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
  progress_counter = 100 / contactScripts.children.length;

  // ОТПРАВКА РЕЗУЛЬТАТОВ

  // Функция для отправки результатов на сервер
  const sendResult = async (dataToSend) => {
    await fetch(`http://91.236.199.173:${PORT}/api/v1/dialogues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
  };

  // ДЕЙСТВИЕ ПО ОТПРАВКЕ РЕЗУЛЬТАТОВ
  send.addEventListener("click", (event) => {
    // console.log(x);

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

          console.log("It's allright!");
        })
        .catch((e) => {
          messageFromBase("Подключение к базе отсутствует!");
          console.log("Connection error!");
        });
    }
  });
});

// строим основную страницу и левое меню
function homePage() {
  sectionTitle.innerHTML += `Сценарии контакта`;
  fillInTheListOfScripts();
}

// Если вход не через СДО
if (param === null) {
  userData.innerHTML = "Войдите в программу через портал СДО!";
  document.getElementById("instructions").style.display = "none";
} else {
  homePage();
  paramsString = document.location.search;
  searchParams = new URLSearchParams(paramsString);
  userData.innerHTML = `${searchParams.get("fio_person")}<br>${searchParams.get(
    "position_person"
  )}`;
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
      document.getElementById("registration_button").style.display = "block";
    }
  });
}

// homePage();
