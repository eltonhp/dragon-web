import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DragonService} from '../../../core/services/dragon.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';

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
        type: ['']
    };


  constructor(private fb: FormBuilder,
              private dragonService: DragonService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
      this.dragonFormGroup = this.fb.group(this.controlsConfig);
      const {id} = this.route.snapshot.params;
      if(id) {
          this.getEntityById(id);
      }

      console.log(this.route.snapshot);
  }

   onSubmit(event: Event) {
      event.preventDefault();
       this.subscriptions.push(this.dragonService.save(this.dragonFormGroup.value)
           .subscribe(result => {
                console.log(result);
                this.router.navigate(['/nav/dragon']);
          }, error => {
                 console.log('error ao salvar: ', error);
      }));
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
}
