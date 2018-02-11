import { SectionFrame, SectionFrame76101, SectionFrame76201 } from "./containerIngredientsElements";


export class FrameSystem {
    sectionKasa: SectionFrame
    sectionKriloProzorec: SectionFrame
}

export class Kommerling76System extends FrameSystem {
    constructor() {
        super();
        this.sectionKasa = new SectionFrame76101()
        this.sectionKriloProzorec = new SectionFrame76201()
    }

}