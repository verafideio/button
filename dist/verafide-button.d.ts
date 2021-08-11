import { LitElement } from 'lit-element';
/**
 * An example element.
 *
 * @csspart button - The button
 */
export declare class VerafideButton extends LitElement {
    static styles: import("lit-element").CSSResult;
    appKey: any;
    hostname: string;
    windowObjectReference: any;
    template: import("lit-element").TemplateResult;
    background: string;
    newQr: {
        token: string;
    };
    intervalLoop: any;
    verifiedText: string;
    verifiedClass: string;
    redirect: string;
    loading: boolean;
    error: boolean;
    constructor();
    private initQr;
    firstUpdated(changedProps: any): void;
    closeOverlay(): void;
    render(): import("lit-element").TemplateResult;
    private openVerify;
    /**
     * Poll for VC Outcome
     */
    private poll;
    /**
     * Dispatches a custom event
     *
     * @param verified
     * @param credential
     */
    private emitEvent;
    /**
     * Creates new presentation request
     */
    private createPresentationRequest;
    /**
     * Updates the presentation request
     */
    private updatePresentationRequest;
    /**
     * Sends POST request
     * @param url
     * @param payload
     */
    private sendPostRequest;
}
declare global {
    interface HTMLElementTagNameMap {
        'verafide-button': VerafideButton;
    }
}
//# sourceMappingURL=verafide-button.d.ts.map