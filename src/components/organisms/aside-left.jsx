import foldersData from "../../getData/folderFetch";
import FolderCard from "../molecules/folderCard.jsx";
let folders = [];

const AsideLeft = () => {
  for (let i = 0; i < foldersData.length; i++) {
    folders.push(foldersData[i].fields);
  }

  return (
    <aside className="aside-left" id="left">
      {/* <FolderCard></FolderCard> */}
      {folders.map((item, index) => {
        return (
          <a key={index} href={`/${item.FolderNames.toLowerCase()}`}>
            <FolderCard
              id={item.id}
              key={index}
              cardName={item.FolderNames}
              icon={item.icon}
            />
          </a>
        );
      })}
    </aside>
  );
};

export default AsideLeft;
