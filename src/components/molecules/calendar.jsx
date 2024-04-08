import { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenuRight, mdiMenuLeft } from "@mdi/js";
import PropTypes from "prop-types";

const Calendar = (props) => {
  // console.log(props.allRecords);
  let d = new Date();
  let realDate = new Date();

  let today = realDate.getDate();
  let realMonth = realDate.getMonth();

  let currentMonthDays;

  const [date, setDate] = useState(d);

  let month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getDaysInMonth = () => {
    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    // İlk günün gününü (Pazartesi'den başlayacak şekilde) düzeltme
    for (let i = 0; i < firstDay - 1; i++) {
      daysArray.unshift(null); // Boş hücreler ekleyelim
    }
    currentMonthDays = daysArray;

    // return daysArray;
  };
  getDaysInMonth();

  let calendarDayNames = ["P", "S", "Ç", "P", "C", "C", "P"];
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let todayDate = `${today}${monthNames[realMonth]}`;

  let getPervMonth = () => {
    d = new Date(year, month - 1, 1);
    month -= 1;
    setDate(d);
  };
  let getNextMonth = () => {
    d = new Date(year, month + 1, 1);
    month += 1;
    setDate(d);
  };

  // const addNotesInCalender = () => {
  //   props.allRecords.forEach((item) => {
  //     console.log(item);
  //     let element = document.getElementById(`${item.time}`);
  //     if (element) {
  //       console.log(element);
  //       let span = document.createElement("span");
  //       element.appendChild(span);
  //       // span.classList.add(`${item.status}`);
  //     }
  //   });
  // };

  // addNotesInCalender();

  return (
    <>
      <section className="months-control-container">
        <div className="calendar-button" onClick={getPervMonth}>
          <Icon path={mdiMenuLeft} size={1} />
          <p className="xs">{monthNames[month - 1]}</p>
        </div>
        <p className="s">{monthNames[month]}</p>

        <div className="calendar-button" onClick={getNextMonth}>
          <p className="xs">{monthNames[month + 1]}</p>
          <Icon path={mdiMenuRight} size={1} />
        </div>
      </section>

      <section className="calendar">
        {calendarDayNames.map((day, index) => (
          <div key={index} className="day ">
            <p className="s">{day}</p>
          </div>
        ))}

        {currentMonthDays.map((day, index) => (
          <div
            key={index}
            className={`cell ${day ? `${monthNames[month] + day}` : "empty"} ${
              `${day}${monthNames[month]}` == todayDate ? "today" : ""
            }`}
            id={day ? monthNames[month] + day : null}
          >
            {day && <p className="xs">{day}</p>}

            {props.allRecords.find(
              (element) => element.time === monthNames[month] + day
            ) ? (
              <a
                href={
                  "/file/" +
                  props.allRecords.find(
                    (element) => element.time === monthNames[month] + day
                  ).link
                }
                aria-labelledby={
                  `read the note with id ${props.allRecords.find(
                    (element) => element.time === monthNames[month] + day
                  ).link}`
                }
                className={
                  props.allRecords.find(
                    (element) => element.time === monthNames[month] + day
                  ).status
                }
              ></a>
            ) : null}

            {/* I create on^2 :)*/}
          </div>
        ))}
      </section>
    </>
  );
};

export default Calendar;

Calendar.propTypes = {
  allRecords: PropTypes.array,
};
