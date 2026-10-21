import Footage from "./Footage.js";

const API_URI = "http://localhost:3000";

function init() {
  document.getElementById("submitForm")?.addEventListener("click", (event) => {
    event.preventDefault();
    addFootage();
  });
  getFootageListAndDisplay();
}

function getFootageListAndDisplay() {
  const container = document.getElementById("footageList") as HTMLDivElement;
  container.innerHTML = "";

  fetch(API_URI + "/api/footage")
    .then((response) => response.json())
    .then((data) => {
      // turn every plain object from the API into a Footage instance and render it
      data.forEach((element: Footage) => {
        const footageInstance = new Footage(element.id, element.eventName, element.eventDate, element.footageURI);
        container.insertAdjacentHTML("beforeend", footageInstance.renderHtmlString());
      });

      // the archive buttons only exist after rendering, so add the listeners now
      document.querySelectorAll(".archive-button").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.id.replace("footage-archive-", "");
          archiveFootage(id);
        });
      });
    })
    .catch((e) => {
      console.error(e);
    });
}

function archiveFootage(id: string) {
  fetch(API_URI + "/api/footage/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      archived: true,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      document.getElementById("footage-item-" + id)?.remove();
    })
    .catch((e) => {
      console.error(e);
    });
}

function addFootage() {
  const nameElement = document.getElementById("eventName") as HTMLInputElement;
  const dateElement = document.getElementById("eventDate") as HTMLInputElement;
  const URIElement = document.getElementById("footageURI") as HTMLInputElement;
  // id -1: the database will give the item its real id
  const footageItem = new Footage(-1, nameElement.value, dateElement.value, URIElement.value);

  fetch(API_URI + "/api/footage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(footageItem),
  })
    .then((response) => response.json())
    .then(() => {
      getFootageListAndDisplay();
    })
    .catch((e) => {
      console.error(e);
    });
}

init();
