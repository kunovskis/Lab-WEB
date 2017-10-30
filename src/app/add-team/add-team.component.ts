import {Component, OnInit} from '@angular/core';
import {
  FormControl, FormBuilder, AbstractControl, Validators, FormGroup, ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import {Location} from '@angular/common';
import {TeamManagementService} from '../team-management.service';
import {Team} from '../model/team';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  form: FormGroup;
  teams: Team[];

  constructor(private fb: FormBuilder,
              private teamService: TeamManagementService,
              private location: Location) {
  }

  ngOnInit() {
    this.teamService.getTeams().then((teams: Team[]) => {
      this.teams = teams;
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        position: ['', [Validators.required, Validators.min(1), Validators.max(20), this.positionValidator(teams)]],
        city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        stadium: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
      });
    });
  }

  addTeam() {
    const formValue = this.form.value;
    this.teamService.addTeam(formValue.name, +formValue.position, formValue.city, formValue.stadium)
      .then(() => this.form.reset())
      .catch((error) => console.error(error));
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

  positionValidator(teams: Team[]) {
    return (control: AbstractControl) => {
      for (let t = 0; t < teams.length; t++) {
        if (+control.value === teams[t].position) {
          return {'forbiddenPosition': {value: control.value}};
        }
      }
      return null;
    };
  }
}
