const getDataFromBack = {
  status_name: "Потенциальный NEW",
  channel_name: "SMB",
  priority: 1,
};

// Функция для получения скриптов по параметрам
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
      ? `http://localhost:3008/api/scripts?${queryString}`
      : "/api/scripts";

    console.log("Fetching from URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const scripts = await response.json();
    scripts.forEach((element) => {
      console.log(element.content);
    });

    return scripts;
  } catch (error) {
    console.error("Ошибка при получении скриптов:", error);
    return [];
  }
};

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
