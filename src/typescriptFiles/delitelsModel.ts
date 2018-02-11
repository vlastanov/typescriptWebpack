import { SectionFrame76301, SectionFrame76302, SectionFrame } from "./containerIngredientsElements";

export class Delitel {

    protected sectionDelitel: SectionFrame
    protected lengthDelitel: number
    protected frameModel: string

    constructor(protected userInputParams: Object) {
        this.produceSections()
        this.produceDimentions()
    }

    produceSections() {

        let frameMaterial = this.userInputParams['frameMaterial']
        this.frameModel = this.userInputParams[frameMaterial]
    }
    produceDimentions() {
        let height = parseInt(this.userInputParams['height'])

        let shutter = this.userInputParams['shutter']
        let shutterModel = this.userInputParams[shutter]

        if (shutterModel === 'buildOn') {
            this.lengthDelitel = height - 203 - 5
        } else {
            this.lengthDelitel = height
        }
    }
}
export class DelitelPlavasht extends Delitel {

    constructor(userInputParams: Object) {
        super(userInputParams)
    }

    produceSections() {
        super.produceSections()
        if (this.frameModel === 'kommerling76') {
            this.sectionDelitel = new SectionFrame76301() //kriloVrata
        }
    }
}

export class DelitelStatichen extends Delitel {

    constructor(userInputParams: Object) {
        super(userInputParams)
    }

    produceSections() {
        super.produceSections()
        if (this.frameModel === 'kommerling76') {
            this.sectionDelitel = new SectionFrame76302() //kriloVrata
        }
    }
}

export class DelitelStatichenVertical extends Delitel {

    constructor(userInputParams: Object) {
        super(userInputParams)
    }
}

export class DelitelStatichenHorizontal extends Delitel {

    constructor(userInputParams: Object) {
        super(userInputParams)
    }

    produceDimentions() {
        let width = parseInt(this.userInputParams['width'])
        this.lengthDelitel = width
    }
}
