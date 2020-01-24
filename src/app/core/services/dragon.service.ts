import { Injectable } from '@angular/core';
import {CrudService} from './http/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from './message.service';
import {Dragon} from '../model/dragon';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
      let observable: Observable<any> = null;
      let message = null;
      if (dragon.id) {
          observable = this.put(dragon.id, dragon);
          message = 'Dragon Alterado com Sucesso!';
      } else {
          message = 'Dragon Inserido com Sucesso!';
          observable = this.post(dragon);
      }

      return observable.pipe(switchMap(value => message));
  }


}
