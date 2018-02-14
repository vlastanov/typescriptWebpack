import { SectionFrame, FillingMaterial, SectionFrame76201 } from "./containerIngredientsElements";
import { FrameSystem } from "./frameSystems";

export class Krilo {
    constructor(protected nomerNaKrilo: number, protected direction: string, protected schema: string,
        protected sectionApplication: string,
        public kriloWidth: number,
        public kriloHeight: number,
        protected sectionKrilo: SectionFrame,
        protected fillingMaterial: FillingMaterial) {
    }

    processMartinas() {
        let widthFalc = 0
        let heightFac = 0

        if (heightFac < 290) {
        } else if (heightFac<){

        }
    }
    toString() {
        let result = {}

        result['kriloWidth'] = this.sectionKrilo
        result['kriloHeight'] = this.sectionKrilo
        result['fillingMaterial'] = this.sectionKrilo.toString()

        return result
    }
}