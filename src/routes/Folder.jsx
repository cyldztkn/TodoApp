// import NoteCard from "../components/molecules/NoteCard.jsx";
import NoteCard from "../components/molecules/noteCard.jsx";

let path = window.location.pathname;
let currectFolderName = path.split("/").slice(-1)[0];


let notesData = [];
let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tblIrzIrYeWcRHOl0?view=${currectFolderName}`;
let token = import.meta.env.VITE_TOKEN_KEY;
let fethchingFolders = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => res.json())
    .then(async (data) => (notesData = data.records));
};

if (
  currectFolderName.includes("family") ||
  currectFolderName.includes("shoplist") ||
  currectFolderName.includes("works") ||
  currectFolderName.includes("ideas") ||
  currectFolderName.includes("study")
) {
  await fethchingFolders();
}

let Folder = () => {
  return (
    <main>
      {notesData.map((item, index) => {
        return (
          <NoteCard
            key={index}
            id={item.id}
            status={item.fields.Status}
            time={item.fields.Time}
            body={item.fields.Body}
            attachment={item.fields.Attachments}
            folder={item.fields.FolderNames}
          />
        );
      })}
    </main>
  );
};

export default Folder;
