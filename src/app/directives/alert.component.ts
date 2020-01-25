import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from '../core/services/alert.service';
import {MessageService} from '../core/services/message.service';

declare var $: any;



@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

/**
 * @author Elton H. Paula
 */
export class AlertComponent implements OnInit, OnDestroy {
    // Tempo da mensagem de sucesso
    // (Acrescenta 5 segundos a mais, valor de delay padrão do componente)
    public static TIMER_SUCCESS = 1000;
    // Tempo da mensagem quando ela não for de sucesso
    // (Acrescenta 5 segundos a mais, valor de delay padrão do componente)
    public static TIMER_NO_SUCCESS = 5000;
    private subscription: Subscription;
    message: any;
    lastMessage: String;
    notificationOn = false;

    constructor(private messageService: MessageService) {

    }

    ngOnInit() {
        this.subscription = this.messageService.getMessage().subscribe(message => {
            if (message !== undefined && message.bootstrapNotify) {
                this.showNotification(message.from, message.align, message.type, message.text);
            } else {
                this.message = message;
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showNotification(from, align, type, msg) {
        const types = ['', 'info', 'success', 'warning', 'danger'];

        const typeAsResult = types.filter(value => value === type);
        let timerMessage: number;
        if (typeAsResult === undefined) {
            return;
        } else {
            if (typeAsResult[0] === 'success') {
                timerMessage = AlertComponent.TIMER_SUCCESS;
            } else {
                timerMessage = AlertComponent.TIMER_NO_SUCCESS;
            }
        }
        if (this.lastMessage !== undefined && msg === this.lastMessage) {
            $.notifyClose();
        }
        this.lastMessage = msg;
        $.notify({
            icon: 'notifications',
            message: msg
        }, {
            onShow: (event) => {
               this.notificationOn = true;
            },
            onClose: (event) => {
              this.notificationOn = false;
            },
            type: typeAsResult,
            timer: timerMessage,
            placement: {
                from: from,
                align: align
            },
            newest_on_top: true,
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }


}
