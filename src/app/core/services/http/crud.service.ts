import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Config} from './config';
import {MessageService} from '../message.service';

export abstract class CrudService<T = any> {
    abstract endpoint: any;
    url: any;

    protected constructor(protected http: HttpClient, protected alertService: MessageService) {}

    public get<G>(request = null): Observable<G>  {
        const header = Config.httpOptions.headers;
        const uri = request ? `${this.endpoint}/${request}` : `${this.endpoint}`;
        return this.http.get<G>(uri, {headers:  header })
                   .pipe(catchError(this.handleError('get', [])));

    }

    public getList(): Observable<T[] | null> {
        return this.get<T[]>();
    }

    public getById(id: number | string): Observable<T | null> {
        return this.get<T>('' + id);
    }

    public async post(body): Promise<any> {
        let response = null;
        try {
            response = await this.http
                .post(`${this.url}/${this.endpoint}`, body)
                .toPromise();
        } catch (error) {
            response = this.errorHandler('POST', error);
        }
        return response;
    }

    public async deleteById(id: number | string): Promise<any> {
        let response = null;
        try {
            response = await this.http
                .delete(`${this.url}/${this.endpoint}/${id}`)
                .toPromise();
        } catch (error) {
            response = this.errorHandler('DELETE', error);
        }
        return response;
    }


    private handleError (operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.alertService.error(error.status, `${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as any);
        };
    }


    public errorHandler(
        method: string,
        error: HttpErrorResponse,
    ): Promise<never> {
        console.error(
            `Error occurred during ${method} ${this.url}/${this.endpoint}`,
            error,
        );
        return Promise.reject(error);
    }


}
