import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TeamManagementService} from '../team-management.service';
import {Team} from '../model/team';
import {
  FormControl, FormBuilder, AbstractControl, Validators, FormGroup, ValidatorFn,
  ValidationErrors
} from '@angular/forms';


@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  team: Team;
  teams: Team[];
  form: FormGroup;
  curr: number;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private teamService: TeamManagementService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.teamService.getTeam(+params.get('position')))
      .subscribe(team => {
        this.team = team;
        this.curr = this.team.position;
        this.teamService.getTeams().then(teams => {
          this.teams = Object.assign([], teams);
          const index = this.teams.indexOf(this.team);
          this.teams.splice(index, 1);
          this.form = this.fb.group({
            name: [this.team.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            position: [this.team.position, [Validators.required, Validators.min(1), Validators.max(20), this.positionValidator(this.teams)]],
            city: [this.team.city, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
            stadium: [this.team.stadium, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
          });
        });
      });
  }

  saveTeam() {
    const form = this.form.value;
    this.teamService.saveTeam(this.curr, form.name, +form.position, form.city, form.stadium)
      .then(() => this.router.navigate(['/teams']));
  }

  goBack() {
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
