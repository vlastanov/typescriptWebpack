import { RollerShutter, Mreja, FillingMaterial, } from './containerIngredientsElements'
import { Krilo, } from './krilaModels';
import { Kasa, KasaForEdnokrilWithRightFix, } from './kasaModels';
import { Delitel, DelitelPlavasht, DelitelStatichen, DelitelStatichenVertical } from './delitelsModel';
import { Kommerling76System, FrameSystem } from './frameSystems';
import { JSON } from 'sammy';

export class FrameContainer {

    widthContainer: number
    heightContainer: number

    rollerShutter: RollerShutter
    kasa: Kasa
    mreja: Mreja
    //normalShutter:NormalShutter

    srcId: string
    snimkaId: string

    kriloWidthOtvor: number
    kriloHeightOtvor: number

    constructor(
        protected frameSystem: FrameSystem,
        protected userInputParams: Object) {
        this.srcId = this.userInputParams['srcId']
        this.snimkaId = this.userInputParams['snimkaId']

        this.widthContainer = parseInt(this.userInputParams['width']) || 1000
        this.heightContainer = parseInt(this.userInputParams['height']) || 1000
        this.produceRollerShutter()
        this.produceKasa()
        this.kriloWidthOtvor = this.kasa.widthOtvor
        this.kriloHeightOtvor = this.kasa.heightOtvor
        this.produceMreja()

        this.produceNormalShutter()
    }

    produceRollerShutter() {
        this.rollerShutter = new RollerShutter(
            this.userInputParams['shutter'],
            this.userInputParams['roller'],
            this.frameSystem,
            this.widthContainer,
            this.heightContainer)


    }
    produceKasa() {
        let kasaWidth = this.widthContainer
        let kasaHeight = this.heightContainer - this.rollerShutter.rollerBoxHeight

        this.kasa = new Kasa(kasaWidth, kasaHeight, this.frameSystem)
    }
    produceMreja() {
        this.mreja = new Mreja(
            this.userInputParams['checkBoxMreja'],
            this.kasa.kasaWidth,
            this.kasa.kasaHeight,
            this.userInputParams)
    }
    produceNormalShutter() {
        if (this.userInputParams['shutter'] === 'roller') {
        } else if (this.userInputParams['shutter'] === 'wingSwing') {
            this.rollerShutter = null

        } else if (this.userInputParams['shutter'] === 'noShutter') {
            this.rollerShutter = null
        }
    }

    toString() {
        let result = {}

        result['srcId'] = this.srcId
        result['snimkaId'] = this.snimkaId
        result['kasa'] = this.kasa.toString()
        result['rollerShutter'] = this.rollerShutter.toString()
        result['mreja'] = this.mreja.toString()

        return result
    }
}
export class EdnoKriloContainer extends FrameContainer {

    krilo: Krilo

    constructor(frameSystem: FrameSystem, userInputParams: Object) {
        super(frameSystem, userInputParams)
        this.produceKrila()
    }

    produceKrila() {

        this.krilo = new Krilo(
            1,
            'hingesSideLeft',
            'openTilt',
            'kriloProzorec',
            this.kriloWidthOtvor,
            this.kriloHeightOtvor,
            this.frameSystem, 'staklo')
    }

    toString() {
        let result = super.toString()

        result['krilo'] = this.krilo.toString()

        return result
    }
}
export class EdnoKrilStatilDelitelContainer extends FrameContainer {

    krilo: Krilo

    constructor(frameSystem: FrameSystem, userInputParams: Object) {
        super(frameSystem, userInputParams)
        this.produceKrila()
    }
    produceKasa() {

        let kasaWidth = this.widthContainer
        let kasaHeight = this.heightContainer - this.rollerShutter.rollerBoxHeight

        this.kasa = new KasaForEdnokrilWithRightFix(kasaWidth, kasaHeight, this.frameSystem, )
    }

    produceKrila() {
        let debelinaNaDelitelaStatichen = this.frameSystem.sectionDelitelStatichen.profilSectionHeight //84
        let delitelStatichenZab = this.frameSystem.sectionDelitelStatichen.profilSectionZab

        let kriloWidthOtvorNew = (this.kriloWidthOtvor - debelinaNaDelitelaStatichen + (2 * delitelStatichenZab)) / 2
        let kriloHeightNew = this.kriloHeightOtvor

        this.kriloWidthOtvor = kriloWidthOtvorNew
        this.kriloHeightOtvor = kriloHeightNew

        this.krilo = new Krilo(
            1,
            'hingesSideLeft',
            'openTilt',
            'kriloProzorec',
            this.kriloWidthOtvor,
            this.kriloHeightOtvor,
            this.frameSystem, 'staklo')
    }

    toString() {
        let result = super.toString()
        result['krilo'] = this.krilo.toString()

        return result
    }
}
export class DveKrilaContainer extends FrameContainer {

    kriloLeft: Krilo
    kriloRight: Krilo
    plavashtDelitel: Delitel

    constructor(private nomerNaKriloLeft: number, private leftWingSchema: string, private nomerNaKriloRight: number, private rightWingSchema: string, frameSystem: FrameSystem, userInputParams: Object) {
        super(frameSystem, userInputParams)
        this.produceLetqshtDelitels()
        this.produceKrila()
        this.produceExceptions()
    }

    produceLetqshtDelitels() {
        this.plavashtDelitel = new DelitelPlavasht(
            this.kasa.kasaWidth,
            this.kasa.kasaHeight,
            this.frameSystem)
    }
    produceKrila() {

        let zastapDelitelKrilo = this.frameSystem.sectionDelitelLetqsht.overlapKriloKasa
        let debelinaNaDelitela = this.frameSystem.sectionDelitelLetqsht.profilSectionHeight
        let delitelZab = this.frameSystem.sectionDelitelLetqsht.profilSectionZab

        let kriloWidthOtvorNew =
            (this.kriloWidthOtvor - debelinaNaDelitela + zastapDelitelKrilo + delitelZab) / 2

        let kriloHeightNew = this.kriloHeightOtvor

        this.kriloWidthOtvor = kriloWidthOtvorNew
        this.kriloHeightOtvor = kriloHeightNew

        this.kriloLeft =
            new Krilo(
                this.nomerNaKriloLeft,
                'hingesSideLeft',
                this.leftWingSchema,
                'kriloProzorec',
                this.kriloWidthOtvor,
                this.kriloHeightOtvor,
                this.frameSystem, 'staklo'
            )
        this.kriloRight =
            new Krilo(
                this.nomerNaKriloRight,
                'hingesSideRight',
                this.rightWingSchema,
                'kriloProzorec',
                this.kriloWidthOtvor,
                this.kriloHeightOtvor,
                this.frameSystem, 'staklo'
            )

    }
    produceExceptions() {
        let exption =
            (this.kriloRight.schema === 'openTilt' && this.kriloRight.nomerNaKrilo === 1)
            && (this.kriloLeft.schema === 'openTilt')
            && (this.kriloLeft.kriloWidth - 40 < 405)
        if (exption) {
            throw new Error(`Ширината на лявото крило по фалц е ${this.kriloLeft.kriloWidth - 40}.
                    Минималната ширина по фалц е 405`)
        }
    }

    toString() {
        let result = super.toString()
        result['kriloLeft'] = this.kriloLeft.toString()
        result['kriloRight'] = this.kriloRight.toString()
        result['plavashtDelitel'] = this.plavashtDelitel.toString()

        return result
    }
}

export class DveKrilaSFixContainer extends DveKrilaContainer {

    constructor(nomerNaKriloLeft: number, leftWingSchema: string, nomerNaKriloRight: number, rightWingSchema: string, frameSystem: FrameSystem, userInputParams: Object) {
        super(nomerNaKriloLeft, leftWingSchema, nomerNaKriloRight, rightWingSchema, frameSystem, userInputParams)

    }
    produceKasa() {

        let kasaWidth = this.widthContainer
        let kasaHeight = this.heightContainer - this.rollerShutter.rollerBoxHeight

        this.kasa = new KasaForEdnokrilWithRightFix(kasaWidth, kasaHeight, this.frameSystem)
    }

    toString() {
        let result = super.toString()

        return result
    }
}
export class ProcessData {

    snimkaId: string
    frameSystem: FrameSystem
    resultInstance: FrameContainer



    //del
    rollerShutter: RollerShutter

    constructor(private params: Object) {
        this.snimkaId = this.params['snimkaId']
        this.produceFramSystem()
    }

    produceFramSystem() {
        let frameMaterial = this.params['frameMaterial']
        let frameModel = this.params[frameMaterial] || 'kommerling76'

        if (frameModel === 'kommerling76') {
            this.frameSystem = new Kommerling76System()
        }
    }

    produceOutput() {
        // throw new Error('greshka ot ruk')
        if (this.snimkaId === '') {
            let ednoKriloOpenTiltHingesLeft = new EdnoKriloContainer(this.frameSystem, this.params)
            return ednoKriloOpenTiltHingesLeft.toString()
        } else if (this.snimkaId === 'EdnoKriloContainer') {
            let ednoKriloOpenTiltHingesLeft = new EdnoKriloContainer(this.frameSystem, this.params)
            return ednoKriloOpenTiltHingesLeft.toString()
        } else if (this.snimkaId === 'EdnoKrilStatilDelitelContainer') {
            let ednoKrilStatilDelitelContainer = new EdnoKrilStatilDelitelContainer(this.frameSystem, this.params)
            return ednoKrilStatilDelitelContainer.toString()
        } else if (this.snimkaId === 'DveKrilaContainer') {
            let dveKrilaOtvarqneDqsnoNaklnanqne = new DveKrilaContainer(2, 'open', 1, 'openTilt', this.frameSystem, this.params)
            return dveKrilaOtvarqneDqsnoNaklnanqne.toString()
        } else if (this.snimkaId === 'DveKrilaNaklanqne2StraniContainer') {
            let DveKrilaNaklanqne2StraniContainer = new DveKrilaContainer(2, 'openTilt', 1, 'openTilt', this.frameSystem, this.params)
            return DveKrilaNaklanqne2StraniContainer.toString()
        } else if (this.snimkaId === 'DvukrilNaklanqnelqvoContainer') {
            let dvukrilNaklanqnelqvoContainer = new DveKrilaContainer(1, 'openTilt', 2, 'open', this.frameSystem, this.params)
            return dvukrilNaklanqnelqvoContainer.toString()
        } else if (this.snimkaId === 'DvukrilSFixContainer') {
            let dvukrilNaklanqnelqvoSFixContainer = new DveKrilaSFixContainer(2, 'open', 1, 'openTilt', this.frameSystem, this.params)
            return dvukrilNaklanqnelqvoSFixContainer.toString()
        }

    }
}