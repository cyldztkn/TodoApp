import foldersData from "../../getData/folderFetch";
import FolderCard from "../molecules/folderCard.jsx";
// import { Link } from "react-router-dom";
let folders = [];

const AsideLeft = () => {
  for (let i = 0; i < foldersData.length; i++) {
    folders.push(foldersData[i].fields);
  }
  let userScreenWidth = window.innerWidth;

  return (
    <aside
      className={`aside-left  ${userScreenWidth > 1024 && "open"}`}
      id="left"
    >
      {/* <FolderCard></FolderCard> */}
      {folders.map((item, index) => {
        return (
          <a key={index} href={`/TodoApp/${item.FolderNames.toLowerCase()}`}>
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
