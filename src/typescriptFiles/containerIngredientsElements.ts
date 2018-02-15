import { FrameSystem } from "./frameSystems";

export class FillingMaterial {

    area: number

    constructor(
        public fillingMaterilaWidth: number,
        public fillingMaterilaHeight: number,
        public materialType: string
    ) {
        let fillingMaterial = 'staklo'
        this.produceArea()
    }

    produceArea() {
        this.area = (this.fillingMaterilaWidth * this.fillingMaterilaHeight) / 1000000
    }



    toString() {
        let result = {}

        result['area'] = this.area

        return result
    }
}
export class Mreja {
    mrejaWidth: number
    mrejaHeight: number
    area: number

    constructor(
        private checkBoxMreja: string,
        private kasaWidth: number,
        private kasaHeight: number,
        private userInputParams: Object) {
        this.processDimentions()
    }

    processDimentions() {
        if (this.checkBoxMreja === 'on') {
            this.mrejaWidth = this.kasaWidth
            this.mrejaHeight = this.kasaHeight
        } else {
            this.mrejaWidth = 0
            this.mrejaHeight = 0
        }
    }

    produceArea() {
        this.area = (this.mrejaWidth * this.mrejaHeight) / 1000000
    }

    toString() {
        let result = {}

        result['area'] = 'area'
        return result
    }
}
export class RollerShutter {

    rollerBoxWidth: number
    rollerBoxHeight: number

    constructor(
        private shutterValue: string,
        private rollerType: string,
        private frameSystem: FrameSystem,
        private widthContainer: number,
        private heightContainer: number,
    ) {
        console.log('here')
        this.produceDimentions()
    }

    produceDimentions() {

        if (this.shutterValue === 'roller') {

            this.rollerBoxWidth = this.widthContainer
            this.rollerBoxHeight = this.frameSystem.boxHeightLow

            if ((this.rollerType === 'buildOn') && (this.heightContainer > 1500)) {
                this.rollerBoxHeight = this.frameSystem.boxHeightHigh
            }
        } else {
            this.rollerBoxWidth = 0
            this.rollerBoxHeight = 0
        }
    }

    toString() {
        let result = {}

        result['rollerBoxHeight'] = this.rollerBoxHeight

        return result
    }
}

export class SectionFrame {
    protected profilSectionWidth: number
    public profilSectionHeight: number
    public overlapKriloKasa: number


    constructor() {
        this.produceSection()
    }

    produceSection() { }
    toString() {
        let result = {}

        result['sectionprofilSectionWidthKasa'] = this.profilSectionWidth
        result['profilSectionHeight'] = this.profilSectionHeight

        return result
    }
}

export class SectionFrame76101 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 0
        this.profilSectionHeight = 67
    }
}
export class SectionFrame76201 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 11
        this.profilSectionHeight = 13
        this.overlapKriloKasa = 29
    }
}


export class SectionFrame76301 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 9
        this.profilSectionHeight = 10
    }
}


export class SectionFrame76302 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 0
        this.profilSectionHeight = 84
    }
}
export class SectionFrame76402 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 0
        this.profilSectionHeight = 66
    }
}
