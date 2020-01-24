import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DragonService} from '../../../core/services/dragon.service';
import {Router} from '@angular/router';

/**
 * @author Elton H. Paula
 */
@Component({
  selector: 'app-dragon-edit',
  templateUrl: './dragon-edit.component.html',
  styleUrls: ['./dragon-edit.component.scss']
})
export class DragonEditComponent implements OnInit {
  public dragonFormGroup: FormGroup;
  controlsConfig: any = {
        name: ['', [Validators.required,  Validators.minLength(4)]],
        type: ['']
    };


  constructor(private fb: FormBuilder,
              private dragonService: DragonService,
              private router: Router) { }

  ngOnInit() {
      this.dragonFormGroup = this.fb.group(this.controlsConfig);
  }

   onSubmit(event: Event) {
      event.preventDefault();
       this.dragonService.save(this.dragonFormGroup.value)
           .subscribe(result => {
                console.log(result);
                this.router.navigate(['/nav/dragon']);
          }, error => {
                 console.log('error ao salvar: ', error);
          });
   }
}
