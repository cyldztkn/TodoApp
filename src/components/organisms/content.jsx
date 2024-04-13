import AsideLeft from "./aside-left";
import AsideRight from "./aside-right";
import MainSection from "./main-section";
const Content = () => {
  let controlAsideLeft = () => {
    const leftAside = document.querySelector(".aside-left");
    leftAside.classList.toggle("open");
    
  };

  let controlAsideRight = () => {
    const rightAside = document.querySelector(".aside-right");
    rightAside.classList.toggle("open");
  };

 


  return (
    <section className="main-content">
      <AsideLeft />
      <MainSection

        controlLeft={controlAsideLeft}
        controlRight={controlAsideRight}
      />
      <AsideRight />
    </section>
  );
};

export default Content;
