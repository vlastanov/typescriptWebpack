import { SectionFrame, SectionFrame76101, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { DelitelStatichen, Delitel, DelitelStatichenVertical, DelitelPlavasht } from "./delitelsModel";
import { FrameSystem } from "./frameSystems";

export class Kasa {

    public widthOtvor: number
    public heightOtvor: number

    constructor(public kasaWidth: number, public kasaHeight: number, public frameSystem: FrameSystem, ) {
        this.produceOtvorDimentions()
    }

    produceOtvorDimentions() {
        this.widthOtvor = this.kasaWidth - (2 * this.frameSystem.sectionKasa.profilSectionHeight)
            + (2 * this.frameSystem.sectionKasa.profilSectionZab)


        this.heightOtvor = this.kasaHeight - (2 * this.frameSystem.sectionKasa.profilSectionHeight)
            + (2 * this.frameSystem.sectionKasa.profilSectionZab)
    }

    toString() {
        let result = {}

        result['kasaWidth'] = this.kasaWidth
        result['kasaHeight'] = this.kasaHeight

        return result
    }

}

export class KasaForEdnokrilWithRightFix extends Kasa {

    public fillingMaterial: FillingMaterial
    delitelStatichen: DelitelStatichenVertical



    constructor(kasaWidth: number, kasaHeight: number, frameSystem: FrameSystem) {
        super(kasaWidth, kasaHeight, frameSystem)
        this.produceFillingMaterial()
        this.delitelStatichen = new DelitelStatichenVertical(this.kasaWidth, this.kasaHeight, this.frameSystem)
    }

    produceFillingMaterial() {

        let debelinaNaDelitelaStatichen = this.frameSystem.sectionDelitelStatichen.profilSectionHeight

        let fillingMaterilaWidth = (this.widthOtvor - debelinaNaDelitelaStatichen) / 2
        let fillingMaterilaHeight = this.heightOtvor

        this.widthOtvor = fillingMaterilaWidth
        this.heightOtvor = fillingMaterilaHeight

        //da podam staklo tuk . Nujni sa mi inputDannite
        this.fillingMaterial = new FillingMaterial(fillingMaterilaWidth, fillingMaterilaHeight, 'staklo')
    }

    toString() {
        let result = super.toString()

        result['fillingMaterial'] = this.fillingMaterial.toString()
        result['delitelStatichen'] = this.delitelStatichen.toString()

        return result
    }


}


//poslednta shema da dobawq input za razmeri.Sega mi deli na 4 4asti.FIxa e polowinata.