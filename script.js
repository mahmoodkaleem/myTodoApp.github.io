//stop by default submit behavior of form
let form = document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

//Add button
let addButton = document.querySelector(".todo-button");
addButton.addEventListener("click", () => {
  if (document.querySelector(".todo-input").value != "") {
    const inputDate = document.querySelector(".todo-date");
    let inputVal = document.querySelector(".todo-input").value;
    let newdate = new Date(inputDate.value);
    let month = newdate.toLocaleString("en-US", { month: "long" });
    let day = newdate.toLocaleString("en-US", { day: "numeric" });
    let year = newdate.toLocaleString("en-US", { year: "numeric" });
    createList(inputVal, day, month, year);
    document.querySelector(".todo-input").value = "";
  } else {
    alert("Please Enter item")
  }
});

//createList function
const createList = (inputValues, days, months, years) => {
  const main = document.querySelector(".main");
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
        <div class="date">
            <h2 id="day">${days}</h2>
            <h2 id="month">${months}</h2>
            <h2 id="year">${years}</h2>
        </div>
        <div class="contItem">${inputValues}</div>
        <i class="trash fa-sharp fa-solid fa-trash" title="delete"></i>`;
  main.appendChild(box);

  //delete button
  box.querySelector(".trash").addEventListener("click", () => {
    deleteList();
  });

  //deleteList function
  const deleteList = () => {
    box.remove();
    saveList();
  };

  //saveList function
  const saveList = () => {
    //save content to local storage
    let boxCotent = document.querySelectorAll(".contItem");
    let contentArr = [];
    boxCotent.forEach((element) => {
      contentArr.push(element.innerText);
    });
    if (contentArr.length == 0) {
      localStorage.removeItem("content");
    } else {
      localStorage.setItem("content", JSON.stringify(contentArr));
    }

    //save day to local storage
    let boxDay = document.querySelectorAll("#day");
    let dayArr = [];
    boxDay.forEach((element) => {
      dayArr.push(element.innerText);
    });
    if (dayArr.length == 0) {
      localStorage.removeItem("day");
    } else {
      localStorage.setItem("day", JSON.stringify(dayArr));
    }

    //save month to local storage
    let boxMonth = document.querySelectorAll("#month");
    let monthArr = [];
    boxMonth.forEach((element) => {
      monthArr.push(element.innerText);
    });
    if (monthArr.length == 0) {
      localStorage.removeItem("month");
    } else {
      localStorage.setItem("month", JSON.stringify(monthArr));
    }

    //save year to local Storage
    let boxYear = document.querySelectorAll("#year");
    let yearArr = [];
    boxYear.forEach((element) => {
      yearArr.push(element.innerText);
    });
    if (yearArr.length == 0) {
      localStorage.removeItem("year");
    } else {
      localStorage.setItem("year", JSON.stringify(yearArr));
    }
  };
  saveList()

  //toggle behavior of each list item
  box.addEventListener("click", () => {
    box.classList.toggle("toggle");
  });
};

// iife function for page refrash and resotre saved data
(() => {
  let dataObj = {};
  dataObj.content = JSON.parse(localStorage.getItem("content"));
  dataObj.day = JSON.parse(localStorage.getItem("day"));
  dataObj.month = JSON.parse(localStorage.getItem("month"));
  dataObj.year = JSON.parse(localStorage.getItem("year"));

  if (dataObj.content != null) {
    for (i = 0; i < (dataObj.content).length; i++) {
      createList(
        dataObj.content[i],
        dataObj.day[i],
        dataObj.month[i],
        dataObj.year[i]
      )
    }
  }
})();
