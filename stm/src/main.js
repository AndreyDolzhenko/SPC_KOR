const timeOption = document.getElementById("block-time_option"); // Блок настройки времени.
const inputTimeTest = document.getElementById("input_time-test"); // Поле с веденным временем.
const timeScroll = document.getElementById("block-time_time-scroll"); // Счетчик времени.
const numberOfCorrectAnswers = document.getElementById(
  "number_of_correct_answers"
); // Цифра правильных ответов.
const numberOfIncorrectAnswers = document.getElementById(
  "number_of_incorrect_answers"
); // Цифра не правильных ответов.
const brand = document.getElementById("brand"); // Блок с брендом.
const description = document.getElementById("description"); // Блок с утвержением к полученному бренде.
const blockItog = document.getElementById("block-itog"); // Блок с итогами.
const itogTbody = document.getElementById("itog-tbody"); // tbody таблицы итогов.
const blockItogInfo = document.getElementById("block-itog_info"); // Блок с дополнительной информацией.
const btnAnswerTrue = document.getElementById("btn_answer-true"); // Кнопка ответа "Правильно".
const btnStart = document.getElementById("btn_start"); // Кнопка "Старт".
const btnAnswerFalse = document.getElementById("btn_answer-false"); // Кнопка ответа "Не правильно".
const price = document.getElementById("price");
const STMValue = document.getElementById("STMValue");
const imgShowClick = document.getElementById("imgShow"); // Контрейнер для картинки с брендом СТМ
const selectPrice = document.getElementById("selectPrice");
const confirmSTM = document.getElementById("confirmSTM");
let choiseResult = {}; //выбор сотрудника в игре Ценовой сегмент

// обработка имени испытуемого
const getByNameValue = document.getElementById("userNameValue");
const getByName = document.getElementById("userName");

let copyArrProductSTM = []; // Клон массива arrProductSTM для удаления из него пунктов.
let resultTest = []; // Результат тестирования.
let counterOfCorrectAnswers = 0; // Счетчиек правильных ответов.
let counterOfIncorrectAnswers = 0; // Счетчиек не правильных ответов.
let counterAnswer = 0; // Счетчик отвеченых вопросов.
let stringBrand = ""; // Бренд.
let stringDescription = ""; // утвержением к полученному бренде.
let stringDescriptionForTheBrand = ""; // Утвержение о полученном бренде.
let timeSpent = 0;
let nameProgramm;

function selectionOfBrandsAndStatements() {
  if (copyArrProductSTM.length == 0) {
    return itog("Вопросы закончились!");
  }
  description.style.color = "darkslateblue"; // Возвращаем цвет случайного оприсания бренда.
  btnAnswerTrue.disabled = false; // Делаем кнопку "Правильно" Активной.
  btnAnswerFalse.disabled = false; // Делаем кнопку "Не правильно" Активной.
  indexBrandsAndStatement = Math.floor(
    0 + Math.random() * copyArrProductSTM.length
  ); // Индекс из диапозона элементов copyArrProductSTM.
  indexStatement = Math.floor(0 + Math.random() * arrProductSTM.length); // Индекс из диапозона элементов arrProductSTM.
  indexRandomness = Math.floor(0 + Math.random() * 2); // Индекс случайного числа (предназначен для увеличения случайного выбора).

  stringBrand = copyArrProductSTM[indexBrandsAndStatement].brand;
  stringDescriptionForTheBrand =
    copyArrProductSTM[indexBrandsAndStatement].description; // Выводим описание к бренд.

  brand.innerText = stringBrand; // Выводим бренд.
  stringDescription =
    indexRandomness == 0
      ? arrProductSTM[indexStatement].description
      : stringDescriptionForTheBrand; // Выводим случайное оприсание бренда.
  description.innerHTML = stringDescription;
  copyArrProductSTM.splice(indexBrandsAndStatement, 1); // Удаляем элемент из массив, что бы он не повтарялся.
}

function selectionOfBrandsAndPrice() {
  if (copyArrProductSTM.length == 0) {
    return itog("Вопросы закончились!");
  }
  description.style.color = "darkslateblue"; // Возвращаем цвет случайного оприсания бренда.

  indexBrandsAndStatement = Math.floor(
    0 + Math.random() * copyArrProductSTM.length
  ); // Индекс из диапозона элементов copyArrProductSTM.
  indexStatement = Math.floor(0 + Math.random() * arrProductSTM.length); // Индекс из диапозона элементов arrProductSTM.
  indexRandomness = Math.floor(0 + Math.random() * 2); // Индекс случайного числа (предназначен для увеличения случайного выбора).

  stringBrand = copyArrProductSTM[indexBrandsAndStatement].imgShow;
  stringDescriptionForTheBrand =
    copyArrProductSTM[indexBrandsAndStatement].description; // Выводим описание к бренд.

  choiseResult = {
    brand: copyArrProductSTM[indexBrandsAndStatement].brand,
    price: copyArrProductSTM[indexBrandsAndStatement].price,
  };

  // brand.innerText=stringBrand;// Выводим бренд.

  STMValue.style.display = "flex";

  const newImg = document.createElement("img");
  newImg.src = stringBrand;
  newImg.style.width = "50%";
  imgShowClick.innerHTML = "";
  imgShowClick.append(newImg);

  stringDescription =
    indexRandomness == 0
      ? arrProductSTM[indexStatement].description
      : stringDescriptionForTheBrand; // Выводим случайное оприсание бренда.
  description.innerHTML = stringDescription;
  copyArrProductSTM.splice(indexBrandsAndStatement, 1); // Удаляем элемент из массив, что бы он не повтарялся.
}

function answerCollaborator(LogicalOperator) {
  objAnswer = {
    brand: stringBrand,
    "real-description": stringDescriptionForTheBrand,
    description: stringDescription,
    "answer-user": LogicalOperator,
  };
  resultTest.push(objAnswer);
  counterAnswer++; // Прибавляем 1 в счетчик отвеченых вопросов.
  if ((stringDescriptionForTheBrand == stringDescription) == LogicalOperator) {
    description.style.color = "green";
    counterOfCorrectAnswers++; // Прибавляем 1 в счетчик правильных ответов.
    numberOfCorrectAnswers.innerText = counterOfCorrectAnswers;
  } else {
    description.style.color = "red"; // Подкрашеваем, неправильный ответ.
    counterOfIncorrectAnswers++; // Прибавляем 1 в счетчик не правильных ответов.
    numberOfIncorrectAnswers.innerText = counterOfIncorrectAnswers;
  }
  btnAnswerTrue.disabled = true; // Делаем кнопку "Правильно" Неантиной.
  btnAnswerFalse.disabled = true; // Делаем кнопку "Не правильно" Неантиной.
}

function fillingOutTheTable() {
  let count = 0;

  for (indexElem in resultTest) {
    let correctChoise = "";
    num = Number(indexElem) + 1;
    trAnswer = document.createElement("tr");
    resulttestAnswerCollaborator = resultTest[indexElem]["answer-user"]
      ? "Правильно"
      : "Не правильно";

    if (nameProgramm == "СТМ") {
      if (
        (resultTest[indexElem]["real-description"] ==
          resultTest[indexElem].description) ==
        resultTest[indexElem]["answer-user"]
      ) {
        trAnswer.className = ".itog_correct-answer"; // Класс на стрку при правильном ответе.
        correctChoise = "Да";
      } else {
        trAnswer.className = "itog_incorrect-answer"; // Класс на стрку при не правильном ответе.
        correctChoise = "Нет";
      }
    }
    // Заполнение таблицы при Ценовом сегменте
    if (nameProgramm == "Ценовой<br>сегмент") {
      if (
        resultTest[indexElem]["real-description"] ==
        resultTest[indexElem]["answer-user"]
      ) {
        trAnswer.className = ".itog_correct-answer"; // Класс на стрку при правильном ответе.
        correctChoise = "Да";
      } else {
        trAnswer.className = "itog_incorrect-answer"; // Класс на стрку при не правильном ответе.
        correctChoise = "Нет";
      }
      const classChoise = document.getElementsByClassName("table-itog_answer");
      for (let index = 1; index < classChoise.length; index++) {
        classChoise[index].innerHTML = "";
      }
    }

    const stmPicture = document.createElement("img");
    stmPicture.src = resultTest[indexElem].brand;

    trAnswer.innerHTML =
      '<td class="table-itog_num">' +
      num +
      `</td><td class="table-itog_brand" id="ShowPict${count}">` +
      resultTest[indexElem].brand +
      '</td><td class="table-itog_description">' +
      resultTest[indexElem]["real-description"] +
      '</td><td class="table-itog_description">' +
      resultTest[indexElem].description +
      '</td><td class="table-itog_answer">' +
      resulttestAnswerCollaborator +
      '</td><td class="table-itog_correct">' +
      correctChoise +
      "</td>";

    itogTbody.append(trAnswer);

    if (nameProgramm == "Ценовой<br>сегмент") {
      const stmPicture = document.createElement("img");
      stmPicture.style.width = "100%";
      stmPicture.src = resultTest[indexElem].brand;
      const ShowPict = document.getElementById(`ShowPict${count}`);
      ShowPict.innerText = "";
      ShowPict.append(stmPicture);
      count++;
    }
  }
  blockItogInfo.innerHTML =
    "<p>Правильных ответов: " +
    counterOfCorrectAnswers +
    "</p><p>Не правильных ответов: " +
    counterOfIncorrectAnswers +
    "</p><p>Вопросов отвечено: " +
    counterAnswer +
    "</p>";
  blockItog.style.display = "block"; // Показываем итоги.
  document.getElementById("name").innerHTML = getByName.innerText;
  document.getElementById("counterOfCorrectAnswers").innerHTML =
    counterOfCorrectAnswers;
  document.getElementById("counterOfIncorrectAnswers").innerHTML =
    counterOfIncorrectAnswers;
  document.getElementById("counterAnswer").innerHTML = counterAnswer;
  document.getElementById("timeItog").innerHTML =
    inputTimeTest.value - timeSpent;
  // Очищаем "Выбор сотрудника" в Ценовом сегменте
  if (nameProgramm == "Ценовой<br>сегмент") {
    const classChoise = document.getElementsByClassName("table-itog_answer");
    for (let index = 1; index < classChoise.length; index++) {
      classChoise[index].innerHTML = "";
    }
  }
}

function itog(typeEnd) {
  clearInterval(intervalId); // Останавливаем таймер.
  brand.innerHTML = typeEnd + "<br>Для начала проверки выберите программу:";
  numberOfCorrectAnswers.innerHTML = 0; // Обнуляем результаты правильных ответов..
  numberOfIncorrectAnswers.innerHTML = 0; // Обнуляем результаты не правильных ответов.
  btnStart.style.display = "block"; // Показываем кнопку "Старт".
  price.style.display = "block"; // Показываем кнопку "Ценовой сегмент"
  btnAnswerTrue.style.display = "none"; // Прячем кнопку "Правильно".
  btnAnswerFalse.style.display = "none"; // Прячем кнопку "Не правильно".
  STMValue.style.display = "none"; // Прячем блок с картинкой.
  description.style.display = "none"; // Прячем описание.
  timeOption.style.display = "flex"; // Показываем поле с веденным временем.
  timeScroll.style.display = "none"; // Прячем таймер.
  fillingOutTheTable(); // Заполнение таблицы.
}

function timer(timeTest) {
  timeScroll.style.display = "block"; // Показывем таймер.
  timeScroll.innerHTML = `${Math.trunc(timeTest / 3600)} ч. ${Math.trunc(
    timeTest / 60
  )} м. ${timeTest > 59 ? timeTest % 60 : timeTest} сек.`;
  intervalId = setInterval(() => {
    timeTest -= 1;
    timeSpent = timeTest;
    if (timeTest > 0) {
      timeScroll.innerHTML = `${Math.trunc(timeTest / 3600)} ч. ${Math.trunc(
        timeTest / 60
      )} м. ${timeTest > 59 ? timeTest % 60 : timeTest} сек.`;
    } else {
      clearInterval(intervalId); // Останавливаем таймер.
      itog("Время вышло!");
      // choiseResult.price ? document.getElementById("counterAnswer").innerText = 100: false;
    }
  }, 1000);
}

btnStart.addEventListener("click", function (event) {
  const check = confirm(
    `Вы действительно хотите запустить ${event.target.innerHTML}`
  );

  if (check == true) {
    nameProgramm = event.target.innerHTML;
    counterOfCorrectAnswers = 0; // Обнуляем счетчик правильных ответов.
    counterOfIncorrectAnswers = 0; // Обнуляем счетчик не правильных ответов.
    counterAnswer = 0; // Обнуляем счетчик отвеченых вопросов.
    resultTest = []; // Очищаем результат тестирования.
    copyArrProductSTM = [...arrProductSTM]; // Клонируем массив arrProductSTM для удаления из него пунктов.
    timeOption.style.display = "none"; // Прячем поле с веденным временем.
    blockItog.style.display = "none"; // Прячем итоги.
    itogTbody.innerHTML = ""; // Опустошаем таблицу с итогами.
    blockItogInfo.innerHTML = ""; // Опустошаем не табличную информацию.
    timer(inputTimeTest.value); // Запускаем таймер.
    btnStart.style.display = "none"; // Прячем кнопку "Старт".
    price.style.display = "none"; // Прячем кнопку "Ценовой сегмент".
    btnAnswerTrue.style.display = "block"; // Показываем кнопку "Правильно".
    btnAnswerFalse.style.display = "block"; // Показываем кнопку "Не правильно".
    description.style.display = "block"; // Показываем описание.
    selectionOfBrandsAndStatements();
  }
});

price.addEventListener("click", function (event) {
  const check = confirm(
    `Вы действительно хотите запустить ${event.target.innerText}`
  );

  if (check == true) {
    nameProgramm = event.target.innerHTML;
    counterOfCorrectAnswers = 0; // Обнуляем счетчик правильных ответов.
    counterOfIncorrectAnswers = 0; // Обнуляем счетчик не правильных ответов.
    counterAnswer = 0; // Обнуляем счетчик отвеченых вопросов.
    resultTest = []; // Очищаем результат тестирования.
    copyArrProductSTM = [...arrProductSTM]; // Клонируем массив arrProductSTM для удаления из него пунктов.
    timeOption.style.display = "none"; // Прячем поле с веденным временем.
    blockItog.style.display = "none"; // Прячем итоги.
    itogTbody.innerHTML = ""; // Опустошаем таблицу с итогами.
    blockItogInfo.innerHTML = ""; // Опустошаем не табличную информацию.
    timer(inputTimeTest.value); // Запускаем таймер.
    btnStart.style.display = "none"; // Прячем кнопку "Старт".
    price.style.display = "none"; // Прячем кнопку "Ценовой сегмент".
    brand.innerHTML = "";
    // description.style.display = "block"; // Показываем описание.
    selectionOfBrandsAndPrice();
  }
});
// кнопка выбора Ценового сегмента
confirmSTM.addEventListener("click", function (event) {
  let winner = false; // переменная определяет правильность выбора
  let checkChoise = 0; // проверка наличия выбора

  for (let index = 0; index < selectPrice.length; index++) {
    if (selectPrice[index].checked == true) {
      choiseResult.choise = selectPrice[index].value;
      checkChoise++;
    }
    if (
      selectPrice[index].checked == true &&
      selectPrice[index].value == choiseResult.price
    ) {
      winner = true;
    }
  }
  objAnswer = {
    brand: stringBrand,
    "real-description": choiseResult.price,
    description: choiseResult.choise,
    "answer-user": choiseResult.choise,
  };
  resultTest.push(objAnswer);
  counterAnswer++; // Прибавляем 1 в счетчик отвеченых вопросов.
  if (checkChoise == 1) {
    // проверяем, сделан ли выбор

    if (winner == true) {
      description.style.color = "green";
      counterOfCorrectAnswers++; // Прибавляем 1 в счетчик правильных ответов.
      numberOfCorrectAnswers.innerText = counterOfCorrectAnswers;
    } else {
      description.style.color = "red"; // Подкрашеваем, неправильный ответ.
      counterOfIncorrectAnswers++; // Прибавляем 1 в счетчик не правильных ответов.
      numberOfIncorrectAnswers.innerText = counterOfIncorrectAnswers;
    }

    selectionOfBrandsAndPrice();
  } else {
    alert("Выберите ценовой сегмент!");
  }

  //обнуляем checked
  for (let index = 0; index < selectPrice.length; index++) {
    selectPrice[index].checked = false;
  }
});

btnAnswerTrue.addEventListener("click", function (event) {
  answerCollaborator(true);
  selectionOfBrandsAndStatements();
});

btnAnswerFalse.addEventListener("click", function (event) {
  answerCollaborator(false);
  selectionOfBrandsAndStatements();
});

// при нажатии на ентер или таб инпут исчезает, а имя отображается на экране
document.addEventListener("keyup", function (event) {
  if (
    getByNameValue.value != "" &&
    (event.key == "Enter" || event.key == "Tab")
  ) {
    getByName.innerText = getByNameValue.value;
    getByNameValue.style.display = "none";
  }
});

// Экспорт в EXCEL
var tableToExcel = (function () {
  var uri = "data:application/vnd.ms-excel;base64,",
    template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
  return function (table, name) {
    if (!table.nodeType) table = document.getElementById(table).cloneNode(true);
    notExport = table.querySelectorAll(".not-export");
    for (let i = 0; i < notExport.length; i++) {
      notExport[i].outerHTML = "";
    }
    elemBorder = table.querySelectorAll("TD");
    for (let i = 0; i < elemBorder.length; i++) {
      elemBorder[i].style.border = "1px solid #999";
    }
    //style="border: 1px solid #999;"
    var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
    window.location.href = uri + base64(format(template, ctx));
  };
})();
// /Экспорт в EXCEL
