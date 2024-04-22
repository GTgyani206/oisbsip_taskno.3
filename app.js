const del = document.querySelectorAll(".del");
const complete = document.querySelectorAll(".complete");
const add = document.querySelector(".add");
const edit = document.querySelectorAll(".edit");
const retry = document.querySelectorAll(".retry");

// JS for diffferent buttons and their related functions

//delete button for deleting the listings
for (delBtn of del) {
  delBtn.addEventListener("click", () => {
    console.log("delete");
    // delete the item
  });
}

//complete button for marking the task as complete
for (completeBtn of complete) {
  completeBtn.addEventListener("click", () => {
    console.log("complete");
    // mark the item as complete
  });
}

//add button to add new task to the existing listing
add.addEventListener("click", () => {
  let obj = document.querySelectorAll(".ToDo");
  let task = taskInput.value;
  let finalTask = `<p>${task}</p>`;
  const p = document.createElement("p");
  p.innerHTML = finalTask;
  obj.appendChild(p);
});

//edit button to update the pre existing listing
for (editBtn of edit) {
  editBtn.addEventListener("click", () => {
    console.log("edit");
  });
}

//the retry button will reallocate the missed task to current To-Do list
for (retryBtn of retry) {
  retryBtn.addEventListener("click", () => {
    console.log("retry");
  });
}

//code for fetching the qoutes from the qouable.io api
let qouteUrl = "https://api.quotable.io/random";
const Qoute = document.querySelector(".qoute");
try {
  function getQuote() {
    axios.get(qouteUrl).then((response) => {
      let qoute = response.data.content;
      let author = response.data.author;
      let finalqoute = `<p>${qoute}</p> <p>-${author}</p>`;
      const p = document.createElement("p");
      p.innerHTML = finalqoute;
      Qoute.appendChild(p);
    });
  }
} catch (err) {
  console.log(err);
  next();
}

//code for extracting time from prebuild Date() function
function getTime() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let finalTime = `<center><h1>${hours}:${minutes}:${seconds} ${ampm}</h1></center>`;
  const timeDiv = document.querySelector(".time");
  timeDiv.innerHTML = finalTime;
}

setInterval(getTime, 1000);

getQuote();

//code for building callendar
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector(".calendar");
const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month_picker = document.querySelector("#month-picker");
const dayTextFormate = document.querySelector(".day-text-formate");
const timeFormate = document.querySelector(".time-formate");
const dateFormate = document.querySelector(".date-formate");

month_picker.onclick = () => {
  month_list.classList.remove("hideonce");
  month_list.classList.remove("hide");
  month_list.classList.add("show");
  dayTextFormate.classList.remove("showtime");
  dayTextFormate.classList.add("hidetime");
  timeFormate.classList.remove("showtime");
  timeFormate.classList.add("hideTime");
  dateFormate.classList.remove("showtime");
  dateFormate.classList.add("hideTime");
};

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days");
  calendar_days.innerHTML = "";
  let calendar_header_year = document.querySelector("#year");
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");

    if (i >= first_day.getDay()) {
      day.innerHTML = i - first_day.getDay() + 1;

      if (
        i - first_day.getDay() + 1 === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add("current-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");
month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace("show", "hide");
    dayTextFormate.classList.remove("hideTime");
    dayTextFormate.classList.add("showtime");
    timeFormate.classList.remove("hideTime");
    timeFormate.classList.add("showtime");
    dateFormate.classList.remove("hideTime");
    dateFormate.classList.add("showtime");
  };
});

(function () {
  month_list.classList.add("hideonce");
})();
document.querySelector("#pre-year").onclick = () => {
  --currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector("#next-year").onclick = () => {
  ++currentYear.value;
  generateCalendar(currentMonth.value, currentYear.value);
};

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector(".time-formate");
const todayShowDate = document.querySelector(".date-formate");

const currshowDate = new Date();
const showCurrentDateOption = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
};
const currentDateFormate = new Intl.DateTimeFormat(
  "en-US",
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formateTimer = new Intl.DateTimeFormat("en-us", option).format(timer);
  let time = `${`${timer.getHours()}`.padStart(
    2,
    "0"
  )}:${`${timer.getMinutes()}`.padStart(
    2,
    "0"
  )}: ${`${timer.getSeconds()}`.padStart(2, "0")}`;
  todayShowTime.textContent = formateTimer;
}, 1000);
