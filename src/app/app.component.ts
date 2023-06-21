import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Tom', 'Maya', 'Harry'];
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // )

    // this.signupForm.statusChanges.subscribe(
    //   (state) => {
    //     console.log(state);
    //   }
    // )

    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Annu',
    //     'email': 'annugupta71010@gmail.com'
    //   },
    //   'gender': 'female'
    // });

    // this.signupForm.patchValue({
    //   'userData': {
    //     'username': 'Arya'
    //   }
    // })

  }

  onSubmit(){
    console.log(this.signupForm);
    //this.signupForm.reset();
  }
  
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).controls.push(control);
  }

  getHobbies(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }


  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 1500);
    })
    return promise;
  }
}
