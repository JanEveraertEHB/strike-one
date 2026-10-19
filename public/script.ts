console.log("hello world");
import Footage from "./Footage.js";

const API_URI = "http://localhost:3000";



function init() {
  document.getElementById("submitForm")?.addEventListener("click", (ev) => {
    ev.preventDefault()
    addPost();
  })
  getFootageListAndDisplay();

}

function getFootageListAndDisplay() {
  const container = document.getElementById("footageList") as HTMLDivElement;
  container.innerHTML = "";
  fetch(API_URI + "/api/footage")
    .then(r => r.json())
    .then((data) => {
      data.forEach((element: Footage, index: Number) => {
        const footageInstance = new Footage(element.eventName, element.eventDate, element.footageURI);
        container.insertAdjacentHTML("beforeend", footageInstance.renderHtmlString())
      })

    })
}

function addPost() {
  const nameElement = document.getElementById("eventName") as HTMLInputElement;
  const dateElement = document.getElementById("eventDate") as HTMLInputElement;
  const URIElement = document.getElementById("footageURI") as HTMLInputElement;
  const footageItem = new Footage(nameElement.value, dateElement.value, URIElement.value);

  fetch(API_URI + "/api/footage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(footageItem)
  }).then((r) => r.json())
  .then(data => {
    console.log("received", data)
    getFootageListAndDisplay();
  })
  .catch((e) => {
    console.error(e)
  })

}



init();