import { styles, CLOSE_ICON, MESSAGE_ICON } from "./assets.js";
// import axios from 'axios';


class MessageWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.injectStyles();
  }

  position = "";
  open = false;
  widgetContainer = null;

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  async initialize() {
    /**
     * Create and append a div element to the document body
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span element for the widget icon, give it a class of `widget__icon`, and update its innerHTML property to an icon that would serve as the widget icon.
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span element for the close icon, give it a class of `widget__icon` and `widget__hidden` which would be removed whenever the widget is closed, and update its innerHTML property to an icon that would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- `widget__hidden`, `widget__container`
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__hidden", "widget__container");

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();
    
    /**
     * Append the widget's content and the button to the container
    */
   container.appendChild(this.widgetContainer);
   container.appendChild(buttonContainer);
   document.getElementById('submit-hqzen-btn').addEventListener('click', event => {
    event.preventDefault();

    const url = 'http://localhost:8000/api-sileo/v1/board/embedded-card/create/';
    const subject = document.getElementById('floating-subject').value;
    const name = document.getElementById('floating-name').value;
    const email = document.getElementById('floating-email').value;
    const message = document.getElementById('floating-message').value;
  
    const data = {
      title: subject,
      description: JSON.stringify({'ops': [
        {'insert': `Name: ${name}`, 'attributes': {'fs': '24px'}}, {'insert': '\n'},
        {'insert': `Email: ${email}`, 'attributes': {'fs': '24px'}}, {'insert': '\n'},
        {'insert': `Message: ${message}`, 'attributes': {'fs': '24px'}}, {'insert': '\n'},
      ]}),
      column: 213,
      creator: 84202,
      is_public: true,
    };

    const form = new FormData();

    for (let item in data) {
      form.append(item, data[item]);
    }

    axios.post(url, form);
   })
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
        <header class="widget__header">
            <h3>Unlock your business potential with our seats!</h3>
            <p>We usually respond within a few hours</p>
        </header>
        <form>
            <div class="form__field">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="floating-name"
                  name="name"
                  placeholder="Enter your name"
                />
            </div>
            <div class="form__field">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="floating-email"
                  name="email"
                  placeholder="Enter your email"
                />
            </div>
            <div class="form__field">
                <label for="subject">Type of Business</label>
                <input
                  type="text"
                  id="floating-subject"
                  name="business_type"
                  placeholder="Enter type of business"
                />
            </div>
            <div class="form__field">
                <label for="subject">Number of seats</label>
                <input
                  type="number"
                  id="floating-subject"
                  name="no_seats"
                  placeholder="Enter number of seats"
                />
            </div>
            <div class="form__field">
                <label for="subject">Start date</label>
                <input
                  type="date"
                  id="floating-subject"
                  name="date"
                />
            </div>
            <div class="form__field">
                <label for="message">Anything specific you need?</label>
                <textarea
                  id="floating-message"
                  name="message"
                  placeholder="Enter your message"
                  rows="6"
                ></textarea>
            </div>
            <button id="submit-hqzen-btn">Let's Get Started</button>
        </form>
    `;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }
  }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();
