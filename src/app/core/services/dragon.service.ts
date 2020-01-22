import { Injectable } from '@angular/core';
import {CrudService} from './http/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/**
 * @author Elton H. Paula
 */
@Injectable({
  providedIn: 'root'
})
export class DragonService extends  CrudService {

  url = environment.DRAGON_URL;
  endpoint = '/api/v1/dragon';

  constructor(public http: HttpClient) {
      super(http);
  }


}
