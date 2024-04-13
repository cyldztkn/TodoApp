import Icon from "@mdi/react";
import {
  mdiCalendarBlankMultiple,
  mdiAttachment,
  mdiFileEyeOutline,
  mdiCheckboxMarkedCircleOutline,
  mdiCheckboxMultipleMarkedCircleOutline,
  mdiCheckCircle,
  mdiDeleteOutline,
  mdiClose,
} from "@mdi/js";
import Button from "../components/atoms/button";

let noteData = [];
let path = window.location.pathname;
let id = path.split("/").slice(-1)[0];
let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tbld9RNTilkhKyf0Q/${id}`;
let token = import.meta.env.VITE_TOKEN_KEY;

let fethchingFolders = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => res.json())
    .then(async (data) => (noteData = data));
};

if (path.includes("file")) {
  await fethchingFolders();
}

function updateNote(formValues) {
  const [note, status, date, fileArr] = formValues;

  let file = {
    name: fileArr[1].name,
    type: fileArr[1].type,
  };
  let fileUrl =
    "https://www.dijitaleskiz.com.tr/wp-content/uploads/2024/04/dummy-file.webp";

  fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      fields: {
        Status: status[1],
        Time: date[1],
        Body: note[1],
        Attachments: [
          {
            url: `${file.name ? fileUrl : null}`,
            filename: file.name,
          },
        ],
      },
    }),
  }).then((res) => console.log(res));
}

let xssDedector = (formData) => {
  const formValues = [...formData.entries()];
  const [statusFormVals, bodyFormVals, dateFormVals, fileFormVals] = [
    formData.get("status"),
    formData.get("note-body"),
    formData.get("date"),
    formData.get("file").name,
  ];

  let regexIsNotBad = /[<>'"=;&]/;
  let regexSucks =
    /\b(on(?:click|load|mouseover|mouseout|focus|blur|input|change))\b/i;
  let regexRealySucks = /^[a-zA-Z0-9_.-çğıöşüĞİÖŞÜ]+$/;

  if (
    regexIsNotBad.test(bodyFormVals) ||
    regexIsNotBad.test(statusFormVals) ||
    regexIsNotBad.test(dateFormVals) ||
    regexIsNotBad.test(fileFormVals) ||
    (fileFormVals && !regexRealySucks.test(fileFormVals))
  ) {
    alert(
      "Lütfen inputlarda bu karakterleri kullanmayın: >, <, \", ', =, ;, & ve dosya adında sadece alfanümerik karakterler, ., _, - kullanın -- Please do not use these characters in inputs: >, <, \", ', =, ;, & and use only alphanumeric characters, ., _, - in the file name"
    );
  } else if (
    regexSucks.test(bodyFormVals) ||
    regexSucks.test(statusFormVals) ||
    regexSucks.test(dateFormVals) ||
    regexSucks.test(fileFormVals)
  ) {
    alert("are you hacker ?");
  } else {
    updateNote(formValues);
    // alert("ok");
  }
};

let formHandler = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  xssDedector(formData);
};

function reset() {
  window.history.back();
}
function deleteHandler() {
  let deletePopUpEl = document.getElementById("delete-popup");
  deletePopUpEl.showModal();
  console.log("del");
}

function closeModal() {
  let deletePopUpEl = document.getElementById("delete-popup");
  deletePopUpEl.close();
}

function deleteNote() {
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      console.log("ok");
      setTimeout(() => {
        window.history.back();
      }, 1000);
    } else {
      alert("Bir hata oluştu. Lütfen Daha sonra Tekrar Deneyin");
    }
  });
  // setTimeout(() => {
  //   window.history.back();
  // }, 1000);
}

function File() {
  return (
    <main>
      <div className="single-note-container">
        <dialog id="delete-popup">
          <Icon path={mdiClose} size={1} onClick={closeModal} />
          <p className="">Notu Silmek İstediğinizden Emin Misiniz ?</p>
          <div>
            <Button type="delete" inner="Delete" deleteFunc={deleteNote} />
          </div>
        </dialog>
        <span className="delete-icon-container" onClick={deleteHandler}>
          <Icon path={mdiDeleteOutline} size={0.8} />
        </span>
        <form onSubmit={formHandler} onReset={reset}>
          <div className="form-area">
            <textarea
              id="note-body"
              name="note-body"
              defaultValue={noteData.fields.Body}
              rows="auto"
            ></textarea>

            <label htmlFor="status">
              {noteData.fields.Status === "to-do" ? (
                <Icon path={mdiCheckboxMarkedCircleOutline} size={0.8} />
              ) : noteData.fields.Status === "in-process" ? (
                <Icon
                  path={mdiCheckboxMultipleMarkedCircleOutline}
                  size={0.8}
                  color="var(--pending)"
                />
              ) : (
                <Icon path={mdiCheckCircle} size={0.8} color="var(--sucsess)" />
              )}

              <select
                id="status"
                defaultValue={noteData.fields.Status}
                name="status"
              >
                <option value="to-do">Yapılacak</option>
                <option value="in-process">Yapılıyor</option>
                <option value="done">Yapıldı</option>
              </select>
            </label>

            <label htmlFor="date-input">
              <Icon path={mdiCalendarBlankMultiple} size={0.8} />
              <input
                type="date"
                name="date"
                id="date-input"
                defaultValue={noteData.fields.Time}
              />
            </label>

            {noteData.fields.Attachments ? (
              <label htmlFor="file">
                <Icon path={mdiAttachment} size={0.8} />
                {noteData.fields.Attachments ? "Yeni Dosya Ekle" : "Dosya ekle"}
                <a href={noteData.fields.Attachments[0].url} target="_blank">
                  <Icon path={mdiFileEyeOutline} size={0.8} />
                  {noteData.fields.Attachments &&
                    noteData.fields.Attachments[0].filename}
                </a>
                <input type="file" name="file" id="file" />
              </label>
            ) : (
              <label htmlFor="file">
                <Icon path={mdiAttachment} size={0.8} />
                Dosya Ekle
                <input type="file" name="file" id="file" />
              </label>
            )}
          </div>

          <label className="buttons">
            <Button type="reset" inner="Vazgeç" />

            <Button type="submit" inner="Düzenle" />
          </label>
        </form>
      </div>
    </main>
  );
}

export default File;
