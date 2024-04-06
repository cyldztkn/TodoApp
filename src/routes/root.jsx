import DashboardCard from "../components/molecules/dashboardCard";
import foldersData from "../getData/folderFetch";
let folders = [];


function Dashboard() {
  for (let i = 0; i < foldersData.length; i++) {
    folders.push(foldersData[i].fields);
  }
  // console.log(folders);



  return (
    <main>
      {folders.map((item, index) => {
        return (
          <a key={index} href={`/${item.FolderNames.toLowerCase()}`}>
            <DashboardCard
              id={item.id}
              cardName={item.FolderNames}
              icon={item.icon}
            />
          </a>
        );
      })}
    </main>
  );
}

export default Dashboard;
