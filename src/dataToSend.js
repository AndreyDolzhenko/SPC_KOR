const send = document.getElementById("send");
const databaseStatus = document.getElementById("databaseStatus");
const iconHome = document.getElementById("icon_home");


let dialogueStructure = {

};

// Функция с мигающим сообщением об отправке данных или о состоянии базы
const messageFromBase = (message) => {
  let i = 0;
  const timerMess = setInterval(() => {
    databaseStatus.innerText = message;
    if (message == "База подключена!" || message == "Данные отправлены!") {
      databaseStatus.style.color == "black" ? databaseStatus.style.color = "darkgreen" : databaseStatus.style.color = "black";
    } else {
      databaseStatus.style.color == "black" ? databaseStatus.style.color = "red" : databaseStatus.style.color = "black";
    }
    i++;

    if (i == 6) {
      clearInterval(timerMess);
      databaseStatus.innerText = "";
    }
  }, 1000);

}



fetch(`http://91.236.199.173:${PORT}/api/v1/users`)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    iconHome.style.fill = "darkgreen";
    messageFromBase("База подключена!");
  })
  .catch((e) => {
    iconHome.style.fill = "darkgray";
    messageFromBase("Подключение к базе отсутствует!");

  })

