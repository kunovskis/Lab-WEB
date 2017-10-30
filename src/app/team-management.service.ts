import {Injectable} from '@angular/core';
import {Team} from './model/team';

@Injectable()
export class TeamManagementService {
  TEAMS: Team[] = [
    new Team('Manchester City', 1, 'Manchester', 'Etihad'),
    new Team('Manchester United', 2, 'Manchester', 'Old Trafford'),
    new Team('Tottenham', 3, 'London', 'Wembley'),
    new Team('Chelsea', 4, 'London', 'Stamford Bridge')
  ];

  getTeams(): Promise<Team[]> {
    return Promise.resolve(this.TEAMS);
  }

  getTeam(position: number): Promise<Team> {
    return this.getTeams()
      .then(teams => teams.find(team => team.position === position));
  }

  addTeam(name: string, position: number, city: string, stadium: string) {
    return new Promise<void>(((resolve, reject) => {
      this.TEAMS.push(new Team(name, position, city, stadium));
      this.sort();
      resolve();
    }));
  }

  saveTeam(curr: number, name: string, position: number, city: string, stadium: string) {
    return new Promise<void>(((resolve, reject) => {
      const team = this.TEAMS.find((t: Team) => t.position === curr);
      team.name = name;
      team.stadium = stadium;
      team.position = position;
      team.city = city;
      this.sort();
      resolve();
    }));
  }

  sort() {
    this.TEAMS.sort((a: Team, b: Team) => {
      if (a.position > b.position) {
        return 1;
      }
       return -1;
    });
  }
}


