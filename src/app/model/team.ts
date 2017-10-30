export class Team {
  name: string;
  position: number;
  city: string;
  stadium: string;
  constructor(NAME: string, POSITION: number, CITY: string, STADIUM: string){
    this.name = NAME;
    this.position = POSITION;
    this.stadium = STADIUM;
    this.city = CITY;
  }
}
