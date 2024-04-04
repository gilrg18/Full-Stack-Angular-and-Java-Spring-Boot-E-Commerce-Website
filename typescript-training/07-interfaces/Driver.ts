import { BasketballCoach } from "./BasketballCoach";
import { Coach } from "./Coach";
import { SoccerCoach } from "./SoccerCoach";

let mySoccerCoach = new SoccerCoach();
let myBBCoach = new BasketballCoach();

let coaches: Coach[] = [];
coaches.push(mySoccerCoach);
coaches.push(myBBCoach);

for(let tempCoach of coaches){
    console.log(tempCoach.getDailyWorkout());
}