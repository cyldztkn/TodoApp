import Icon from "@mdi/react";
import {
  mdiCollage,
  mdiMagnify,
  mdiPlusCircle,
  mdiBellOutline,
  mdiAccount,
} from "@mdi/js";
import Button from "../atoms/button";

function searchHandler(e) {
  e.preventDefault();
  console.log("asd");
}

const Menu = () => {
  let userScreenWidth = window.innerWidth;

  if (userScreenWidth < 1024) {
    return (
      <nav>
        <a href="/TodoApp/">
          <Icon path={mdiCollage} size={1.5} className="selected" />
        </a>
        <Icon path={mdiMagnify} size={1.5} />
        <a href="/TodoApp/add">
          <Icon path={mdiPlusCircle} size={1.5} />
        </a>
        <Icon path={mdiBellOutline} size={1.5} />
        <Icon path={mdiAccount} size={1.5} />
      </nav>
    );
  } else {
    return (
      <nav>
        <a href="/TodoApp/">
          <Icon path={mdiCollage} size={1.5} />
        </a>

        <form htmlFor="nav-search" onSubmit={searchHandler}>
          <input
            type="search"
            name="Search"
            id="nav-search"
            placeholder="Search..."
            disabled
          />
          <Icon path={mdiMagnify} size={1.5} />
        </form>
        <a href="/TodoApp/add">
          <Button type="nav" inner="Not Ekle" />
        </a>

        <Icon path={mdiBellOutline} size={1.5} />
        <Icon path={mdiAccount} size={1.5} />
      </nav>
    );
  }
};

export default Menu;
