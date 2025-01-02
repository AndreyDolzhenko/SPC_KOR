// Ссылка на получение списка сотрудников:
// https://samson-university.websoft.ru:444/view_doc.html?mode=doc_type&custom_web_template_id=7441843213630862685

const showDialugues = document.getElementById("showDialugues");
const header_right = document.getElementById("header_right");
const buttonClick = document.getElementsByClassName("btn_sub-division");

const popupOpen = document.getElementById("popup1"); // поле попапа
const textOutput = document.getElementById("popup1_txt"); // текстовое поле для попапа
let popupClose = document.getElementById("popup1_close"); // элемент
const dataOfDialogue = document.getElementById("dataOfDialogue");
const sentSelect = document.getElementById("sentSelect");
const formSelect = document.getElementById("formSelect");
const errStatus = document.getElementById("errStatus");
errStatus.style.color = "red";

const listTitle = ["Дата и время", "Оператор", "Клиент", "Канал сбыта", "Статус 1", "Прогресс"];


header_right.style.float = "inline-end";

// Экспорт в EXCEL
var tableToExcel = (function () {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

  return function (table, name) {
    let nextOl = document.querySelectorAll("ol");
    for (let index = 0; index < nextOl.length; index++) {
      const element = nextOl[index];
      element.remove();
    }
    let popup1_txt = document.createElement("ol");
    popup1_txt.id = "popup1_txt";
    popupOpen.append(popup1_txt);
    popupOpen.style.width = "80%";
    popupOpen.style.marginLeft = "100px";
    textOutput.style.fontSize = "18px";

    if (!table.nodeType) table = document.getElementById("listOfDialogues").cloneNode(true)
    notExport = table.querySelectorAll('.not-export');
    for (let i = 0; i < notExport.length; i++) {
      notExport[i].outerHTML = "";
    };
    elemBorder = table.querySelectorAll('TD');
    for (let i = 0; i < elemBorder.length; i++) {
      elemBorder[i].style.border = "1px solid #999";
    }
    //style="border: 1px solid #999;"
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
  }
})();
// /Экспорт в EXCEL


function popupAdmin() {
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


// строим кнопки подканалов сбыта
function btn() {

  const btnBarSubDivision = document.getElementById("btn-bar_sub-division");

  for (subDivision in subDivisionAndstatusScripts) {

    newDivSubDivision = document.createElement('button');
    newDivSubDivision.style.margin = "5px";
    newDivSubDivision.id = "btn-sub-division_" + subDivision;
    newDivSubDivision.className = "btn_sub-division";
    newDivSubDivision.value = subDivision;
    newDivSubDivision.innerHTML = subDivisionAndstatusScripts[subDivision].name;
    btnBarSubDivision.append(newDivSubDivision);

  };
}

btn();

// Функция получения ВСЕХ результатов с сервера

let getRes;

const getDataOfDialogues = () => {
  fetch(`http://89.111.172.208:${PORT}/api/v1/dialogues/`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      buildingTable(data);
      getRes = data;
      // console.log(getRes);
    })

}

// !!! Функция демонстрации диалогов на странице по фильтру
const choiseDialogues = (choiseSubDiv) => {

  fetch(`http://89.111.172.208:${PORT}/api/v1/dialogues/select?subDiv=${choiseSubDiv}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      buildingTable(data);

    })
}

fetch(`http://89.111.172.208:${PORT}/api/v1/dialogues/`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getRes = data;
    // console.log(getRes);
  })

const actualStatus = document.querySelectorAll("btn_sub-division");
const userData = document.getElementById("userData");
const button = document.getElementById("registration_button");
const oneOfParams = document.getElementById("oneOfParams");
const getSelect = document.getElementsByClassName("getSelect");

// функция для заполнения атрибута section

function fillingData(id, data, placeName) {
  const place = document.getElementById(id);
  place.innerHTML = `<option selected value="старт">${placeName}</option>`;

  Object.entries(data).map(el => {
    const newOption = document.createElement("option");
    newOption.innerHTML = el[1];
    place.append(newOption);
  });
}

// функция для подготовки параметров фильтрации
const buildSelect = (criterion) => {
  let listElem = [];
  if (criterion == "createdAt") {
    let sliceData = [];
    getRes.map(el => sliceData.push(el[criterion].slice(0, -9)));
    sliceData.map(el => listElem.includes(el) == false ? listElem.push(el) : false);
  } else {
    getRes.map(el => listElem.includes(el[criterion]) == false ? listElem.push(el[criterion]) : false);
  }

  return listElem.sort();
}
// заполнение секция параметрами фильтрации по нажатию кнопки "Получить фильтры"
showDialugues.addEventListener("click", () => {
  fillingData("subDivList", buildSelect("subDiv"), "отдел");
  fillingData("dateListFrom", buildSelect("createdAt"), "дата с");
  fillingData("dateListTo", buildSelect("createdAt"), "дата по");
  fillingData("nameList", buildSelect("fio"), "фио");
  fillingData("statusList", buildSelect("dataStatus"), "статус 1");
});

// выбор только одного параметра

for (let index = 0; index < getSelect.length; index++) {
  if (getSelect[index].name != "dateList") {
    getSelect[index].addEventListener("change", (event) => {
      // console.log(event.target.name);
      for (let index = 0; index < getSelect.length; index++) {
        if (getSelect[index].name != "dateList") {
          event.target.name != getSelect[index].name ? getSelect[index].value = "старт" : false;
          // console.log(getSelect[index].value);
        }
      };
    });
  }
}

const dateListFrom = document.getElementById("dateListFrom");
const dateListTo = document.getElementById("dateListTo");

// отправка фильтров и получение данных по фильтрам
sentSelect.addEventListener("click", (event) => {

  const currentDate = new Date().toISOString().slice(0, -14);
  // console.log(currentDate);
  // присваиваем по умолчанию ТЕКУЩУЮ ДАТУ
  dateListFrom.value == "старт" ? dateListFrom.value = currentDate : true;
  dateListTo.value == "старт" ? dateListTo.value = currentDate : true;


  let sentParams = {};
  for (let index = 0; index < formSelect.length; index++) {
    if (formSelect[index].value != "старт") {
      sentParams[formSelect[index].id] = formSelect[index].value;
      // console.log(formSelect[index].value);
    }


    fetch(`http://89.111.172.208:${PORT}/api/v1/dialogues/params?params[${Object.keys(sentParams)[0]}]=${Object.values(sentParams)[0]}&params[createdAtFrom]=${dateListFrom.value}&params[createdAtTo]=${dateListTo.value}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.length != 0 ? errStatus.innerText = "" : errStatus.innerText = "Данные НЕ найдены!";
        // console.log(data);
        buildingTable(data);

      })
      .catch(err => {        
        console.log(err);        
        errStatus.innerText = "Данные НЕ найдены!";
      })

  }
});


// Вывод полученных данных на экран
const buildingTable = (data) => {
  const listOfDialogues = document.getElementById("listOfDialogues");
  listOfDialogues.innerHTML = "";
  const titleLine = document.createElement("tr");
  // Строим шапку таблицы с данными
  listTitle.map(el => {
    const titleColomn = document.createElement("td");
    titleColomn.style.cursor = "pointer";
    titleColomn.id = el;
    titleColomn.innerHTML = el;
    // Добавляем функцию сортировки диалогов    

    titleLine.append(titleColomn);
  });

  listOfDialogues.append(titleLine);

  data.map(el => {
    const lineOfData = document.createElement("tr");
    for (let index = 0; index < Object.keys(el).length; index++) {
      const columnOfData = document.createElement("td");
      switch (index) {
        case 0:
          columnOfData.innerHTML = el.createdAt;
          lineOfData.append(columnOfData);
          break;

        case 1:
          columnOfData.innerHTML = el.fio;
          lineOfData.append(columnOfData);
          break;

        case 2:
          columnOfData.innerHTML = el.dataClient;
          lineOfData.append(columnOfData);
          break;

        case 3:
          columnOfData.innerHTML = el.subDiv;
          lineOfData.append(columnOfData);
          break;

        case 4:
          columnOfData.innerHTML = el.dataStatus;
          lineOfData.append(columnOfData);
          break;

        case 5:
          columnOfData.innerHTML = el.progress;
          lineOfData.append(columnOfData);
          break;

        default:
          break;
      }
    }

    lineOfData.style.cursor = "pointer";

    // Выводим сценарий по клику на данные о диалоге
    lineOfData.addEventListener("click", (event) => {

      popupAdmin();

      popupOpen.style.width = "80%";
      popupOpen.style.marginLeft = "100px";
      textOutput.style.fontSize = "18px";

      dataOfDialogue.innerText = lineOfData.innerText;

      document.getElementById("popup1_txt").innerHTML = lineOfData.nextSibling.innerHTML;

      document.querySelectorAll("ol").length == 1 ? alert(`Файл Excel возьмите в папке 'Загрузки'. \n Для вывода данных на экран нажмите кнопку подразделения ещё раз!`) : true;

    })

    listOfDialogues.append(lineOfData);

    const dataLiId = Object.values(JSON.parse(el["questions"]));

    // Находим нужный статус по значению в объекте
    let keyStatus = Object.keys(ObjClientStatus).find(k => ObjClientStatus[k] === el.dataStatus);
    const conversation = document.createElement("ol");
    conversation.className = "conversation";

    Object.values(subDivisionAndstatusScripts[el.subDiv]['status-scripts'][keyStatus]).map((el, index) => {
      const oneSpeach = document.createElement("li");
      oneSpeach.style.marginLeft = "20px";
      oneSpeach.className = dataLiId[index];
      oneSpeach.className == "+" ? oneSpeach.style.color = "blue" : oneSpeach.style.color = "red";
      oneSpeach.innerHTML = el;
      conversation.append(oneSpeach);
    })
    // const lineOfText = document.createElement("tr");
    conversation.style.display = "none";
    // lineOfText.append(conversation);
    listOfDialogues.append(conversation);

  });
};

// Ставим на кнопку подразделения ПОЛУЧЕНИЕ ДИАЛОГОВ
for (let index = 0; index < buttonClick.length; index++) {
  buttonAction = buttonClick[index];
  buttonAction.addEventListener("click", (event) => {

    choiseDialogues(buttonClick[index].value);
  });

};

