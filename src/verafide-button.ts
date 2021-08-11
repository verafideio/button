import { LitElement, html, customElement, property, css } from 'lit-element';

/**
 * An example element.
 *
 * @csspart button - The button
 */
@customElement('verafide-button')
export class VerafideButton extends LitElement {
    static styles = css`
        :host {
            font-family: sans-serif;
            color: #333;
            margin: 0px;
        }

        h1 {
            margin-top: 100px;
            text-align: center;
        }

        p {
            text-align: center;
        }

        .verify {
            margin: 0 auto;
            margin: 0 auto;
            text-align: center;
            background-color: rgb(26, 32, 67);
            font-weight: bold;
            color: white;
            font-size: 13px;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 1.5s ease;
            border: 0px solid;
        }

        .verify.confirming {
            transition: background-color 1.5s ease;
            background-color: #ffab3e;
        }

        .verify.verified {
            transition: background-color 1.5s ease;
            background-color: #11b75d;
        }

        .verify.failed {
            transition: background-color 1.5s ease;
            background-color: #d43636;
        }

        .verify:disabled {
            cursor: 'not-allowed';
        }

        .background {
            position: fixed;
            top: 0px;
            left: 0px;
            bottom: 0px;
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            opacity: 0;
            transition: opacity 1s;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            z-index:999999;
        }

        .background button {
            cursor: pointer;
        }

        .background.show {
            transition: opacity 1s;
            opacity: 1;
        }

    `;

    @property()
    appKey;

    @property()
    hostname = 'https://app.verafide.io';

    @property()
    windowObjectReference;

    @property()
    template = html``;

    @property()
    background = '';

    @property()
    newQr = { token: '' };

    @property()
    intervalLoop;

    @property()
    verifiedText = 'Loading';

    @property()
    verifiedClass = 'loading';

    @property()
    redirect = '';

    @property()
    loading = false;

    @property()
    error = false;

    constructor() {
        super();
    }

    private async initQr() {
        // Create presentation request
        const { redirect } = await this.createPresentationRequest();

        return redirect;
    }

    firstUpdated(changedProps) {
        fetch(
            `${this.hostname}/apps/validate/${this.appKey}`
        ).then((res) => {
            this.loading = false;
            this.verifiedText = 'Verify with Verafide';
            if (!res.ok) {
                res.json().then((json) => {
                    this.verifiedText = json.message;
                    this.verifiedClass = 'failed';
                    this.error = true;
                });
            }
        });
        super.firstUpdated(changedProps);
    }

    closeOverlay() {
        this.background = '';
    }

    render() {
        return html`
            <button
                class="verify ${this.verifiedClass}"
                href="${this.redirect}"
                target="VerifyVC"
                ?disabled=${this.error || this.loading}
                @click=${() => this.openVerify()}
            >
                ${this.verifiedText}
            </button>
            ${this.background ? html`<div class="background ${this.background}">
                <p>Don't see the secure Verafide window?</p>
                <button
                    type="button"
                    @click=${() => this.openVerify()}
                >Open window</button>
                <button
                    type="button"
                    style="position: absolute; font-size: 1.3em; top: 10px; right: 10px; background: 0; border: 0; color: #fff;"
                    @click=${() => this.closeOverlay()}
                >Close</button>
            </div>` : ''}
        `;
    }

    private async openVerify() {
        if (!this.windowObjectReference || this.windowObjectReference.closed) {
            this.background = 'show';

            // Stop any existing polls
            // if (this.newQr.token) clearInterval(this.intervalLoop);
            //
            const windowUrl = await this.initQr();

            const width = 400;
            const height = 500;

            const left = window.outerWidth / 2 - width / 2 + window.screenX;
            const top = window.outerHeight / 2 - height / 2 + window.screenY;

            this.poll(this.newQr.token);

            this.windowObjectReference = window.open(
                windowUrl,
                'VerifyVC',
                'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=' +
                width +
                ',height=' +
                height +
                ',left=' +
                left +
                ',top=' +
                top
            );
        } else {
            this.windowObjectReference.focus();
        }
    }

    /**
     * Poll for VC Outcome
     */
    private poll(token) {
        return;
        this.intervalLoop = setInterval(async () => {
            const url = '/present/poll';
            const payload = { token };
            const response = await this.sendPostRequest(url, payload);
            const responseText = await response.text();
            let pollQr;
            try {
                pollQr = JSON.parse(responseText);
            } catch (e) {
                pollQr = '';
            }

            // Verified
            if (pollQr.state === 5) {
                this.verifiedClass = 'verified';
                this.verifiedText = 'Verified';

                this.emitEvent(true, pollQr.vcblob);
                setTimeout(() => this.background = '', 4000);
                clearInterval(this.intervalLoop);
                this.updatePresentationRequest(3); // Delete from DB
                return;
            }

            // Failed to verify
            if (pollQr.state === 4) {
                this.verifiedClass = 'failed';
                this.verifiedText = 'Failed to Verify';

                this.emitEvent(false, pollQr.vcblob);
                setTimeout(() => this.background = '', 4000);
                clearInterval(this.intervalLoop);
                this.updatePresentationRequest(3); // Delete from DB
                return;
            }
        }, 1000);
    }

    /**
     * Dispatches a custom event
     *
     * @param verified
     * @param credential
     */
    private emitEvent(verified: boolean, credential: string) {
        const event = new CustomEvent('verification', {
            detail: {
                verified,
                credential,
            },
            bubbles: true,
            composed: true,
        });
        window.dispatchEvent(event);
    }

    /**
     * Creates new presentation request
     */
    private async createPresentationRequest() {
        const url = '/present/app';
        const payload = { appKey: this.appKey };
        const response = await this.sendPostRequest(url, payload);
        return response.json();
    }

    /**
     * Updates the presentation request
     */
    private updatePresentationRequest(state) {
        const endpoint = '/present/update';
        const payload = {
            token: this.newQr.token,
            state,
        };
        this.sendPostRequest(endpoint, payload);
    }

    /**
     * Sends POST request
     * @param url
     * @param payload
     */
    private sendPostRequest(url, payload) {
        return fetch(
            this.hostname + url,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'verafide-button': VerafideButton;
    }
}
