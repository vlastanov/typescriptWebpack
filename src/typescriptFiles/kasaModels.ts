import { SectionFrame, SectionFrame76101, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { DelitelStatichen, Delitel, DelitelStatichenVertical, DelitelPlavasht } from "./delitelsModel";
import { FrameSystem } from "./frameSystems";

export class Kasa {

    public widthOtvor: number
    public heightOtvor: number

    constructor(public delenieChasti: number, public kasaWidth: number,
        public kasaHeight: number,
        public frameSystem: FrameSystem, ) {
        this.produceOtvorDimentions()
    }

    produceOtvorDimentions() {
        let debelinaNaKasata = this.frameSystem.sectionKasa.profilSectionHeight
        let zab = this.frameSystem.sectionKasa.profilSectionZab

        this.widthOtvor = this.kasaWidth
            - (2 * debelinaNaKasata)
            + (2 * zab)

        this.heightOtvor = this.kasaHeight
            - (2 * debelinaNaKasata)
            + (2 * zab)
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

    constructor(
        delenieChasti: number,
        kasaWidth: number,
        kasaHeight: number,
        frameSystem: FrameSystem) {
        super(delenieChasti, kasaWidth, kasaHeight, frameSystem)
        this.delitelStatichen =
            new DelitelStatichenVertical(this.kasaWidth,
                this.kasaHeight,
                this.frameSystem)
        this.produceFillingMaterial()
    }

    produceOtvorDimentions() {
        super.produceOtvorDimentions()
        let totalWidthOtvor = this.calculateTotalWIdth()
        console.log(totalWidthOtvor)


        this.widthOtvor = (totalWidthOtvor / this.delenieChasti) * (this.delenieChasti - 1)
        console.log(this.widthOtvor)
        this.heightOtvor = this.heightOtvor
    }

    calculateTotalWIdth(): number {

        let debDelStat = this.frameSystem.sectionDelitelStatichen.profilSectionHeight
        // console.log(debDelStat)
        let zab = this.frameSystem.sectionDelitelStatichen.profilSectionZab
        // console.log(zab)
        // console.log(this.widthOtvor)

        let totalWidthOtvor = (this.widthOtvor - debDelStat + 2 * zab)
        // console.log(totalWidthOtvor)

        return totalWidthOtvor
    }

    produceFillingMaterial() {

        let podlojkaStaklopaket = 6

        let totalWidthOtvor = this.calculateTotalWIdth()

        let fillingMaterilaWidth =
            (totalWidthOtvor / this.delenieChasti) - 2 * podlojkaStaklopaket
        // console.log(fillingMaterilaWidth)
        let fillingMaterilaHeight = this.heightOtvor - 2 * podlojkaStaklopaket
        // console.log(fillingMaterilaWidth)

        //da podam staklo tuk . Nujni sa mi inputDannite
        this.fillingMaterial =
            new FillingMaterial(fillingMaterilaWidth, fillingMaterilaHeight, 'staklo')
    }

    toString() {
        let result = super.toString()

        result['fillingMaterial'] = this.fillingMaterial.toString()
        result['delitelStatichen'] = this.delitelStatichen.toString()

        return result
    }


}


//poslednta shema da dobawq input za razmeri.Sega mi deli na 4 4asti.FIxa e polowinata.