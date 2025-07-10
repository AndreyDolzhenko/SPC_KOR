const getOfClients = document.getElementById("getOfClients");


getOfClients.addEventListener("submit", function (e) {
  e.preventDefault();

  let clientsConditions = {
    "operatorSName": userData.firstChild.textContent,
    
  };

  for (let index = 0; index < getOfClients.length; index++) {
    clientsConditions.status_1 = getOfClients[0].value;
    clientsConditions.status_2 = getOfClients[1].value;
  }

  console.log(clientsConditions);

  // Функция для получения клиентов из Цикла контактов
  const clientsFromCK = async (clientsConditions) => {
    await fetch(
      // `http://127.0.0.1:3001/api/v1/getOfClients`
      `http://127.0.0.1:3001/api/v1/getOfClients?getOfClients=${[clientsConditions.status_1, clientsConditions.status_2]}`
      // `http://91.236.199.173:3001/api/v1/getOfClients?getOfClients=${clientsConditions}`
      ,
      // {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(clientsConditions),
      // }
    );  
  };

  clientsFromCK(clientsConditions)
  .then((value) => {
          messageFromBase("Данные отправлены!");
  })
  .catch((e) => {
          messageFromBase("Выбор невозможен!");
          // console.log("Connection error!");
        });
});
