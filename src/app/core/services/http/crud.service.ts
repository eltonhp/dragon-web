import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Config} from './config';
import {MessageService} from '../message.service';
import {throws} from 'assert';
import {Dragon} from '../../model/dragon';

export abstract class CrudService<T = any> {
    abstract endpoint: any;
    url: any;

    protected constructor(protected http: HttpClient, protected alertService: MessageService) {}

    public get<G>(request = null): Observable<G>  {
        const header = Config.httpOptions.headers;
        const uri = request ? `${this.endpoint}/${request}` : `${this.endpoint}`;
        return this.http.get<G>(uri, {headers:  header })
                   .pipe( catchError(this.handleError('get', [])));

    }

    public getList(): Observable<T[] | null> {
        return this.get<T[]>();
    }

    public getById(id: number | string): Observable<T | null> {
        return this.get<T>('' + id);
    }

    public put<G>(id: number | string, body): Observable<G> {
        const header = Config.httpOptions.headers;
        return this.http.put<G>(`${this.endpoint}/${id}`, body, {headers: header})
                   .pipe(catchError(this.handleError('put', [])));
    }

    public post<G>(body): Observable<G> {
        const header = Config.httpOptions.headers;
        return this.http.post<G>(this.endpoint, body, {headers:  header })
                   .pipe(catchError(this.handleError('post', [])));
    }

    public async deleteById(id: number | string): Promise<any> {
        let response = null;
        try {
            response = await this.http
                .delete(`${this.endpoint}/${id}`)
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
            if (operation === 'get') {
                this.alertService.error(error.status, `${operation} failed: ${error.message}`);
                return of(result as any);

            } else {
                return throwError(error);
            }

        };
    }


    public errorHandler(
        method: string,
        error: HttpErrorResponse,
    ): Promise<never> {
        console.error(
            `Error occurred during ${method} ${this.endpoint}`,
            error,
        );
        return Promise.reject(error);
    }


}
