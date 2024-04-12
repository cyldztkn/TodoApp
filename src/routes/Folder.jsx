// import NoteCard from "../components/molecules/NoteCard.jsx";
import NoteCard from "../components/molecules/noteCard.jsx";

let path = window.location.pathname;
let currectFolderName = path.split("/").slice(-1)[0];
// let currentFolderNode = foldersData.find(item => item.fields.FolderNames.toLowerCase() == currectFolderName);
// let airtableFolderId = currentFolderNode.fields.airtableFolderId;
// console.log(airtableFolderId);

// let airtableFolderId = "asd"

console.log(currectFolderName);
// console.log(path);
// console.log(currectFolderName.includes("add"));
// console.log(currectFolderName != "");
// console.log(currectFolderName.includes("file"));

let notesData = [];
// let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tbld9RNTilkhKyf0Q/`;
// let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/${currectFolderName}?sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=desc`;
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
  console.log(notesData)
  // console.log('fetch atıldı')
}

// if (currectFolderName != "" || currectFolderName.includes('file') ||  currectFolderName.includes('add') ) {
//   await fethchingFolders();
// }

let Folder = () => {
  // console.log(notesData)
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
