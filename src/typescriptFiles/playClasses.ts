// import * as $ from 'jquery'
// import Promise from "ts-promise";

export interface IName {
    name: string;
}

export class Name implements IName {
    name: string;
    constructor(name: string) {
        this.name = name
    }

}

export class Person {
    personNames: Name[]
    constructor(names: Name[]) {
        this.personNames = names
    }
}

export class Crowd {
    personInCrowd: Person
    constructor(person: Person) {
        this.personInCrowd = person
    }
}

export class ProductWindow {
    width: number
    height: number
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }
}


class Animal {
    say() {
        return 'animal'
    }
}

class Tiger extends Animal {
    say() {
        return 'tiger'
    }
}

abstract class ModelFactory<T extends Animal> {
    constructor(private modelConstructor: new () => Animal) { }

    public create(): Animal {
        return new (this.modelConstructor)();  // OK!
    }
}

class TigerFactory extends ModelFactory<Tiger> {
    constructor() {
        super(Tiger);
    }
}

let tiger: Tiger;
tiger = new TigerFactory().create();


namespace FactoryMethodPattern {

    export interface IPerson {
        getName(): String;
    }
    export class Villager implements IPerson {
        getName(): String {
            return "Village Person";
        }
    }
    export class CityPerson implements IPerson {
        getName(): String {
            return "City Person";
        }
    }
    export enum PersonType {
        Rural,
        Urban
    }


    export class PersonFactory {

        public static createProduct(type: PersonType): IPerson {
            if (type === PersonType.Rural) {
                return new Villager();
            } else if (type === PersonType.Urban) {
                return new CityPerson();
            }

            return null;
        }
    }

    export namespace Demo {
        export function show(): void {
            var villager: IPerson = PersonFactory.createProduct(PersonType.Rural);
            var cityPerson: IPerson = FactoryMethodPattern.PersonFactory.createProduct(PersonType.Urban);

            console.log(villager.getName());
            console.log(cityPerson.getName());
        };
    }

}




 // $.get('./src/data/users.json').then(data => {
    //     data.forEach(element => {
    //         let keys = Object.keys(element)
    //         keys.forEach(key => {
    //             console.log(element[key])
    //         })
    //     });
    // })



    // let name1 = new Name('Emil')
    // let name2 = new Name('Gosho')
    // let jsonName = JSON.stringify([name1, name2])
    // console.log(jsonName)

    // let person = new Person([{ "name": "Emil" }, { "name": "Gosho" }])
    // let jsonPerson = JSON.stringify(person)
    // console.log(jsonPerson)

    // let crowd = new Crowd({ "personNames": [{ "name": "Emil" }, { "name": "Gosho" }] })
    // let jsonCrowd = JSON.stringify(crowd)
    // console.log(jsonCrowd)