import { Injectable } from '@angular/core';
import {CrudService} from './http/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from './message.service';
import {Dragon} from '../model/dragon';
import {switchMap, tap} from 'rxjs/operators';

/**
 * @author Elton H. Paula
 */
@Injectable({
  providedIn: 'root'
})
export class DragonService extends  CrudService<Dragon> {

  url = environment.DRAGON_URL;
  endpoint = '/api/v1/dragon';

  constructor(public http: HttpClient, protected  alertService: MessageService) {
      super(http, alertService);
  }

  save(dragon: Dragon) {
      return this.post(dragon).pipe(
          tap(value => console.log('valor a ser salvo', value)),
          switchMap(value => {
              return 'Dragon Salvo com Sucesso!';
          })
      );
  }


}
