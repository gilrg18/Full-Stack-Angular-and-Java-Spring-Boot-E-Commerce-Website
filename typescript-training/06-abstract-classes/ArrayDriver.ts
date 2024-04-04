import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Shape } from "./Shape";

//let myShape = new Shape(10, 15); Error cannot create instance of abstract classes
let myCircle = new Circle(5,10,20);
let myRectangle = new Rectangle(0, 0, 3, 7);

let shapes: Shape[] = [];
// shapes.push(myShape)
shapes.push(myCircle)
shapes.push(myRectangle)

for(let tempShape of shapes){
    console.log(tempShape.getInfo());
    console.log(tempShape.calculateArea());
    console.log();
}