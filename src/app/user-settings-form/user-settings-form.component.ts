import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  singleModel = "On";
  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes...'
  };


  userSettings: UserSettings = { ...this.originalUserSettings }
  postError = false;
  postErrorMessage = '';
  subscriptionTypes!: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    console.log('IspostError: ', this.postError);
    this.postErrorMessage = errorResponse.error.errorMessage;
    console.log('ErrorMessage: ', this.postErrorMessage);
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.valid);

    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings)
        .subscribe(
          result => console.log('success: ', result),
          error => this.onHttpError(error)
        );
    }
    else {
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }
  }

  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

}
