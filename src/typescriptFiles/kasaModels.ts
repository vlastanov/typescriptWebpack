import { SectionFrame, SectionFrame76101, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { DelitelStatichen, Delitel, DelitelStatichenVertical } from "./delitelsModel";
import { FrameSystem } from "./frameSystems";

//container of other elements such as sections and fillings
export class Kasa {
    sectionKasa: SectionFrame
    kasaWidth: number
    kasaHeight: number

    constructor(
        protected sectionApplication: string,
        protected frameSystem: FrameSystem,
        protected userInputParams: Object, ) {
        this.produceSections()
        this.produceDimentions()
    }

    produceSections() {
        this.sectionKasa = this.frameSystem.sectionKasa
    }
    produceDimentions() { }

}

export class KasaForEdnokril extends Kasa {
    constructor(
        private hingesLeft: string,
        private schema: string,
        sectionApplication: string,
        frameSystem: FrameSystem,
        userInputParams: Object, ) {
        super(sectionApplication, frameSystem, userInputParams)
    }
    produceDimentions() {
        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])

        //validation #1

        let shutter = this.userInputParams['shutter']
        let shutterModel =
            this.userInputParams[shutter]

        if (shutterModel === 'buildOn') {
            //define height of rollerShutter by height
            this.kasaHeight = height - 203

            //validation #2
        } else {
            this.kasaHeight = height
        }
        this.kasaWidth = width

    }
}

export class KasaForEdnokrilWithRightFix extends Kasa {

    statichenDelitel: Delitel
    protected fillingMaterial: FillingMaterial

    constructor(
        private hingesLeft: string,
        private schema: string,
        private fillingMaterialSide: string,
        sectionApplication: string,
        frameSystem: FrameSystem,
        userInputParams: Object, ) {
        super(sectionApplication, frameSystem, userInputParams)
        this.produceSections()
        this.produceFillingMaterial()
    }
    produceDimentions() {
        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])

        //validation #1

        let shutter = this.userInputParams['shutter']
        let shutterModel =
            this.userInputParams[shutter]

        if (shutterModel === 'buildOn') {
            //define height of rollerShutter by height
            this.kasaHeight = height - 203

            //validation #2
        } else {
            this.kasaHeight = height
        }
        this.kasaWidth = width

    }
    produceDelitels() {
        this.statichenDelitel = new DelitelStatichenVertical(this.userInputParams) //da mu slova framSystem
    }

    produceFillingMaterial() {
        this.fillingMaterial = new FillingMaterial(this.userInputParams)
    }
}

export class KasaForDveKrila extends Kasa {
    constructor(
        private hingesLeft: string,
        private hingesRight: string,
        private schemaLeft: string,
        private schemaRight: string,
        sectionApplication: string,
        frameSystem: FrameSystem,
        userInputParams: Object, ) {
        super(sectionApplication, frameSystem, userInputParams)
    }
    produceDimentions() {
        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])

        //validation #1

        let shutter = this.userInputParams['shutter']
        let shutterModel =
            this.userInputParams[shutter]

        if (shutterModel === 'buildOn') {
            //define height of rollerShutter by height
            this.kasaHeight = height - 203

            //validation #2
        } else {
            this.kasaHeight = height
        }
        this.kasaWidth = width

    }
}
