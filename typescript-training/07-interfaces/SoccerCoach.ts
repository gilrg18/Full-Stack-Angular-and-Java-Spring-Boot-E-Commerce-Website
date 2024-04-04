import { Coach } from "./Coach";

export class SoccerCoach implements Coach{
    getDailyWorkout(): string {
        return "Practice sprint shooting.";
    }
    
}