import { SectionFrame76301, SectionFrame76302, SectionFrame, SectionFrame76402 } from "./containerIngredientsElements";
import { FrameSystem } from "./frameSystems";

export class Delitel {

    protected lengthDelitel: number
    protected frameModel: string

    constructor(protected kasaWidth: number, protected kasaHeight: number,
       protected frameSystem: FrameSystem, ) {
        this.produceDimentions()
    }
    produceDimentions() { }

    toString() {
        let result = {}

        result['lengthDelitel'] = this.lengthDelitel

        return result
    }
}
export class DelitelPlavasht extends Delitel {

    constructor(kasaWidth: number, kasaHeight: number,frameSystem: FrameSystem, ) {
        super(kasaWidth, kasaHeight,frameSystem, )
    }

    produceDimentions() {
        this.lengthDelitel = this.kasaHeight
    }
}

export class DelitelStatichen extends Delitel {

    constructor(kasaWidth: number, kasaHeight: number,frameSystem: FrameSystem, ) {
        super(kasaWidth, kasaHeight,frameSystem, )
    }
}

export class DelitelStatichenVertical extends DelitelStatichen {

    constructor(kasaWidth: number, kasaHeight: number,frameSystem: FrameSystem, ) {
        super(kasaWidth, kasaHeight,frameSystem, )
    }
    produceDimentions() {
        this.lengthDelitel = this.kasaHeight
    }
}

export class DelitelStatichenHorizontal extends Delitel {

    constructor(kasaWidth: number, kasaHeight: number,frameSystem: FrameSystem,) {
        super(kasaWidth, kasaHeight,frameSystem, )
    }
    produceDimentions() {
        this.lengthDelitel = this.kasaWidth
    }
}
