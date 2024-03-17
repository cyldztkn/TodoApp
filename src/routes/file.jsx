import Icon from "@mdi/react";
import {
  mdiCalendarBlankMultiple,
  mdiAttachment,
  mdiAccountGroup,
  mdiCheckboxMarkedCircleOutline,
  mdiTextBoxEditOutline,
} from "@mdi/js";
import { useNavigate } from "react-router-dom";

let noteData = [];
let path = window.location.pathname;
let id = path.split("/").slice(-1)[0];
let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tbld9RNTilkhKyf0Q/${id}`;
let fethchingFolders = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer patBb87UoH7v7O4OH.e980695bd267f9bddf8566d219b5e915f7c9e7655f37fa9df464afef9234e9ae`,
    },
  })
    .then(async (res) => res.json())
    .then(async (data) => (noteData = data));
};
await fethchingFolders();
console.log(noteData);

function File() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="single-note-container">
        <form onSubmit={console.log("submit")}>
          <div className="form-area">
            <textarea
              id="note-body"
              name="note-body"
              defaultValue={noteData.fields.body}
            ></textarea>

            <label htmlFor="">
              {" "}
              <Icon path={mdiCheckboxMarkedCircleOutline} size={0.8} />
              <select id="status">
                <option> to-do</option>
                <option>in Process</option>
                <option>Done</option>
              </select>
            </label>

            <label htmlFor="date-input">
              <Icon path={mdiCalendarBlankMultiple} size={0.8} />
              <input type="date" name="date" id="date-input" />
            </label>

            <label htmlFor="">
              <Icon path={mdiAttachment} size={0.8} />
              <input type="file" name="" id="" />
            </label>

            <label htmlFor="">
              <Icon path={mdiAccountGroup} size={0.8} />
              <select disabled name="" id="">
                <option>only you</option>
              </select>
            </label>
          </div>

          <label htmlFor="">
           

            <button onClick={() => navigate(-1)}> Back </button>run dev
            <button type="submit">
              {" "}
              <Icon path={mdiTextBoxEditOutline} size={1} /> Düzenle{" "}
            </button>
          </label>
        </form>
      </div>
    </main>
  );
}

export default File;
