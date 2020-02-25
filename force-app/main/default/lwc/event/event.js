import { LightningElement, track } from 'lwc';

export default class Event extends LightningElement {
    // ModalBox 
    @track showModalBox = false;
    openmodal() {
        this.showModalBox = true;
    }
    closeModal() {
        this.showModalBox = false;
    } 
    linkMethod() {
        alert('link clicked');
        this.closeModal();
    }
}