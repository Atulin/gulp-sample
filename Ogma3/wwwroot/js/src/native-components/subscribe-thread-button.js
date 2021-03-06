import {LitElement, html} from 'https://cdn.skypack.dev/pin/lit-element@v2.4.0-wL9urDabdrJ7grkk3BAP/min/lit-element.js';

export class SubscribeThreadButton extends LitElement {
    static get properties() {
        return {
            endpoint: { type: String },
            threadId: { type: Number },
            subscribed: { type: Boolean, attribute: false },
            csrf: { type: String, attribute: false }
        }
    }
    
    constructor() {
        super();
        this.csrf = document.querySelector('input[name=__RequestVerificationToken]').value;
    }
    
    connectedCallback() {
        super.connectedCallback();

        axios.get(`${this.endpoint}/thread?threadId=${this.threadId}`)
            .then(res => {
                this.subscribed = res.data;
            })
            .catch(console.error);
    }

    render() {
        return html`
            <button class="action-btn ${this.subscribed ? 'active' : ''}" @click="${this._vote}" title="${this.subscribed ? 'Unsubscribe' : 'Subscribe'}">
                <i class="material-icons-outlined">${this.subscribed ? 'notifications_active' : 'notifications'}</i>&nbsp;
                ${this.subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
        `;
    }
    
    _vote() {
        if (!this.subscribed) {
            fetch(`${this.endpoint}/thread`, {
                    method: 'POST',
                    body: JSON.stringify({ threadId: this.threadId }),
                    headers: { "RequestVerificationToken": this.csrf, 'Content-Type': 'application/json' }
                })
                .then(data => data.json())
                .then(json => this.subscribed = json)
                .catch(console.error);
        } else {
            fetch(`${this.endpoint}/thread`, {
                    method: 'DELETE',
                    body: JSON.stringify({ threadId: this.threadId }),
                    headers: { "RequestVerificationToken": this.csrf, 'Content-Type': 'application/json' }
                })
                .then(data => data.json())
                .then(json => this.subscribed = json)
                .catch(console.error);

        }
    }

    createRenderRoot() {
        return this;
    }
}

window.customElements.define('o-subscribe', SubscribeThreadButton);
