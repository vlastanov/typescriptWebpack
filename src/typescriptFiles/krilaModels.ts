import { SectionFrame, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { FrameSystem } from "./frameSystems";

export class Krilo {

    protected sectionKrilo: SectionFrame // ot profilModel
    protected kriloWidth: number
    protected kriloHeight: number
    protected fillingMaterial: FillingMaterial

    constructor(protected nomerNaKrilo: number, protected direction: string, protected schema: string,
        protected sectionApplication: string,
        protected frameSystem: FrameSystem,
        protected userInputParams: Object, ) {
        this.produceSections()
        this.produceDimentions()
        this.produceFillingMaterial()
    }
    produceSections() {
        this.sectionKrilo = this.frameSystem.sectionKriloProzorec
    }
    produceDimentions() { }

    produceFillingMaterial() { }
    toString() {
        return { 'width': this.kriloWidth }
    }
}
export class KriloForEdnokril extends Krilo {

    kriloWidth: number
    kriloHeight: number

    constructor(nomerNaKrilo: number, direction: string, schema: string, sectionApplication: string,
        frameSystem: FrameSystem, userInputParams: Object, ) {
        super(nomerNaKrilo, direction, schema, sectionApplication, frameSystem, userInputParams)
    }
    produceDimentions() {
        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])

        let shutter = this.userInputParams['shutter']
        let shutterModel = this.userInputParams[shutter]

        this.kriloWidth = width;
        if (shutterModel === 'buildOn') {
            this.kriloHeight = height - 203 - 5
        } else {
            this.kriloHeight = height
        }
    }

    produceFillingMaterial() {
        this.fillingMaterial = new FillingMaterial(this.userInputParams)
    }
}
export class KriloForDvukril extends Krilo {
    snimkaId: string

    constructor(nomerNaKrilo: number, direction: string, schema: string,
        sectionApplication: string, frameSystem: FrameSystem, userInputParams: Object, ) {
        super(nomerNaKrilo, direction, schema, sectionApplication, frameSystem, userInputParams)
    }
    produceDimentions() {
        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])

        let shutter = this.userInputParams['shutter']
        let shutterModel = this.userInputParams[shutter]

        this.kriloWidth = (width - 10) / 2;
        if (shutterModel === 'buildOn') {
            this.kriloHeight = height - 203 - 5
        } else {
            this.kriloHeight = height
        }
    }

    produceFillingMaterial() {
        this.fillingMaterial = new FillingMaterial(this.userInputParams)
    }
}