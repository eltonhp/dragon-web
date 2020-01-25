import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {catchError} from 'rxjs/operators';

/**
 * @author Elton H. Paula
 */
@Injectable()
export class AlertService {

    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(public router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }
    success(message: string, bootstrapNotify = false, keepAfterNavigationChange = false, from = 'top', align = 'right') {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({from: from, align: align, type: 'success', text: message, bootstrapNotify: bootstrapNotify });
    }

    error(message: string, type = 'error', bootstrapNotify = false, keepAfterNavigationChange = false, from = 'top', align = 'right') {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({from: from, align: align, type: type, text: message, bootstrapNotify: bootstrapNotify});
    }

    message(message: string, type: string, bootstrapNotify = false, keepAfterNavigationChange = false, from = 'top', align = 'right') {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({from: from, align: align, type: type, text: message, bootstrapNotify: bootstrapNotify});
    }

    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    a(err, caught) {
        this.error(err.reason, 'danger', true);
        throw err;
    }
}
