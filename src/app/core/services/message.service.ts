import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {Router} from '@angular/router';

/**
 * @author Elton H. Paula
 */
@Injectable({
    providedIn: 'root'
})
export class MessageService extends AlertService{

    constructor(public router: Router) {
        super(router)
    }

    errorMessage(status: number | undefined) {
        let message = '';
        switch (status) {
            case 500:
                message = 'Error interno no servidor ';
                break;
            case 404:
                message = `Cod: ${status} - Registro não encontrado no servidor interno `;
                break;

            default:
                message = `Cod: ${status} `;

        }
        return message;
    }
}
