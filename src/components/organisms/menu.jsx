import Icon from "@mdi/react";
import {
  mdiCollage,
  mdiMagnify,
  mdiPlusCircle,
  mdiBellOutline,
  mdiAccount,
} from "@mdi/js";

const Menu = () => {
  let userScreenWidth = window.innerWidth;

  if (userScreenWidth < 1024) {
    return (
      <nav>
        {" "}
        <a href="http://localhost:5173/"><Icon path={mdiCollage} size={1.5} className="selected" /></a>
        <Icon path={mdiMagnify} size={1.5} />
       <a href="/add"> <Icon path={mdiPlusCircle} size={1.5} /></a>
        <Icon path={mdiBellOutline} size={1.5} />
        <Icon path={mdiAccount} size={1.5} />
      </nav>
    );
  } else {
    return (
      <nav>
        <Icon path={mdiCollage} size={1.5} />
        <div>
          <input type="search" name="Search" id="nav-search" />
          <Icon path={mdiMagnify} size={1} />
        </div>

        <div className="button">
          <Icon path={mdiPlusCircle} size={1.5} />
          Create Folder
        </div>
        <Icon path={mdiBellOutline} size={1.5} />
        <Icon path={mdiAccount} size={1.5} />
      </nav>
    );
  }

  // return <nav></nav>;
};

export default Menu;
