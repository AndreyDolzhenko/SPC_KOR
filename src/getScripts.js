const scenaryOfPriority = document.getElementById("scenaryOfPriority");

const prioritiesChildren = Array.from(scenaryOfPriority.children);

prioritiesChildren.forEach((el) => {
  el.addEventListener("click", (event) => {
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
    scenaryOfPriority.style.display = "none";

    getAnyScripts(event);
  });
});

// Функция для получения скриптов по параметрам
// const getScriptsByParams = async (filters = {}) => {
//   try {
//     // Создаем query строку из фильтров
//     const queryParams = new URLSearchParams();

//     // Добавляем только те параметры, которые есть в filters
//     if (filters.status_name)
//       queryParams.append("status_name", filters.status_name);
//     if (filters.channel_name)
//       queryParams.append("channel_name", filters.channel_name);
//     if (filters.priority) queryParams.append("priority", filters.priority);
//     if (filters.order) queryParams.append("order", filters.order);

//     const queryString = queryParams.toString();
//     const url = queryString
//       ? `http://localhost:3008/api/scripts?${queryString}`
//       : "/api/scripts";

//     console.log("Fetching from URL:", url);

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const scripts = await response.json();
//     scripts.forEach((element) => {
//       console.log(element.content);
//     });

//     return scripts;
//   } catch (error) {
//     console.error("Ошибка при получении скриптов:", error);
//     return [];
//   }
// };

// getScriptsByParams(getDataFromBack);

// Простой запрос - получаем всё:

// const getAllScripts = async () => {
//   try {
//     const response = await fetch('http://localhost:3008/api/scripts');

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const scripts = await response.json();

//     scripts.forEach(element => {
//         console.log(element.content);

//     });
//     return scripts;

//   } catch (error) {
//     console.error('Ошибка при получении скриптов:', error);
//     return [];
//   }
// };

// // Использование
// getAllScripts();

const getAnyScripts = function (event) {
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
    console.log("event.target.id - ", event.target.id);
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
    // if (
    //   subDivisionAndstatusScripts[keySubDivision]["status-scripts"][
    //     event.target.id
    //   ] != undefined
    // ) {
    let liId = 0;

    /// ВЫВОД скрипта из БАЗЫ

    console.log("ВЫВОД скрипта из БАЗЫ");

    console.log("keySubDivision - ", keySubDivision);

    console.log("event.target.innerText - ", event.target.innerText);

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
        if (filters.priority) queryParams.append("priority", filters.priority);
        if (filters.order) queryParams.append("order", filters.order);

        const queryString = queryParams.toString();
        const url = queryString
          ? // ? `http://89.111.172.208:3008/api/scripts?${queryString}`
            `http://localhost:3008/api/scripts?${queryString}`
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
              many.style = "display: block; position: absolute; right: -50px;";
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

    if (keySubDivision == "SMB") {
      getScriptsByParams(getDataFromBack);      
    } else {

      // НАЧАЛО вывода СКРИПТА
      for (scriptPoint of subDivisionAndstatusScripts[keySubDivision][
        "status-scripts"
      ][event.target.id]) {
        // console.log("keySubDivision - ", keySubDivision);
        // console.log("subDivisionAndstatusScripts - ", subDivisionAndstatusScripts);
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
            many.style = "display: block; position: absolute; right: -50px;";
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
      }
  
      // ОКОНЧАНИЕ вывода СКРИПТА

      
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
    // } else {
    //   contactScripts.innerHTML = "Такого сценария пока нет.";
    // }
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
};
