import Calendar from "../molecules/calendar";

let fetchData = [];

let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tblqd6mo5Tufa6FaH?sort%5B0%5D%5Bfield%5D=Modified&sort%5B0%5D%5Bdirection%5D=desc`;

let getAllRecords = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer patBb87UoH7v7O4OH.e980695bd267f9bddf8566d219b5e915f7c9e7655f37fa9df464afef9234e9ae`,
    },
  })
    .then(async (res) => res.json())
    .then(async (data) => (fetchData = data.records));
};

await getAllRecords();

// console.log( typeof fetchData );
console.log( fetchData );

let mutableFetchData = [...fetchData];
// console.log(fetchData);

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
    // console.log(item)

    let splitTime = item.fields.Time.split("-");
    // console.log(Number(splitTime[1]));
    let time = monthNames[Number(splitTime[1]) - 1] + Number(splitTime[2]);
    // console.log(Number(splitTime[1]));
    // console.log(monthNames[5])
    item.fields.Time = time;
    // console.log(time, "time");
    // console.log(monthNames[Number(splitTime[1])] + splitTime[2])
  });

  for (let i = 0; i < mutableFetchData.length; i++) {
    calendarData.push({
      status: mutableFetchData[i].fields.Status,
      link: mutableFetchData[i].fields.OriginalURL,
      time: mutableFetchData[i].fields.Time,
    });
  }
};

editData(mutableFetchData);
// console.log(calendarData)

const AsideRight = () => {
  return (
    <aside className="aside-right" id="right">
      <Calendar allRecords={calendarData} />
    </aside>
  );
};



export default AsideRight;
