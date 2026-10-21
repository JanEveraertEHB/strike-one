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
        console.log(element)
        const footageInstance = new Footage(element.id, element.eventName, element.eventDate, element.footageURI);
        container.insertAdjacentHTML("beforeend", footageInstance.renderHtmlString())
      })

      document.querySelectorAll(".archive-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const button = event.target as HTMLLinkElement;
          const id = button.id?.replace("footage-archive-", "");

          console.log(id)

          fetch(API_URI + "/api/footage/" + id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              archived: true
            })
          }).then(r => r.json())
            .then((data) =>{
              document.getElementById("footage-item-"+id)?.remove()
            })

        })
      })

    })
}

function addPost() {
  const nameElement = document.getElementById("eventName") as HTMLInputElement;
  const dateElement = document.getElementById("eventDate") as HTMLInputElement;
  const URIElement = document.getElementById("footageURI") as HTMLInputElement;
  const footageItem = new Footage(-1, nameElement.value, dateElement.value, URIElement.value);

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