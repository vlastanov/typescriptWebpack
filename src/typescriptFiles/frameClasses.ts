
export enum EnumMaterial {
    pvc,
    aluminium
}

export enum EnumKriloSchema {
    fix,
    open,
    openTilt,
    ff
}

export enum EnumKriloDirection {
    hingesSideLeft,
    hingesSideRight,
}

export enum EnumKasa {
    normal,
    Zkasa,
}

export enum EnumKolonki {
    top,
    left,
    right,
    bottom,
    topBottom,
    leftRight,
    topLeftRight,
    fourSides
}

export enum EnumProfilModel {
    kbe,
    kommerling76
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
        private selectedType: string,
        private width: number,
        private height: number) { }
}
export class Mreja {
    constructor(
        private selectedType: string,
        private kolonki: EnumKolonki,
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
    constructor(private snimkaId, private profilModel: EnumProfilModel, private typeKasa: EnumKasa, private width: number, private height: number) {
    }
}

export class Krilo {

    kriloDirection: EnumKriloDirection
    kriloSchema: EnumKriloSchema

    constructor(
        private snimkaId: string,
        private profilModel: EnumProfilModel,
        private width: number,
        private height: number) {
        this.processKriloDirection()
        this.processKriloSchema()
    }

    processKriloDirection() {
        switch (this.snimkaId) {
            case '1KriloLqvoOtvarqneNaklanqne.png': this.kriloDirection = EnumKriloDirection.hingesSideLeft; break
        }
    }

    processKriloSchema() {
        switch (this.snimkaId) {
            case '1KriloLqvoOtvarqneNaklanqne.png': this.kriloSchema = EnumKriloSchema.openTilt; break
        }
    }
}

export class WindowSystemBasic {
    // ledges: EnumLedges
    constructor(
        private profilModel: EnumProfilModel, private kasa: Kasa, private glavnoKrilo: Krilo) {
    }
}

export class EdnoKrilo extends WindowSystemBasic {
    constructor(
        profilModel: EnumProfilModel,
        kasa: Kasa,
        glavnoKrilo: Krilo,
        private rollerShutter?: RollerShutter,
        private mreja?: Mreja,

    ) {
        super(profilModel, kasa, glavnoKrilo)
    }
}


export class ProcessData {
    rollerShutter: RollerShutter
    mreja: Mreja
    krilo: Krilo
    kasa: Kasa

    snimkaId: string
    profilMaterial: string
    profilModel: EnumProfilModel
    width: number
    height: number

    shutter: string

    // hasRollerShutter: boolean
    // hasKapak: boolean
    hasMreja: boolean

    constructor(private params: Object) {

        this.snimkaId = this.params['snimkaId']
        let selectGlass = this.params['selectGlass']

        this.profilMaterial = this.params['profilMaterial']
        this.profilModel = EnumProfilModel[this.params['profilModel'] as string]
        console.log(typeof this.params['width'])
        this.width = parseInt(this.params['width'])
        this.height = parseInt(this.params['height'])

        this.shutter = this.params['shutter']
        this.hasMreja = this.params['checkBoxMreja'] === 'on'


    }

    produceKasa() {
        let widthKasa = this.width
        let heightKasa = this.height

        this.kasa = new Kasa(this.snimkaId, this.profilModel, EnumKasa.normal, widthKasa, heightKasa)
    }

    produceRollerShutterAndMrejaKrilo() {

        let widthKrilo = this.width

        // findheightKutiqShotora priemam za 1
        let heightKrilo = this.shutter === 'rollerShutter' ?
            this.height - 1 : this.height

        this.krilo = new Krilo(this.snimkaId, this.profilModel, widthKrilo, heightKrilo)



        if (this.shutter === 'rollerShutter') {
            console.log('roletna')
            let widthRollerShutter = this.width
            let heightRollerShutter = 2 //sashtiq metod resultata e this.heightShtora

            let selectedShtora = this.params['selectShtora']
            this.rollerShutter = new RollerShutter(
                this.profilMaterial,
                selectedShtora,
                widthRollerShutter,
                heightRollerShutter)
        }
        else if (this.shutter === 'normalShutter') {
            console.log('normana')
            let widthRollerShutter = this.width
            let heightRollerShutter = 2 //sashtiq metod resultata e this.heightShtora

            let selectedShtora = this.params['selectShtora']
            this.rollerShutter = new RollerShutter(
                this.profilMaterial,
                selectedShtora,
                widthRollerShutter,
                heightRollerShutter)
        }
        else if (this.shutter === 'noShutter') {
            console.log('nqma')
            let widthRollerShutter = this.width
            let heightRollerShutter = 2 //sashtiq metod resultata e this.heightShtora

            let selectedShtora = this.params['selectShtora']
            this.rollerShutter = new RollerShutter(
                this.profilMaterial,
                selectedShtora,
                widthRollerShutter,
                heightRollerShutter)
        }

        //produce mreja
        if (this.hasMreja) {
            let widthMreja = widthKrilo
            let heightMreja = heightKrilo

            let selectedMreja = this.params['selectMreja']
            this.mreja = new Mreja(
                selectedMreja, EnumKolonki.fourSides, widthMreja, heightMreja,
            )
        }

    }

    produceOutput() {
        //1
        this.produceKasa()
        //2
        this.produceRollerShutterAndMrejaKrilo()

        let ednoKriloOpenTiltHingesLeft =
            new EdnoKrilo(this.profilModel, this.kasa, this.krilo, this.rollerShutter, this.mreja)

        // throw new Error('greshka ot ruk')


        return ednoKriloOpenTiltHingesLeft
    }
}







