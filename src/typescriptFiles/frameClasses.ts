
export enum EnumMaterial {
    pvc,
    aluminium
}

export enum EnumKrilo {
    fix,
    open,
    openTilt,
    hingesSideLeft,
    hingesSideRight,
}

export enum EnumKasa {
    normal,
    Zkasa,
}

export enum EnumLedges {
    TopLeftRight,
    TopLeft,
    TopRight,
    FourSides
}


interface IProfilSectionDetails {
    profilSectionWidth: number;
    profilSectionHeight: number;
}

interface IProfilApplicataionAndType {
    profilType: string;
    profilApplication: string;
}
export class RollerShutter {
    constructor(private material: string,
        private typeOfBuild: string,
        private width: number,
        private height: number) { }
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







export class Kasa {
    constructor(private typeKasa: EnumKasa, private width: number, private height: number) {
    }
}

export class Krilo {
    constructor(private positionHinges: EnumKrilo,
        private tilting: EnumKrilo,
        private width: number,
        private height: number) {
    }
}

export class WindowSystemBasic {
    // ledges: EnumLedges
    constructor(
        private profilModel: string, private kasa: Kasa, private glavnoKrilo: Krilo) {
    }
}

export class EdnoKriloOpenTiltHingesLeft extends WindowSystemBasic {
    constructor(
        profilModel: string,
        kasa: Kasa,
        glavnoKrilo: Krilo,
        private rollerShutter?: RollerShutter, ) {
        super(profilModel, kasa, glavnoKrilo)
    }
}


export class ProcessData {

    profilModel: string
    widthKasa: number
    heightKasa: number
    widthKrilo: number
    heightKrilo: number
    hasRollerShutter: boolean
    profilMaterial: string

    rollerShutter: RollerShutter

    constructor(private params: Object) {

        this.profilModel = this.params['profilModel']
        let selectGlass = this.params['selectGlass']

        this.widthKasa = parseInt(this.params['width'])
        this.heightKasa = parseInt(this.params['height'])

        this.widthKrilo = parseInt(this.params['width']) - 1
        this.heightKrilo = parseInt(this.params['height']) - 1

        this.hasRollerShutter = this.params['checkBoxShtora'] === 'on'
        this.profilMaterial = this.params['profilMaterial']

        this.produceRollerShutter()

    }

    produceRollerShutter(): RollerShutter {
        let rollerShutter: RollerShutter

        if (this.hasRollerShutter) {
            let heightRollerShutter = 2
            this.heightKasa = this.heightKasa - heightRollerShutter


            let selectedShtora = this.params['selectShtora']
            rollerShutter = new RollerShutter(
                this.profilMaterial,
                selectedShtora,
                this.widthKasa,
                heightRollerShutter)

        }

        return this.rollerShutter
    }

    produceOutput() {

        let snimkaId = this.params['snimkaName']

        let ednoKriloOpenTiltHingesLeft = new EdnoKriloOpenTiltHingesLeft(
            this.profilModel,
            new Kasa(EnumKasa.normal, this.widthKasa, this.heightKasa),
            new Krilo(EnumKrilo.hingesSideLeft, EnumKrilo.openTilt, this.widthKrilo, this.heightKrilo),
            this.rollerShutter
        )

        // throw new Error('greshka ot ruk')


        return ednoKriloOpenTiltHingesLeft
    }
}







