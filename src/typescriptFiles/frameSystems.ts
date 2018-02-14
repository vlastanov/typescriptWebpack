import { SectionFrame, SectionFrame76101, SectionFrame76201, SectionFrame76402, SectionFrame76302 } from "./containerIngredientsElements";
import { Delitel } from "./delitelsModel";


export class FrameSystem {
    frameSystemModel: string
    sectionKasa: SectionFrame
    sectionKriloProzorec: SectionFrame
    sectionDelitelLetqsht: SectionFrame
    sectionDelitelStatichen: SectionFrame


    public overlapKriloKasa: number
    public overlapDelitelKrilo: number
    public overlapStaklopaketKriloIliKasa: number

    public boxHeightLow: number
    public boxHeightHigh: number


    toString() {
        let result = {}

        result['sectionKasa'] = this.sectionKasa.toString()
        result['sectionKriloProzorec'] = this.sectionKriloProzorec.toString()

        return result
    }
}

export class Kommerling76System extends FrameSystem {
    constructor() {
        super();
        this.frameSystemModel = 'kommerling76'
        this.sectionKasa = new SectionFrame76101()
        this.sectionKriloProzorec = new SectionFrame76201()
        this.sectionDelitelStatichen = new SectionFrame76302()
        this.sectionDelitelLetqsht = new SectionFrame76402()
        //kriloto zastapva s 29 vsi3ko.vkliuchitelno i stati3en delitel
        this.overlapKriloKasa = 29
        this.overlapDelitelKrilo = 30
        this.overlapStaklopaketKriloIliKasa = 16
    }

    toString() {

        let result = super.toString()

        return result
    }

}