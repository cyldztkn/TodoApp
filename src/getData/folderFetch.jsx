let foldersData = [];
let url = "https://api.airtable.com/v0/appquUwAzZkY7xoxV/tblFmJ2XO9RuMFPA0";
let token = import.meta.env.VITE_TOKEN_KEY;

let fethchingFolders = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => await res.json())
    .then(async (data) => await (foldersData = data.records));
};

await fethchingFolders();

export default foldersData;
