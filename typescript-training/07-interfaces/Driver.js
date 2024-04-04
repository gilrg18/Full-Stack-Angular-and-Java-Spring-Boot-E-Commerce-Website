"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasketballCoach_1 = require("./BasketballCoach");
const SoccerCoach_1 = require("./SoccerCoach");
let mySoccerCoach = new SoccerCoach_1.SoccerCoach();
let myBBCoach = new BasketballCoach_1.BasketballCoach();
let coaches = [];
coaches.push(mySoccerCoach);
coaches.push(myBBCoach);
for (let tempCoach of coaches) {
    console.log(tempCoach.getDailyWorkout());
}
