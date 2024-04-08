import Icon from "@mdi/react";
import { mdiInboxArrowDown, mdiInboxArrowUp } from "@mdi/js";
import PropTypes from "prop-types";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../../routes/root";
import Add from "../../routes/Add.jsx";
import File from "../../routes/file.jsx";
import Folder from "../../routes/Folder.jsx";
import ErrorPage from "../../error.jsx";
// import Contact from "../../routes/contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:folder/",
    element: <Folder />,
  },
  {
    path: "/file/:id",
    element: <File />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/search",
    element: <Add />,
  },
]);

const MainSection = (props) => {
  let leftButtonRotate = () => {
    let leftButtonEl = document.querySelector(".left-button");
    if (leftButtonEl.style.transform == "rotate(-90deg)") {
      leftButtonEl.style.transform = "rotate(90deg)";
    } else {
      leftButtonEl.style.transform = "rotate(-90deg)";
    }
    props.controlLeft();
  };

  let rightButtonRotate = () => {
    let rightButtonEl = document.querySelector(".right-button");
    if (rightButtonEl.style.transform == "rotate(-90deg)") {
      rightButtonEl.style.transform = "rotate(90deg)";
    } else {
      rightButtonEl.style.transform = "rotate(-90deg)";
    }
    props.controlRight();
  };

  let leftButtonHandler = () => {
    let headerEl = document.querySelector("header");
    headerEl.classList.toggle("left-opened");
    leftButtonRotate();
  };

  let rightButtonHandler = () => {
    let headerEl = document.querySelector("header");
    headerEl.classList.toggle("right-opened");
    rightButtonRotate();
  };
  let path = window.location.pathname;
  let currectFolderName = path.split("/").slice(-1)[0];
  let pageTitle;
  if (path == "/") {
    pageTitle = "dashboard";
  } else if (
    currectFolderName == "family" ||
    currectFolderName == "works" ||
    currectFolderName == "ideas" ||
    currectFolderName == "study" ||
    currectFolderName == "shoplist"
  ) {
    pageTitle = currectFolderName;
  } else if (currectFolderName == "add") {
    pageTitle = "Add";
  } else {
    pageTitle = "Note";
  }

  return (
    <section className="middle">
      <header className="">
        <Icon
          path={mdiInboxArrowDown}
          size={1}
          rotate={-90}
          onClick={leftButtonHandler}
          className="left-button"
        />
        <h4>{pageTitle}</h4>{" "}
        <Icon
          path={mdiInboxArrowUp}
          size={1}
          rotate={-90}
          onClick={rightButtonHandler}
          className="right-button"
        />
      </header>
      {/* <main> */}
      <RouterProvider router={router} />
      {/* </main> */}
    </section>
  );
};

export default MainSection;

MainSection.propTypes = {
  controlLeft: PropTypes.func,
  controlRight: PropTypes.func,
};
