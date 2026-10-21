

export default class Footage {
  id: number;
  eventName: string;
  eventDate: string;
  footageURI: string;

  constructor(id:number, name:string, date:string, uri:string) {
    this.id = id;
    this.eventName = name;
    this.eventDate = date;
    this.footageURI = uri;
  }

  renderHtmlString(): string {
    const htmlString = `
      <article id="footage-item-${this.id}">
        <h1>${this.eventName} - ${this.eventDate}</h1>
        <a href="${this.footageURI}">Link to the footage</a>
        <a class="archive-button" id="footage-archive-${this.id}">Archive</a>
      </article>
    `;

    return htmlString;
  }
}


