
export default function Contact() {
//   console.log(window.location.pathname);

  let path = window.location.pathname;
  let id = path.split("/").slice(-1)[0];
  console.log(id);

  return <div id="contact"></div>;
}
