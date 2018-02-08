"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as $ from 'jquery'
var example1_1 = require("./typescriptFiles/example1");
$(function () {
    var interfaceUser = JSON.stringify({ name: "bob" });
    // $.get('./src/data/users.json').then(data => {
    //     data.forEach(element => {
    //         let keys = Object.keys(element)
    //         keys.forEach(key => {
    //             console.log(element[key])
    //         })
    //     });
    // })
    // function printLabel(labelledObj: LabelledValue) {
    //     console.log(labelledObj.label);
    // }
    // let myObj = { size: 10, label: "Size 10 Object" };
    // printLabel(myObj);
    var person = new example1_1.Person({ name: 'Emil' });
    console.log(person);
    // let crowd = new Crowd({ person: person })
    // console.log(crowd)
    // import { City } from "./city";
});
//# sourceMappingURL=index.js.map