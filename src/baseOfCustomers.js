const clientsName = document.getElementById("clientsName");
const clientsName_0 = document.getElementById("clientsName_0");
const actualDate = document.getElementById("actualDate");

const checkDescription = document.getElementById("checkDescription");
const checkResultButton = document.getElementById("checkResultButton");
const serchData = document.getElementById("checkResult");

checkDescription.innerHTML = "Получи свод по Клиенту:";

// checkResultButton.addEventListener("click", (event) => {
//   checkForAvailability();
// });

// Активация кнопки Проверки клиента

// serchData.addEventListener("keyup", (event) => {
//   event.key == "Enter" ? checkForAvailability() : true;
// });

//ВЫВОД информации о клиенте из массива объектов

// const informationOutput = (infoBase) => {
//   for (let index = 0; index < infoBase.length; index++) {
//     if (serchData.value == Object.keys(infoBase[index])) {      
//       return Object.values(infoBase[index])[0];
//     }
//   }  
//   return "Нет";
// };

// // Функция проверки массива на наличие КОДА КЛИЕНТА
// const checkForAvailability = (test) => {
//   let itog = 0; // счётчик совпадений введенного значения с кодом из списка

//   for (let index = 0; index < test.length; index++) {
//     serchData.value == test[index] ? itog++ : false;
//   }

//   return itog;
// };
