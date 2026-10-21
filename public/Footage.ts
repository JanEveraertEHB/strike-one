export default class Footage {
  id: number;
  eventName: string;
  eventDate: string;
  footageURI: string;

  constructor(id: number, name: string, date: string, uri: string) {
    this.id = id;
    this.eventName = name;
    this.eventDate = date;
    this.footageURI = uri;
  }

  renderHtmlString(): string {
    const htmlString = `
      <article id="footage-item-${this.id}">
        <h2>${this.eventName} - ${this.eventDate}</h2>
        <a href="${this.footageURI}" target="_blank">Link to the footage</a>
        <button class="archive-button" id="footage-archive-${this.id}">Archive</button>
      </article>
    `;

    return htmlString;
  }
}
