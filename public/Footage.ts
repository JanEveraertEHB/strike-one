

export default class Footage {
  eventName: String;
  eventDate: String;
  footageURI: String;

  constructor( name:String, date:String, uri:String) {
    this.eventName = name;
    this.eventDate = date;
    this.footageURI = uri;
  }

  renderHtmlString(): String {
    const htmlString = `
      <article>
        <h1>${this.eventName} - ${this.eventDate}</h1>
        <a href="${this.footageURI}">Link to the footage</a>
      </article>
    `;

    return htmlString;
  }
}


