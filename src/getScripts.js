const scenaryOfPriority = document.getElementById("scenaryOfPriority");

const prioritiesChildren = Array.from(scenaryOfPriority.children);

// Добавляем глобальную переменную для хранения текущего обработчика
let currentSendHandler = null;

// Функция Скрыть / Показать
function toggleText(btn) {
  const hiddenText = btn.previousElementSibling;

  if (hiddenText.classList.contains("hidden")) {
    hiddenText.classList.remove("hidden");
    btn.textContent = "[Скрыть]";
  } else {
    hiddenText.classList.add("hidden");
    btn.textContent = "[Показать]";
  }
}

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

    clientName = enterName.value;

    // console.log("clientName - ", clientName);

    getAnyScripts(event);
  });
});

const getAnyScripts = function (event) {
  header.style = "display: none;";
  header_tools.style = "display: flex";

  let x = 0; // переменная для процента выполнения скрипта

  // 100% checking

  fullCheck.addEventListener("click", (event) => {
    if (contactScripts.innerHTML != "" && fullCheck.checked == true) {
      const includesOfScript = contactScripts.querySelectorAll("li");
      for (let elem of includesOfScript) {
        elem.style.color = "tomato";
        dialogueStructure[elem.id] = "+";
      }
      x = 100;
      progress_bar_span.innerHTML = `${x}%`;
      progress_bar_color.style = `width: ${x}%;`;
      many.style = "display: block; position: absolute; right: -1.2em;";
      heart.style.display = "none";
    } else {
      const includesOfScript = contactScripts.querySelectorAll("li");
      for (let elem of includesOfScript) {
        elem.style.color = "black";
        dialogueStructure[elem.id] = "-";
      }
      x = 0;
      progress_bar_span.innerHTML = `${x}%`;
      progress_bar_color.style = `width: ${x}%;`;
      many.style.display = "none";
      heart.style.display = "block";
    }
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
    let liId = 0;

    /// ВЫВОД скрипта из БАЗЫ

    const getDataFromBack = {
      status_name: event.target.innerText,
      channel_name: keySubDivision,
      priority: 1,
    };

    const nameOfEmployee = userData.firstChild.textContent.split(" ")[1];

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
          ? `http://91.236.199.173:3008/api/scripts?${queryString}`
          : "/api/scripts";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const scripts = await response.json();

        scripts.forEach((el) => {
          const newLiScript = document.createElement("li");
          // присваиваем Id каждому пункту скрипта
          newLiScript.id = liId;
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
          });

          liId++; // увеличиваем Id на единицу
        });

        progress_counter = 100 / contactScripts.children.length;

        const employeeName = document.getElementById("employeeName");
        employeeName.innerText = userData.firstChild.textContent.split(" ")[1];

        // Работаем с Презентациями

        const presentUrl = queryString
          ? `http://91.236.199.173:3008/api/presentations?${queryString}`
          : "/api/scripts";

        const presentResponse = await fetch(presentUrl);

        if (!presentResponse.ok) {
          throw new Error(`HTTP error! status: ${presentResponse.status}`);
        }

        const listOfPresents = await presentResponse.json();

        listPresentations.innerHTML = "";

        listOfPresents.forEach((el) => {
          newPresentation = document.createElement("button");
          newPresentation.className = "presentations";
          newPresentation.textContent = el.name;
          newPresentation.onclick = () => {
            popupOperation();
            textOutput.innerHTML = el.content;
          };

          listPresentations.append(newPresentation);
        });

        // Работаем с Возражениями

        const objectUrl = queryString
          ? `http://91.236.199.173:3008/api/objections?${queryString}`
          : "/api/scripts";

        const objectResponse = await fetch(objectUrl);

        if (!objectResponse.ok) {
          throw new Error(`HTTP error! status: ${objectResponse.status}`);
        }

        const listOfobjections = await objectResponse.json();

        const objections = document.getElementById("objections");

        objections.innerHTML = "";

        listOfobjections.forEach((el, index) => {
          const button = document.createElement("button");
          button.className = "objections";
          button.id = `objections_${index}`;
          button.innerText = el.name;

          button.onclick = () => {
            popupOperation();
            textOutput.innerHTML = el.content;
          };

          objections.append(button);
        });
      } catch (error) {
        console.error("Ошибка при получении скриптов:", error);
        return [];
      }
    };

    // if (keySubDivision == "SMB") {
    getScriptsByParams(getDataFromBack);

    // ВАЖНОЕ ИЗМЕНЕНИЕ: Удаляем старый обработчик перед добавлением нового
    if (currentSendHandler) {
      send.removeEventListener("click", currentSendHandler);
    }

    // Создаем новый обработчик отправки
    currentSendHandler = (event) => {
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
          })
          .catch((e) => {
            messageFromBase("Подключение к базе отсутствует!");
          });
      }
    };

    // Добавляем новый обработчик
    send.addEventListener("click", currentSendHandler);

    // ВЫВОД КНОПОК ПРЕЗЕНТАЦИИ
    for (presentationsUrgentScript of urgentScripts.children) {
      presentationsUrgentScript.style.display = "";
      if (!presentationsUrgentScript.value.includes(keySubDivision)) {
        presentationsUrgentScript.style.display = "none";
      }
    }

    for (presentat of listPresentations.children) {
      presentat.style.display = "";
      // УБИРАЕМ ЛИШНИЕ КНОПКИ ПРЕЗЕНТАЦИИ
      if (!presentat.value.includes(event.target.id)) {
        presentat.style.display = "none";
      }
    }

    const employeeName = document.getElementById("employeeName");
    employeeName.innerText = userData.firstChild.textContent.split(" ")[1];
  }
  progress_counter = 100 / contactScripts.children.length;
};

// Оставляем функцию sendResult без изменений
const sendResult = async (dataToSend) => {
  // console.log("SMBdataToSend - ", dataToSend);
  try {
    console.log("dataToSend - ", dataToSend);
    const response = await fetch(
      `http://91.236.199.173:${PORT}/api/v1/dialogues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );

    const responseText = await response.text();

    console.log("responseText - ", responseText);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, response: ${responseText}`
      );
    }

    // Пытаемся распарсить как JSON, если не получается - возвращаем текст
    try {
      const jsonData = JSON.parse(responseText);
      console.log("✅ Данные отправлены. Ответ сервера:", jsonData);
      return { success: true, data: jsonData };
    } catch (jsonError) {
      console.log("✅ Данные отправлены. Ответ сервера (текст):", responseText);
      return { success: true, text: responseText };
    }
  } catch (error) {
    console.error("❌ Ошибка отправки:", error);
    return { success: false, error: error.message };
  }
};
