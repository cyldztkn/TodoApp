import Icon from "@mdi/react";
import {
  mdiCalendarBlankMultiple,
  mdiAttachment,
  // // mdiAccountGroup,
  mdiFolderMultipleOutline,
  mdiCheckboxMarkedCircleOutline,
  // mdiCheckboxMultipleMarkedCircleOutline,
  // mdiCheckCircle,
  // mdiTextBoxEditOutline,
} from "@mdi/js";
import Button from "../components/atoms/button";
import foldersData from "../getData/folderFetch";

// orjinal url
// let url = "https://api.airtable.com/v0/appquUwAzZkY7xoxV/tbld9RNTilkhKyf0Q";

function createNewRecord(formValues) {
  const [body, status, folder, date, fileArr] = formValues;
  let trueDate = date[1].replaceAll("-", ".");
  let file = {
    name: fileArr[1].name,
    type: fileArr[1].type,
  };
  let fileUrl = "https://www.dijitaleskiz.com.tr/wp-content/uploads/2024/04/dummy-file.webp";

  
  let url = `https://api.airtable.com/v0/appquUwAzZkY7xoxV/tblIrzIrYeWcRHOl0/`;

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer patBb87UoH7v7O4OH.e980695bd267f9bddf8566d219b5e915f7c9e7655f37fa9df464afef9234e9ae`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      fields: {
        Body: body[1],
        Time: trueDate,
        Status: status[1],
        Attachments: [
          {
            url: `${file.name ? fileUrl : null}`,
            filename: file.name,
          },
        ],
        FolderName: folder[1],
      },
    }),
  }).then((res) => console.log(res));
}

let xssDedector = (formData) => {
  const formValues = [...formData.entries()];

  const [
    statusFormVals,
    bodyFormVals,
    dateFormVals,
    fileFormVals,
    folderFormVals,
  ] = [
    formData.get("status"),
    formData.get("note-body"),
    formData.get("date"),
    formData.get("folder"),
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
    regexIsNotBad.test(folderFormVals) ||
    (fileFormVals && !regexRealySucks.test(fileFormVals))
  ) {
    alert(
      "Lütfen inputlarda bu karakterleri kullanmayın: >, <, \", ', =, ;, & ve dosya adında sadece alfanümerik karakterler, ., _, - kullanın -- Please do not use these characters in inputs: >, <, \", ', =, ;, & and use only alphanumeric characters, ., _, - in the file name"
    );
  } else if (
    regexSucks.test(bodyFormVals) ||
    regexSucks.test(statusFormVals) ||
    regexSucks.test(dateFormVals) ||
    regexSucks.test(folderFormVals) ||
    regexSucks.test(fileFormVals)
  ) {
    alert("are you hacker ?");
  } else {
    createNewRecord(formValues);
    // alert("ok");
  }
};
// console.log(foldersData);
let formHandler = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  xssDedector(formData);
  // const textAreaEl = document.getElementById("note-body");
  // const statusEl = document.getElementById("status");
  // const dateInputEl = document.getElementById("date-input");
  // const folderInputEl = document.getElementById("folder");
  // const fileInputEl = document.getElementById("file");

  // let folderId = folderInputEl.value;
  // let bodyValue = textAreaEl.value;
  // let statusValue = statusEl.value;
  // let dateValue = dateInputEl.value;
  // let attachmentValue = fileInputEl.value;

  // console.log(textAreaEl.value);
  // console.log(statusEl.value);
  // console.log(dateInputEl.value);
  // console.log(folderInputEl.value);
  // console.log(fileInputEl.value);

  // const formData = new FormData(e.target);
  // let formValues = [...formData.entries()];
  // console.log(formValues);
  // createNewRecord(formValues);
};

function reset() {
  window.history.back();
}

function Add() {
  return (
    <main>
      <div className="single-note-container">
        <form onSubmit={formHandler} onReset={reset}>
          <div className="form-area">
            <textarea
              id="note-body"
              name="note-body"
              // defaultValue={noteData.fields.body}
              placeholder="Notunuzu Yazın"
              required
            ></textarea>

            <label htmlFor="status">
              <Icon path={mdiCheckboxMarkedCircleOutline} size={0.8} />

              <select id="status" name="status" required>
                <option defaultValue="true" value="to-do">
                  Yapılacak
                </option>
                <option value="in-process">Yapılıyor</option>
                <option value="done">Yapıldı</option>
              </select>
            </label>

            <label htmlFor="folder">
              <Icon path={mdiFolderMultipleOutline} size={0.8} />

              <select id="folder" name="folder" required>
                <option value="" disabled={true}>
                  Dosya Seçin
                </option>

                {foldersData.map((item, key) => {
                  return (
                    <option key={key} value={item.fields.FolderNames}>
                      {item.fields.FolderNames}
                    </option>
                  );
                })}
              </select>
            </label>

            <label htmlFor="date-input">
              <Icon path={mdiCalendarBlankMultiple} size={0.8} />
              <input
              defaultValue={new Date().toISOString().slice(0, 10)}
                type="date"
                name="date"
                id="date-input"
                required
                // defaultValue={noteData.fields.Time}
              />
            </label>

            <label htmlFor="file">
              <Icon path={mdiAttachment} size={0.8} />
              Dosya Ekle
              <input type="file" name="file" id="file" />
            </label>
          </div>

          <label className="buttons">
            <Button
              type="reset"
              // onClick={() => navigate(-2)}
              inner="Vazgeç"
            />
            <Button
              type="submit"
              inner="Oluştur"
              // onClick={() => navigate(-2)}
              // onClick={goBack}
            />
          </label>
        </form>
      </div>
    </main>
  );
}

export default Add;
