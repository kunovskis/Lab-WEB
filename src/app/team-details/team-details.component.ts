import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TeamManagementService } from '../team-management.service';
import { Team } from '../model/team';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @Input()team: Team;
  constructor(
    private teamService: TeamManagementService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
      this.teamService.getTeam(+params.get('position')))
      .subscribe(team => this.team = team);
  }
  goBack(): void {
    this.location.back();
  }
}
