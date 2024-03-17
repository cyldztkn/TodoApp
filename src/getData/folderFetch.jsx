let foldersData = [];
let url = "https://api.airtable.com/v0/appquUwAzZkY7xoxV/tblFmJ2XO9RuMFPA0";
let fethchingFolders = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer patBb87UoH7v7O4OH.e980695bd267f9bddf8566d219b5e915f7c9e7655f37fa9df464afef9234e9ae`,
    },
  })
    .then(async (res) => await res.json())
    .then(async (data) => await (foldersData = data.records));
};

await fethchingFolders();
// console.log(foldersData);

export default foldersData;
