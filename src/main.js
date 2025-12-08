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

enterName.addEventListener("click", (event) => {
  enterName.value = serchData.value;
});

// Работа с напоминалкой

const reminderList = document.getElementById("reminderList");
const reminderForm = document.getElementById("reminderForm");
const reminderFormUpdate = document.getElementById("reminderFormUpdate");
const reminderOfDate = document.getElementById("reminderOfDate");
const reminderId = document.getElementById("reminderId");
const reminderStatus = document.getElementById("reminderStatus");
const deleteReminde = document.getElementById("deleteReminde");
const allRemindersByEmployee = document.getElementById(
  "allRemindersByEmployee"
);
const select = document.querySelector('select[name="employee"]');

// формирование списка сотрудников в напоминалке

const allEmployeesForRemind = async () => {
  let response = await fetch(
    // `http://91.236.199.173:3012/api/v1/employees`
    `http://91.236.199.173:3001/api/v1/employees`
    // `http://127.0.0.1:3001/api/v1/employees`
    // `http://89.111.172.208:3001/api/v1/employees`
  );

  let res = await response.json();
  // console.log(res);

  res.map((el) => {
    const reminderEmployeeList = document.createElement("option");
    reminderEmployeeList.value = el;
    reminderEmployeeList.innerText = el;
    select.append(reminderEmployeeList);
  });

  // getEmployeesSchow.addEventListener("click", (event) => {
  //   userData.firstChild.textContent = getEmployeesSchow.value;
  // });
};

select.addEventListener("click", (event) => allEmployeesForRemind());

// Страница со всеми напоминаниями по сотруднику

const remindersEmployeeLink = document.getElementById("remindersEmployeeLink");

// Попап напоминалки
const remindCross = document.getElementById("remindCross");
remindCross.addEventListener("click", () => {
  reminderList.style.display = "none";
  resetForm();
});

function resetForm() {
  document.getElementById("reminderForm").reset();
  // hideMessages();
}

const icon_reminder = document.getElementById("icon_reminder");

// Обработка формы

function showSuccess() {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");
  // const reminderFormUpdate = document.getElementById("reminderForm");

  successMessage.style.display = "block";
  successMessage.style.opacity = "1";
  errorMessage.style.display = "none";

  setTimeout(() => {
    // Плавное исчезновение
    successMessage.style.transition = "opacity 0.5s ease";
    successMessage.style.opacity = "0";

    setTimeout(() => {
      successMessage.style.display = "none";
      successMessage.style.opacity = "1"; // Возвращаем opacity для следующего показа
    }, 500);
  }, 2500); // Начинаем исчезать через 2.5 секунды
}

function showError() {
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.style.display = "block";
  successMessage.style.display = "none";

  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 5000);
}

// Редакция НАПОМИНАНИЯ

reminderFormUpdate.addEventListener("click", async (e) => {
  e.preventDefault();

  // Получаем ID из URL или другого источника
  const reminderId = document.getElementById("reminderId").textContent;

  if (!reminderId) {
    showError("ID напоминания не найден");
    return;
  }

  const userName = userData.innerHTML.split("<br>")[0];

  // Форматируем дату
  const now = new Date();
  const formattedDate = now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Создаём заметку с комментарием
  const identitiRemind =
    reminderForm.note.value +
    `\n---\nИзменил напоминание\n--- [${formattedDate}] ${userName}`;

  const formData = {
    employee: reminderForm.employee.value,
    client: reminderForm.client.value,
    note: identitiRemind,
    status: reminderForm.status.value,
    execution_date: reminderForm.execution_date.value,
  };

  try {
    const response = await fetch(
      `http://91.236.199.173:3008/api/reminders/${reminderId}`,
      // `http://91.236.199.173:3008/api/reminders/${reminderId}`
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      showSuccess("Напоминание успешно обновлено!");
      setTimeout(() => {
        closePopup();
      }, 1500);
    } else {
      const errorData = await response.json();
      showError(errorData.message || "Ошибка при обновлении напоминания");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    showError("Ошибка сети при обновлении напоминания");
  }
});

// Отправка НАПОМИНАНИЯ
reminderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = userData.innerHTML.split("<br>")[0];

  // Форматируем дату
  const now = new Date();
  const formattedDate = now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Создаём заметку с комментарием
  const identitiRemind =
    e.target.note.value +
    `\n---\nСоздал напоминание\n--- [${formattedDate}] ${userName}`;

  const formData = {
    employee: e.target.employee.value,
    client: e.target.client.value,
    note: identitiRemind,
    status: e.target.status.value,
    execution_date: reminderForm.execution_date.value,
  };

  console.log("reminderForm - ", reminderForm);
  console.log(
    "reminderForm.execution_date.value - ",
    reminderForm.execution_date.value
  );

  try {
    const response = await fetch(
      "http://91.236.199.173:3008/api/reminders",
      // "http://91.236.199.173:3008/api/reminders"
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      showSuccess();
      setTimeout(() => {
        closePopup();
      }, 1500);
    } else {
      showError();
    }
  } catch (error) {
    console.error("Ошибка:", error);
    showError();
  }
});

////////////////////////

// Установка минимальной даты (текущая дата)
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.querySelector('input[name="execution_date"]').min = now
  .toISOString()
  .slice(0, 16);

// ========== УВЕДОМЛЕНИЯ ==========
class ReminderNotifications {
  constructor() {
    this.timers = new Map();
    this.isEnabled = false;
  }

  // Запланировать уведомление для одного напоминания
  scheduleReminder(reminder) {
    // Пропускаем выполненные/отмененные
    if (reminder.status === "выполнено" || reminder.status === "отменено") {
      return;
    }

    console.log("=== ПЛАНИРОВАНИЕ УВЕДОМЛЕНИЯ ===");
    console.log("Напоминание ID:", reminder.id);
    console.log("Клиент:", reminder.client);

    // Используем ТОЧНО ТО ЖЕ время, что и в выводе списка
    // В списке используется время из БД БЕЗ коррекции timezone
    const reminderTime = new Date(reminder.execution_date);
    console.log("Время из БД (для уведомления):", reminderTime.toISOString());
    console.log(
      "Часы (как в списке):",
      reminderTime.toISOString().slice(11, 19)
    );

    const currentTime = new Date();

    // Добавляем 3 часа к UTC
    const moscowTime = new Date(currentTime.getTime() + 3 * 60 * 60 * 1000);

    console.log("Московское время (+3 часа):", moscowTime.toISOString());

    // За 5 минут до события (используем то же время, что и в списке)
    const notificationTime = new Date(reminderTime.getTime() - 5 * 60000);
    console.log("Уведомление за 5 мин:", notificationTime.toISOString());

    // Если время уведомления еще не наступило
    const timeUntilNotification =
      notificationTime.getTime() - moscowTime.getTime();
    console.log("До уведомления (мс):", timeUntilNotification);
    console.log(
      "До уведомления (мин):",
      Math.round(timeUntilNotification / 60000)
    );

    if (timeUntilNotification > 0) {
      const timerId = setTimeout(() => {
        console.log("Сработало уведомление за 5 минут для:", reminder.client);
        this.showNotification(reminder, "через 5 минут", reminderTime);
      }, timeUntilNotification);

      this.timers.set(`5min-${reminder.id}`, timerId);
    }

    // Уведомление точно в время события
    const timeUntilReminder = reminderTime.getTime() - moscowTime.getTime();
    console.log("До события (мс):", timeUntilReminder);
    console.log("До события (мин):", Math.round(timeUntilReminder / 60000));

    if (timeUntilReminder > 0) {
      const exactTimerId = setTimeout(() => {
        console.log(
          "Сработало уведомление точно в время для:",
          reminder.client
        );
        this.showNotification(reminder, "прямо сейчас", reminderTime);
      }, timeUntilReminder);

      this.timers.set(`exact-${reminder.id}`, exactTimerId);
    }

    console.log("=== КОНЕЦ ПЛАНИРОВАНИЯ ===\n");
  }

  // Показать уведомление
  showNotification(reminder, timing, reminderTime) {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      console.log("Нет разрешения на уведомления");
      return;
    }

    // Форматируем время ТАК ЖЕ, как в списке
    const timeString = reminderTime.toISOString().slice(11, 16);
    console.log("Показываем уведомление:", timeString, timing, reminder.client);

    try {
      const notification = new Notification("🔔 Напоминание!", {
        body: `${timeString} (${timing}) - ${
          reminder.client
        }: ${reminder.note.slice(0, 50)}${
          reminder.note.length > 50 ? "..." : ""
        }`,
        icon: "/favicon.ico",
        tag: `reminder-${reminder.id}`,
        requireInteraction: true,
      });

      // При клике на уведомление - заполняем форму
      notification.onclick = () => {
        window.focus();
        autoFilling(reminder);
      };

      // Автоматически закрыть через 15 секунд
      setTimeout(() => {
        notification.close();
      }, 15000);
    } catch (error) {
      console.error("Ошибка при создании уведомления:", error);
    }
  }

  // Запланировать все напоминания
  scheduleAll(reminders) {
    console.log("=== НАЧАЛО ПЛАНИРОВАНИЯ ВСЕХ УВЕДОМЛЕНИЙ ===");
    this.clearAll();
    reminders.forEach((reminder) => {
      this.scheduleReminder(reminder);
    });
    this.isEnabled = true;
    console.log(`Запланировано уведомлений: ${this.timers.size}`);
    console.log("=== КОНЕЦ ПЛАНИРОВАНИЯ ВСЕХ УВЕДОМЛЕНИЙ ===\n");
  }

  // Очистить все таймеры
  clearAll() {
    console.log("Очистка всех таймеров уведомлений");
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.timers.clear();
    this.isEnabled = false;
  }

  // Проверить состояние
  isScheduled() {
    return this.isEnabled;
  }
}

// Создаем экземпляр менеджера уведомлений
const notificationManager = new ReminderNotifications();

// Функция для создания кнопки-колокольчика
function createNotificationBell() {
  const bell = document.createElement("button");
  bell.className = "notification-bell";
  bell.innerHTML = "🔔";
  bell.title = "Управление уведомлениями";

  bell.style.cssText = `
    position: absolute;
    top: 0;
    right: 50px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 20px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  `;

  // Обновляем внешний вид в зависимости от состояния
  function updateBellAppearance() {
    if (Notification.permission === "granted") {
      if (notificationManager.isScheduled()) {
        // Уведомления включены
        bell.style.background = "#4CAF50";
        bell.style.color = "white";
        bell.style.boxShadow = "0 0 10px #4CAF50";
        bell.innerHTML = "🔔";
        bell.title = "Уведомления включены (клик для отключения)";
      } else {
        // Уведомления выключены
        bell.style.background = "#f44336";
        bell.style.color = "white";
        bell.innerHTML = "🔕";
        bell.title = "Уведомления выключены (клик для включения)";
      }
    } else {
      // Нет разрешения
      bell.style.background = "#FF9800";
      bell.style.color = "white";
      bell.innerHTML = "🔔";
      bell.title = "Нет разрешения на уведомления (клик для запроса)";
    }
  }

  // Обработчик клика на колокольчик
  bell.onclick = (e) => {
    e.stopPropagation(); // Чтобы не срабатывал клик на список

    if (Notification.permission === "granted") {
      if (notificationManager.isScheduled()) {
        // Выключаем уведомления
        notificationManager.clearAll();
        updateBellAppearance();
        console.log("Уведомления отключены");
      } else {
        // Включаем уведомления
        // Для этого нужно перезагрузить список напоминаний
        console.log("Для включения уведомлений обновите список напоминаний");
        alert(
          "Для включения уведомлений нажмите на иконку напоминаний ещё раз"
        );
      }
    } else {
      // Запрашиваем разрешение
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          updateBellAppearance();
          console.log("Разрешение на уведомления получено");
        }
      });
    }
  };

  updateBellAppearance();
  return bell;
}

// Функция для добавления колокольчика в список напоминаний
function addNotificationBellToReminderList() {
  // Удаляем старый колокольчик если есть
  const oldBell = reminderList.querySelector(".notification-bell");
  if (oldBell) oldBell.remove();

  // Добавляем новый
  const bell = createNotificationBell();
  reminderList.appendChild(bell);
}

// ========== ОСНОВНАЯ ЛОГИКА (НЕ МЕНЯЕМ) ==========
icon_reminder.addEventListener("click", async (event) => {
  function testNotificationImmediately() {
    console.log("=== ТЕСТ УВЕДОМЛЕНИЯ ===");
    console.log("Notification support:", "Notification" in window);
    console.log("Permission:", Notification.permission);

    if (!("Notification" in window)) {
      console.log("Браузер не поддерживает уведомления");
      return;
    }

    if (Notification.permission !== "granted") {
      console.log("Нет разрешения. Запрашиваем...");
      Notification.requestPermission().then((permission) => {
        console.log("Новое разрешение:", permission);
        if (permission === "granted") {
          showTestNotification();
        }
      });
    } else {
      showTestNotification();
    }

    function showTestNotification() {
      console.log("Показываем тестовое уведомление...");
      try {
        const notification = new Notification("🔔 Тест!", {
          body: "Тестовое уведомление в " + new Date().toLocaleTimeString(),
          icon: "/favicon.ico",
          requireInteraction: true,
        });

        notification.onclick = () => {
          console.log("Уведомление кликнуто");
          notification.close();
        };

        setTimeout(() => notification.close(), 10000);
        console.log("Уведомление показано!");
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  }

  // testNotificationImmediately();

  const userName = userData.innerHTML.split("<br>")[0];
  reminderList.style.display = "block";

  document.getElementById(
    "allReminderLink"
  ).href = `./pages/allRemindersByEmployee.html?employee=${userName}`;

  notes.textContent = clientsName_0.textContent;

  // reminderForm.employee.value = userName;
  reminderForm.client.value = checkResult.value;

  select.value = userName;
  select.innerHTML = `<option>${userName}</option>`;

  console.log("select - ", select.value);

  let response;

  if (checkResult.value == "") {
    response = await fetch(
      `http://91.236.199.173:3008/api/reminders/employee/${userName}/today`
    );
  } else {
    console.log("!!checkResult - ", checkResult.value);
    response = await fetch(
      `http://91.236.199.173:3008/api/reminders/client/${checkResult.value}`
    );
  }

  let result = await response.json();

  checkResult.value == "" ? (result = result.data) : (result = result);

  console.log("result - ", result);

  reminderOfDate.textContent = "";

  result.forEach((el) => {
    const dateFromServer = new Date(el.execution_date);

    const li = document.createElement("li");
    if (el.status == "выполнено" || el.status == "отменено") {
      li.style = "color: grey; text-decoration: line-through;";
    }
    li.textContent = el.note;
    li.onclick = async () => {
      autoFilling(el);
      await getDataOfCustomers(el.client);
      notes.innerText = document.getElementById("clientsName_0").innerText;
      serchData.value = el.client;
      serchData.focus();
      console.log("el - ", el);
    };

    const formattedDate = dateFromServer.toISOString().slice(0, 10);
    const formattedTime = dateFromServer.toISOString().slice(11, 19);

    li.textContent =
      formattedDate +
      ". " +
      el.client +
      ": " +
      el.note.slice(0, 15) +
      "... " +
      formattedTime;

    reminderOfDate.append(li);
  });

  // ========== ДОБАВЛЯЕМ УВЕДОМЛЕНИЯ ==========

  // Добавляем колокольчик в список
  // addNotificationBellToReminderList();

  // Если есть разрешение и напоминания - планируем уведомления
  if (Notification.permission === "granted" && result.length > 0) {
    notificationManager.scheduleAll(result);
    console.log(`Уведомления запланированы для ${result.length} напоминаний`);
  } else {
    console.log("Уведомления не запланированы. Причина:");
    if (Notification.permission !== "granted") console.log("- Нет разрешения");
    if (result.length === 0) console.log("- Нет напоминаний");
  }
});

// Функция АвтоЗаполнения ФОРМЫ напоминания
const autoFilling = (el) => {
  reminderId.innerText = el.id;
  reminderStatus.innerText = el.status;
  reminderForm.employee.value = el.employee;
  reminderForm.client.value = el.client;
  reminderForm.note.value = el.note;
  reminderForm.status.value = el.status;

  // ВАШ ОРИГИНАЛЬНЫЙ КОД, но вычитаем 3 часа дополнительно
  const dateWithTimezone = new Date(
    new Date(el.execution_date).getTime() -
      new Date(el.execution_date).getTimezoneOffset() * 60000
  );

  // Дополнительно вычитаем 3 часа для компенсации браузера
  dateWithTimezone.setHours(dateWithTimezone.getHours() - 3);

  reminderForm.execution_date.value = dateWithTimezone
    .toISOString()
    .slice(0, 16);

  console.log("Заполнено:", reminderForm.execution_date.value);
};

///////////////////////////

// // Установка минимальной даты (текущая дата)
// const now = new Date();
// now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
// document.querySelector('input[name="execution_date"]').min = now
//   .toISOString()
//   .slice(0, 16);

// icon_reminder.addEventListener("click", async (event) => {

//   const userName = userData.innerHTML.split("<br>")[0];
//   reminderList.style.display = "block";

//   document.getElementById("allReminderLink").href = `./pages/allRemindersByEmployee.html?employee=${userName}`;

//   notes.textContent = clientsName_0.textContent;

//   reminderForm.employee.value = userName;
//   reminderForm.client.value = checkResult.value;
//   let response;

//   if (checkResult.value == "") {
//     response = await fetch(
//       `http://91.236.199.173:3008/api/reminders/employee/${userName}/today`
//       // `http://91.236.199.173:3008/api/reminders/client/Василёк`
//     );
//   } else {
//     console.log("!!checkResult - ", checkResult.value);
//     response = await fetch(
//       `http://91.236.199.173:3008/api/reminders/client/${checkResult.value}`
//       // `http://91.236.199.173:3008/api/reminders/client/Василёк`
//     );
//   }

//   let result = await response.json();

//   checkResult.value == "" ? result = result.data : result = result;

//   // console.log("!!result - ", result);

//   reminderOfDate.textContent = "";

//   result.forEach((el) => {
//     const li = document.createElement("li");
//     if (el.status == "выполнено" || el.status == "отменено") {
//       li.style = "color: grey; text-decoration: line-through;";
//     }
//     li.textContent = el.note;
//     li.onclick = async() => {
//       autoFilling(el);
//       await getDataOfCustomers(el.client);
//       notes.innerText = document.getElementById("clientsName_0").innerText;
//       serchData.value = el.client;
//       serchData.focus(); // Добавляем фокус
//       console.log("el - ", el);
//     };
//     li.textContent =
//       el.execution_date.slice(0, 10) + ". " + el.client + ": " + el.note.slice(0, 15) + "... " + new Date(new Date(el.execution_date).getTime() - (new Date(el.execution_date).getTimezoneOffset() * 60000))
//     .toISOString()
//     .slice(11, 19);
//     reminderOfDate.append(li);
//   });

//   // console.log("result - ", result);
// });

// // Функция АвтоЗаполнения ФОРМЫ напоминания

// const autoFilling = (el) => {
//   reminderId.innerText = el.id;
//   reminderStatus.innerText = el.status;
//   reminderForm.employee.value = el.employee;
//   reminderForm.client.value = el.client;
//   reminderForm.note.value = el.note;
//   reminderForm.status.value = el.status;
//   reminderForm.execution_date.value =
//     new Date(new Date(el.execution_date).getTime() - (new Date(el.execution_date).getTimezoneOffset() * 60000))
//     .toISOString()
//     .slice(0, 16);
//   // console.log("reminderForm - ", reminderForm.employee);
// };

////////////////////////////

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
    // `http://91.236.199.173:3012/api/v1/date`
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
    // `http://91.236.199.173:3012/api/v1/customers?codeOfCustomer=${codeOfCustomer}`
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
  // console.log(data);

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
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelosonCanc"><label for="labelosonCanc"> ОЗОН (канц):</label>   
	${colorDate.osonCanc}${data.osonCanc}</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelosonChos"><label for="labelosonChos"> ОЗОН (хоз):</label> 
	${colorDate.osonChos}${data.osonChos}</b>
	</li>
  <li class = "commonResult"> <input type="checkbox" class = "checkbox" id="labelosonProd"><label for="labelosonProd"> ОЗОН (прод):</label>
	${colorDate.osonProd}${data.osonProd}</b>
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
      scenaryOfPriority.style.display = "none";
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

// Object.keys(objections).forEach((el, index) => {
//   const button = document.createElement("button");
//   button.className = "objections";
//   button.id = `objections_${index}`;
//   button.innerText = el;
//   const objections = document.getElementById("objections");
//   objections.append(button);
// });

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

// listPresentations.innerHTML = "";
// for (ObjPresentations of arrObjPresentations) {
//   newPresentation = document.createElement("button");
//   newPresentation.className = "presentations";
//   newPresentation.value = ObjPresentations["status"];
//   newPresentation.innerHTML = ObjPresentations["title"];
//   listPresentations.append(newPresentation);
//   // objections.style.display='none';
// }

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
listScript.addEventListener("click", (event) => {
  getAnyScripts(event);
});

// строим основную страницу и левое меню
function homePage() {
  sectionTitle.innerHTML += `Сценарии контакта`;
  fillInTheListOfScripts();
}

// Проверка на сотрудника

async function getDataOfEmployee(person) {
  let response = await fetch(
    // `http://91.236.199.173:3012/api/v1/employee?person=${person}`
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
    // `http://91.236.199.173:3012/api/v1/employees`
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
