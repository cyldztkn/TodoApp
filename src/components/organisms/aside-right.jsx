import Calendar from "../molecules/calendar";
import Icon from "@mdi/react";
import { mdiCalendarBlankMultiple } from "@mdi/js";

let fetchData = [];
let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tblIrzIrYeWcRHOl0/`;
let token = import.meta.env.VITE_TOKEN_KEY;

let getAllRecords = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => res.json())
    .then(async (data) => (fetchData = data.records));
};

await getAllRecords();

let mutableFetchData = [...fetchData];

let calendarData = [];

let editData = (mutableFetchData) => {
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

  mutableFetchData.map((item) => {

    let splitTime = item.fields.Time.split("-");
    let time = monthNames[Number(splitTime[1]) - 1] + Number(splitTime[2]);
    item.fields.Time = time;
  });

  for (let i = 0; i < mutableFetchData.length; i++) {
    calendarData.push({
      status: mutableFetchData[i].fields.Status,
      link: mutableFetchData[i].id,
      time: mutableFetchData[i].fields.Time,
    });
  }
};

editData(mutableFetchData);
let userScreenWidth = window.innerWidth;
const AsideRight = () => {
  return (
    <aside
      className={`aside-right  ${userScreenWidth > 1024 && "open"}`}
      id="right"
    >
      {userScreenWidth > 1024 ? (
        <Icon
          path={mdiCalendarBlankMultiple}
          size={1.5}
          className="calendar-icon"
        />
      ) : null}

      <Calendar allRecords={calendarData} />
    </aside>
  );
};

export default AsideRight;
