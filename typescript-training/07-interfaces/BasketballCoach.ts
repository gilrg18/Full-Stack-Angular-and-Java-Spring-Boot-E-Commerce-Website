import { Coach } from "./Coach";

export class BasketballCoach implements Coach{
    getDailyWorkout(): string {
        return "Practice three-pointers."
    }
    
}