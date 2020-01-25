import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DragonService} from '../../../core/services/dragon.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {Subscription} from 'rxjs';
import {DatePipe, Location} from '@angular/common';
import {MessageService} from '../../../core/services/message.service';

/**
 * @author Elton H. Paula
 */
@Component({
  selector: 'app-dragon-edit',
  templateUrl: './dragon-edit.component.html',
  styleUrls: ['./dragon-edit.component.scss']
})
export class DragonEditComponent implements OnInit, OnDestroy {
  public dragonFormGroup: FormGroup;
  public subscriptions: Subscription[] = [];
  controlsConfig: any = {
        id: [],
        name: ['', [Validators.required,  Validators.minLength(4)]],
        type: ['', [Validators.required]]
    };


  constructor(private fb: FormBuilder,
              private dragonService: DragonService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {
      this.dragonFormGroup = this.fb.group(this.controlsConfig);
      const {id} = this.route.snapshot.params;
      if(id) {
          this.getEntityById(id);
      }
  }

   onSubmit(event: Event) {
      event.preventDefault();
      if(this.dragonFormGroup.valid) {
          this.subscriptions.push(this.dragonService.save(this.dragonFormGroup.value)
              .subscribe((result:string) => {
                  this.messageService.success(result, true, true, 'top', 'right');
                  this.router.navigate(['/nav/dragon']);


              }, error => {
                  const msg = `${error} - Error no servidor, o registro não foi salvo.`;
                  this.messageService.error(msg, 'danger', true);

              }));
      } else {
          this.validateAllFormFields(this.dragonFormGroup);
      }

   }

    private getEntityById(id: any) {
        this.subscriptions.push(this.dragonService.getById(id).subscribe(result => {
            this.dragonFormGroup.patchValue(result);
        }));
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(subscription => {
           subscription.unsubscribe();
      });
    }

    onBack() {
        this.location.back();
    }

    from(name) {
        return this.dragonFormGroup.get(name)
    }

    /**
     * valida se todos os campos do formulario está válido
     * @param formGroup
     *        grupo de campos do formulário
     */
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
