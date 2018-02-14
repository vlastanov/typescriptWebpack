import { SectionFrame, SectionFrame76101, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { DelitelStatichen, Delitel, DelitelStatichenVertical, DelitelPlavasht } from "./delitelsModel";
import { FrameSystem } from "./frameSystems";

export class Kasa {

    constructor(public kasaWidth: number, public kasaHeight: number, public frameSystem: FrameSystem, ) { }

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

        let fullWidth = this.kasaWidth //1000
        let fullHeight = this.kasaHeight
        let debelinaNaKasata = this.frameSystem.sectionKasa.profilSectionHeight //67
        let debelinaNaDelitelaStatichen = this.frameSystem.sectionDelitelStatichen.profilSectionHeight //84

        let zastapKriloKasa = this.frameSystem.sectionKasa.overlapKriloKasa
        let zastapKriloKasaIliDel = this.frameSystem.sectionKasa.overlapKriloKasa

        let fillingMaterilaWidth = (fullWidth - (2 * debelinaNaKasata) - debelinaNaDelitelaStatichen) / 2
        let fillingMaterilaHeight = fullHeight - (2 * debelinaNaKasata)

        //da podam staklo tuk . Nujni sa mi inputDannite
        this.fillingMaterial = new FillingMaterial(fillingMaterilaWidth, fillingMaterilaHeight, 'staklo'
        )
    }

    toString() {
        let result = super.toString()

        result['fillingMaterial'] = this.fillingMaterial.toString()

        return result
    }
}
