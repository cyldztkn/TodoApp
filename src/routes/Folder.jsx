// import NoteCard from "../components/molecules/NoteCard.jsx";
import NoteCard from "../components/molecules/noteCard.jsx";

let notesData = [];
let url = "https://api.airtable.com/v0/appquUwAzZkY7xoxV/tbld9RNTilkhKyf0Q";
let fethchingFolders = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer patBb87UoH7v7O4OH.e980695bd267f9bddf8566d219b5e915f7c9e7655f37fa9df464afef9234e9ae`,
    },
  })
    .then(async (res) => res.json())
    .then(async (data) => (notesData = data.records));
};
await fethchingFolders();
let Folder = () => {
  console.log(notesData)
  return (
    <main>

      {notesData.map((item, index) => {
        return(<NoteCard
          key={index}
          id={item.id}
          status={item.fields.Status}
          time={item.fields.Time}
          body={item.fields.body}
          attachment={item.fields.Attachments}
          folder={item.fields.FolderNames}
          
          
          />)
      })}
    </main>
  );
};

export default Folder;
