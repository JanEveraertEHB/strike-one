

export default class Footage {
  eventName: string;
  eventDate: string;
  footageURI: string;

  constructor( name:string, date:string, uri:string) {
    this.eventName = name;
    this.eventDate = date;
    this.footageURI = uri;
  }

  renderHtmlString(): string {
    const htmlString = `
      <article>
        <h1>${this.eventName} - ${this.eventDate}</h1>
        <a href="${this.footageURI}">Link to the footage</a>
      </article>
    `;

    return htmlString;
  }
}


