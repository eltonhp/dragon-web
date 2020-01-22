import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Config} from './config';

export abstract class CrudService<T = any> {
    abstract endpoint: any;
    url: any;

    protected constructor(protected http: HttpClient) {}

    public get<G>(request = null): Observable<G>  {
        const header = Config.httpOptions.headers;
        const uri = request ? `${this.endpoint}/${request}` : `${this.endpoint}`;
        return this.http.get<G>(uri, {headers:  header });
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
