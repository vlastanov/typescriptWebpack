export class FillingMaterial {
    constructor(private userInputParams: Object) {
        let snimkaId = this.userInputParams['snimkaId']
        let fillingMaterial = this.userInputParams['fillingMaterial']

    }
}
export class Mreja {
    constructor(
        private userInputParams: Object, ) {
        let selectedMreja = this.userInputParams['selectMreja']

        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])
    }
}
export class RollerShutter {

    shutter: string
    shutterModel: string

    constructor(
        private userInputParams: Object, ) {

        let width = parseInt(this.userInputParams['width'])
        let height = parseInt(this.userInputParams['height'])
    }

    produceShutterModel() {
        // this.shutter = this.userInputParams['shutter']
        // this.shutterModel = EnumShutterModel[EnumShutterModel[this.userInputParams[this.shutter]]]
        // // console.log(this.shutterModel)
    }

    produceFrameModel() {
        // this.frameMaterial = this.userInputParams['frameMaterial']
        // this.frameModel =
        //     EnumFrameModel[EnumFrameModel[this.userInputParams[this.frameMaterial]]]

        // console.log(this.frameModel)
    }
}

export class SectionFrame {
    protected profilSectionWidth: number
    protected profilSectionHeight: number

    constructor() {
        this.produceSection()
    }

    produceSection() { }
}

export class SectionFrame76201 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 11
        this.profilSectionHeight = 13
    }
}

export class SectionFrame76101 extends SectionFrame {

    produceSection() {
        this.profilSectionWidth = 10
        this.profilSectionHeight = 12
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
        this.profilSectionWidth = 8
        this.profilSectionHeight = 9
    }
}
