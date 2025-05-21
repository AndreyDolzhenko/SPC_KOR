const uploadDate = async () => {
  const upload = document.getElementById("upload");
  const file = upload.files[0];
  if (!file) {
    alert("Выберите файл для загрузки");
    return;
  }
  const formData = new FormData();
  formData.append("myFile", file);

  try {
    await fetch(    
      `http://91.236.199.173:3001/api/v1/upload`,
      // `http://127.0.0.1:3001/api/v1/upload`, 
      
      {
        method: "POST",
        body: formData,
      }
    );

  } catch (error) {}
};
