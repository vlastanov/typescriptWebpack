import { SectionFrame, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { FrameSystem } from "./frameSystems";

export class Krilo {

    heightOfDrajka: number

    materialFillingInstance: FillingMaterial
    public kriloWidth: number
    public kriloHeight: number

    constructor(public nomerNaKrilo: number,
        protected direction: string,
        public schema: string,
        protected sectionApplication: string,
        private kriloWidthOtvor: number,
        private kriloHeightOtvor: number,
        protected frameSystem: FrameSystem, private fillingMaterial: string) {
        this.produceDimentions()
        this.processMartinas()
        this.produceFillingMaterial()
        this.produceException()
    }

    produceDimentions() {
        let zab = this.frameSystem.sectionKriloProzorec.profilSectionZab
        let procep = 6

        this.kriloWidth = this.kriloWidthOtvor - 2 * procep + 2 * zab
        this.kriloHeight = this.kriloHeightOtvor - 2 * procep + 2 * zab

    }

    produceFillingMaterial() {
        let debelenaNaKriloto = this.frameSystem.sectionKriloProzorec.profilSectionHeight
        let zastapStaklopaket = this.frameSystem.overlapStaklopaketKriloIliKasa
        let materialFillingWidth = this.kriloWidth - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)
        let materialFillingHeight = this.kriloHeight - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)

        this.materialFillingInstance = new FillingMaterial(materialFillingWidth, materialFillingHeight, this.fillingMaterial)
    }

    processMartinas() {

        let widthFalc = this.kriloWidth - 40
        let heightFac = this.kriloHeight - 40

        let widthApmlitude2 = widthFalc >= 405
        let heightAplititude2 = heightFac >= 255 && heightFac < 315

        let widthApmlitude4 = widthFalc >= 405
        let heightAplititude4 = heightFac >= 315 && heightFac < 380

        let widthApmlitude1 = widthFalc >= 290
        let heightAplititude1 = heightFac >= 380 && heightFac < 430


        let widthApmlitude3 = widthFalc >= 290
        let heightAplititude3 = heightFac >= 430 && heightFac <= 600

        let widthApmlitude5 = widthFalc >= 290
        let heightAplititude5 = heightFac >= 601 && heightFac <= 800


        let widthApmlitude6 = widthFalc >= 290
        let heightAplititude6 = heightFac >= 801 && heightFac <= 1000
        let widthApmlitude7 = widthFalc >= 290
        let heightAplititude7 = heightFac >= 1001 && heightFac <= 1200
        let widthApmlitude8 = widthFalc >= 290
        let heightAplititude8 = heightFac >= 1201 && heightFac <= 1400
        let widthApmlitude9 = widthFalc >= 290
        let heightAplititude9 = heightFac >= 1401 && heightFac <= 1483
        let widthApmlitude10 = widthFalc >= 290
        let heightAplititude10 = heightFac >= 1484 && heightFac <= 1600

        let widthApmlitude11 = widthFalc >= 290
        let heightAplititude11 = heightFac >= 1601 && heightFac <= 1814


        let widthApmlitude12 = widthFalc >= 290
        let heightAplititude12 = heightFac >= 1815 && heightFac <= 2000
        let widthApmlitude13 = widthFalc >= 290
        let heightAplititude13 = heightFac >= 2000

        if (widthApmlitude2 && heightAplititude2) {
            this.heightOfDrajka = heightFac / 2

        } else if (widthApmlitude4 && heightAplititude4) {
            this.heightOfDrajka = 180
        } else if (widthApmlitude1 && heightAplititude1) {
            this.heightOfDrajka = (heightFac - 115) / 2
        } else if (widthApmlitude3 && heightAplititude3) {
            console.log('produceKrilo')
            this.heightOfDrajka = 180
        } else if (widthApmlitude5 && heightAplititude5) {
            this.heightOfDrajka = 300
        } else if (widthApmlitude6 && heightAplititude6) {
            this.heightOfDrajka = 400
        } else if (widthApmlitude7 && heightAplititude7) {
            this.heightOfDrajka = 500
        } else if (widthApmlitude8 && heightAplititude8) {
            this.heightOfDrajka = 600
        } else if (widthApmlitude9 && heightAplititude9) {
            this.heightOfDrajka = 700
        } else if (widthApmlitude10 && heightAplititude10) {
            this.heightOfDrajka = (heightFac - 1200) / 2 + 600
        } else if (widthApmlitude11 && heightAplititude11) {
            this.heightOfDrajka = (heightFac - 1600) / 2 + 800
        } else if (widthApmlitude12 && heightAplititude12) {
            this.heightOfDrajka = 1000
        } else if (widthApmlitude13 && heightAplititude13) {
            this.heightOfDrajka = 1000
        }
    }

    produceException() {
        let widthFalc = this.kriloWidth - 40
        let heightFalc = this.kriloHeight - 40

        if (widthFalc < 290) {
            throw new Error(`Ширината на крилото по фалц е ${this.kriloWidth - 40}. Не може да бъде изпълнено със Sigenia`)
        }
        else if (widthFalc < 405 && heightFalc < 380) {
            throw new Error(`Ширината на крилото по фалц е ${this.kriloWidth - 40},а височината- ${this.kriloHeight - 40}. Не може да бъде изпълнено със Sigenia`)
        }
    }


    toString() {
        let result = {}
        result['kriloWidth'] = this.kriloWidth
        result['kriloHeight'] = this.kriloHeight
        result['heightOfDrajka'] = this.heightOfDrajka
        result['materialFillingInstance'] = this.materialFillingInstance.toString()

        return result
    }
}