const contactRelise = document.getElementById("contactRelise");
const contactClose = document.getElementById("contactClose");
const contactIncluding = document.getElementById("contactIncluding");
const basicDiv = document.createElement("form");

contactClose.addEventListener("click", (event) => {
  contactRelise.style.display = "none";
});

many.addEventListener("click", (event) => {
  popup1_txt.innerHTML = `<u>Содержание документа Контакт:</u>`;

  contactTempt.map((el) => {
    const p = document.createElement("p");
    p.textContent = Object.keys(el);

    const input = document.createElement("input");
    input.type = "text";

    basicDiv.append(p);
    basicDiv.append(input);
  });

  popup1_txt.append(basicDiv);

  const button = document.createElement("button");
  button.textContent = "Сохранить";
  button.addEventListener("click", (event) => {
    contactIncluding.innerHTML = "";
    contactArray = [];

    for (let index = 0; index < basicDiv.children.length; index++) {
      index % 2 == 0
        ? contactArray.push(basicDiv.children[index].innerText)
        : contactArray.push(basicDiv.children[index].value);
    }

    

    // contactArray.map((el, index) => {       
        
       
    //   const span = document.createElement("span");
    //   span.innerText = el;
    //   contactIncluding.append(span);
        
    //   if (index % 2 != 0) { 
        
    //     const br = document.createElement("br");
    //     contactIncluding.append(br);
    //     span.style.color = "blue";
        
    //   }

    // });

    // Группируем пункты документа Контакт

    let lastArray = [];
    let arr = [];

    contactArray.map((el, index) => {
        
       if (arr.length <= 1) {
        arr.push(el);

       } else if (index == contactArray.length - 2) {        
       
        lastArray.push(arr);
        arr = [];
        arr.push(el);
        lastArray.push(arr);

       } else {

        lastArray.push(arr);
        arr = [];
        arr.push(el);
       }

       
    });

    console.log(lastArray);

    lastArray.map((el) => {  
          const p = document.createElement("p");

        el.map((el, index) => {
            const span = document.createElement("span");
            span.innerText = el;
            p.append(span);
              
            if (index % 2 != 0) { 
              
            //   const br = document.createElement("br");
            //   p.append(br);
              span.style.color = "blue";
              
            }
        });  
        
        p.lastChild.textContent != "" ? contactIncluding.append(p) : false;

    });
    

    contactRelise.style.display = "flex";
  });

  popup1_txt.append(button);

  popupOperation();
});
