import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// Enumerators
export enum MessageType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
    Information = 'info',
    Question = 'question'
}

@Injectable()
export class MessagesService {

    constructor() {}

    public loading(show: boolean) {
        if (show && !Swal.isVisible()) {
            Swal.fire({
                position: 'center',
                html: '<img rel="preload" src="../../../assets/images/spinners/loading_double_026px.svg"> <br> Please, wait',
                toast: true,
                showConfirmButton: false,
                allowOutsideClick: false
            });
        } else {

        }
    }

    public message(msgType: MessageType, isTemp: boolean, msgTitle: string, msgText?: string, msgFooter?: string) {
        const msgTemp: any = (isTemp ? 1500 : null);
        Swal.fire({
            title: msgTitle,
            html: msgText,
            footer: msgFooter,
            icon: msgType,
            position: 'center',
            timer: msgTemp,
            toast: (msgTemp === null ? false : true),
            showCancelButton: true,
            showConfirmButton: (msgTemp === null ? true : false),
            allowOutsideClick: false
          });
    }

    public transaction(msgType: MessageType, isTemp: boolean, msgTitle: string, msgText?: string, msgFooter?: string) {
        const msgTemp: any = (isTemp ? 1500 : null);
        Swal.fire({
            title: msgTitle,
            html: msgText,
            footer: msgFooter,
            icon: msgType,
            position: 'center',
            timer: msgTemp,
            toast: (msgTemp === null ? false : true),
            showCancelButton: true,
            showConfirmButton: (msgTemp === null ? true : false),
            allowOutsideClick: false
          });
    }

}
