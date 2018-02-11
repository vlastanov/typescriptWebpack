import { RollerShutter, Mreja, FillingMaterial, } from './containerIngredientsElements'
import { Krilo, KriloForDvukril, KriloForEdnokril } from './krilaModels';
import { Kasa, KasaForEdnokril, KasaForEdnokrilWithRightFix, KasaForDveKrila, } from './kasaModels';
import { Delitel, DelitelPlavasht, DelitelStatichen } from './delitelsModel';
import { Kommerling76System, FrameSystem } from './frameSystems';
import { JSON } from 'sammy';

export class FrameContainer {

    kasa: Kasa
    rollerShutter: RollerShutter
    //kapak
    mreja: Mreja
    frameSystem: FrameSystem


    constructor(protected userInputParams: Object) {
        this.produceFrameSystem()
        this.produceKasa()
        this.produceRollerShutter()
        this.produceMreja()
    }
    produceFrameSystem() { }
    produceKasa() {
    }

    produceRollerShutter() {
        if (true) {
            this.rollerShutter = new RollerShutter(this.userInputParams)
        }
    }
    produceMreja() {
        let hasMreja = this.userInputParams['checkBoxMreja'] === 'on'
        if (hasMreja) {
            this.mreja = new Mreja(this.userInputParams)
        }
    }
}
export class EdnoKrilStatilDelitelContainer extends FrameContainer {

    krilo: Krilo

    constructor(userInputParams: Object) {
        super(userInputParams)
        this.produceKrila()
    }

    produceFrameSystem() {
        let frameMaterial = this.userInputParams['frameMaterial']
        let frameModel = this.userInputParams[frameMaterial]
        if (frameModel === 'kommerling76') {
            this.frameSystem = new Kommerling76System()
        }
    }
    produceKasa() {
        this.kasa =
            new KasaForEdnokrilWithRightFix(
                'hingesSideLeft',
                'openTilt',
                'left',
                'kriloProzorec',
                this.frameSystem,
                this.userInputParams)
    }

    produceKrila() {
        this.krilo = new KriloForEdnokril(
            1,
            'hingesSideLeft',
            'openTilt',
            'kriloProzorec',
            this.frameSystem,
            this.userInputParams)
    }
}
export class EdnoKriloContainer extends FrameContainer {

    krilo: Krilo

    constructor(userInputParams: Object) {
        super(userInputParams)
        console.log(' here')
        this.produceKrila()
    }

    produceFrameSystem() {
        let frameMaterial = this.userInputParams['frameMaterial']
        let frameModel = this.userInputParams[frameMaterial]
        if (frameModel === 'kommerling76') {
            this.frameSystem = new Kommerling76System()
        }
    }
    produceKasa() {
        this.kasa = new KasaForEdnokril('hingesSideLeft', 'openTilt', 'kriloProzorec',
            this.frameSystem,
            this.userInputParams)
    }

    produceKrila() {
        this.krilo = new KriloForEdnokril(1, 'hingesSideLeft', 'openTilt', 'kriloProzorec', this.frameSystem, this.userInputParams)
    }
}
export class DveKrilaContainer extends FrameContainer {

    kriloLeft: Krilo
    kriloRight: Krilo
    plavashtDelitel: Delitel

    constructor(userInputParams: Object) {
        super(userInputParams)
        this.produceKrila()
        this.produceLetqshtDelitels()
    }

    produceFrameSystem() {
        let frameMaterial = this.userInputParams['frameMaterial']
        let frameModel = this.userInputParams[frameMaterial]
        if (frameModel === 'kommerling76') {
            this.frameSystem = new Kommerling76System()
        }
    }
    produceKasa() {
        this.kasa = new KasaForDveKrila(
            'hingesSideLeft', //snimkaId
            'hingesSideRight', //snimkaId
            'open', //snimkaId
            'openTilt',//snimkaId
            'kriloProzorec',//snimkaId
            this.frameSystem,
            this.userInputParams)
    }

    produceKrila() {
        this.kriloLeft =
            new KriloForDvukril(
                2,//snimkaId
                'hingesSideLeft',//snimkaId
                'open', //snimkaId
                'kriloProzorec',//snimkaId
                this.frameSystem,
                this.userInputParams
            )
        this.kriloRight =
            new KriloForDvukril(
                1,//snimkaId
                'hingesSideRight',//snimkaId
                'openTilt',//snimkaId
                'kriloProzorec',//snimkaId
                this.frameSystem,
                this.userInputParams
            )
    }
    produceLetqshtDelitels() {
        this.plavashtDelitel = new DelitelPlavasht(this.userInputParams)
    }

    toString() {
        let ob = {'kril': this.kriloLeft.toString() }
        return ob
    }
}
export class ProcessData {

    snimkaId: string

    constructor(private params: Object) {
        this.snimkaId = this.params['snimkaId']
    }

    produceOutput() {
        // throw new Error('greshka ot ruk')

        if (this.snimkaId === 'EdnoKriloContainer') {
            let ednoKriloOpenTiltHingesLeft = new EdnoKriloContainer(this.params)
            return ednoKriloOpenTiltHingesLeft
        } else if (this.snimkaId === 'EdnoKrilStatilDelitelContainer') {
            let ednoKrilStatilDelitelContainer = new EdnoKrilStatilDelitelContainer(this.params)
            return ednoKrilStatilDelitelContainer
            // console.log(ednoKrilStatilDelitelContainer )
        } else if (this.snimkaId === 'DveKrilaContainer') {
            let dveKrilaOtvarqneDqsnoNaklnanqne = new DveKrilaContainer(this.params)
            return dveKrilaOtvarqneDqsnoNaklnanqne.toString()

        }
    }
}






