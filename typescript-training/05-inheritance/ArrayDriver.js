"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
const Shape_1 = require("./Shape");
let myShape = new Shape_1.Shape(10, 15);
let myCircle = new Circle_1.Circle(5, 10, 20);
let myRectangle = new Rectangle_1.Rectangle(0, 0, 3, 7);
let shapes = [];
shapes.push(myShape);
shapes.push(myCircle);
shapes.push(myRectangle);
for (let tempShape of shapes) {
    console.log(tempShape.getInfo());
}
