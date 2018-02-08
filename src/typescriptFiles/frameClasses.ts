interface IProfilSectionDetails {
    profilSectionWidth: number;
    profilSectionHeight: number;
}

interface IProfilApplicataionAndType {
    profilType: string;
    profilApplication: string;
}

export class SectionFrame implements IProfilSectionDetails, IProfilApplicataionAndType {
    profilType: string;
    profilApplication: string;

    profilSectionWidth: number;
    profilSectionHeight: number;
    constructor(profilType: string, profilApplication: string, profilSectionWidth: number, profilSectionHeight: number) {
        this.profilType = profilType;
        this.profilApplication = profilApplication;
        this.profilSectionWidth = profilSectionWidth;
        this.profilSectionHeight = profilSectionHeight
    }
}




export class Shtora {
    constructor(private profilMaterial: string,
        private selectedShtora: string,
        private width: number) {

    }
}


export class WindowShablon {
    Kasa: Kasa;
    kasa: SectionFrame
    constructor(Kasa: Kasa, kasa: SectionFrame) {
        this.Kasa = Kasa
        this.kasa = kasa
    }
}

export class Dvukril extends WindowShablon {
    kriloLqvo: SectionFrame
    kriloDqsno: SectionFrame
    constructor(Kasa: Kasa, kasa: SectionFrame, kriloLqvo: SectionFrame, kriloDqsno: SectionFrame) {
        super(Kasa, kasa)
        this.kriloLqvo = kriloLqvo
        this.kriloDqsno = kriloDqsno
    }
}

export class RollerShutter {
    constructor(private material: string,
        private typeOfBuild: string,
        private width: number,
        private height: number) { }
}

export class Kasa {
    width: number
    height: number
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export class Krilo {
    width: number
    height: number
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export class KriloOpenTilt extends Krilo {
    constructor(
        private positionHinges: string, private tilting: boolean,
        width: number, height: number) {
        super(width, height)
    }
}

export class EdnoKriloOpenTiltHingesLeft {
    constructor(
        private profilModel: string,
        private kasa: Kasa,
        private krilo: KriloOpenTilt,
        private rollerShutter?: RollerShutter, ) {
    }
}

export enum SystemsMaterial {
    pvc,
    aluminium
}

export class ProcessData {

    profilModel: string
    widthKasa: number
    heightKasa: number
    widthKrilo: number
    heightKrilo: number
    hasRollerShutter: boolean
    profilMaterial: string

    constructor(private params: Object) {
        // console.log(params)
        this.profilModel = this.params['profilModel']
        let selectGlass = this.params['selectGlass']

        this.widthKasa = parseInt(this.params['width'])
        this.heightKasa = parseInt(this.params['height'])

        this.widthKrilo = parseInt(this.params['width']) - 1
        this.heightKrilo = parseInt(this.params['height']) - 1

        this.hasRollerShutter = this.params['checkBoxShtora'] === 'on'
        this.profilMaterial = this.params['profilMaterial']


    }

    produceOutput() {
        let snimkaId = this.params['snimkaName']
        let rollerShutter: RollerShutter
        if (this.hasRollerShutter) {
            let selectedShtora = this.params['selectShtora']
            rollerShutter = new RollerShutter(
                this.profilMaterial,
                selectedShtora,
                this.widthKasa,
                5)

        }
        console.log(rollerShutter)
        let ednoKriloOpenTiltHingesLeft = new EdnoKriloOpenTiltHingesLeft(
            this.profilModel,
            new Kasa(this.widthKasa, this.heightKasa),
            new KriloOpenTilt('left', true, this.widthKrilo, this.heightKrilo),
            rollerShutter
        )


        return ednoKriloOpenTiltHingesLeft
    }
}







