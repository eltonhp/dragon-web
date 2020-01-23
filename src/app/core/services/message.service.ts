import {Injectable} from '@angular/core';

/**
 * @author Elton H. Paula
 */
@Injectable({
    providedIn: 'root'
})
export class MessageService  {

    constructor() {}

    error(status: number | undefined, s: string) {
        let message = s;
        switch (status) {
            case 500:
                message = 'Error interno no servidor';
                break;

        }

          console.error(message);
    }
}
