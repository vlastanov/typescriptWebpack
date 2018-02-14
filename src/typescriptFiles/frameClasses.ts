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


    constructor(
        protected frameSystem: FrameSystem,
        protected userInputParams: Object) {

        this.widthContainer = parseInt(this.userInputParams['width']) || 1000
        this.heightContainer = parseInt(this.userInputParams['height']) || 1000
        this.produceRollerShutter()
        this.produceKasa()
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

        result['kasa'] = this.kasa.toString()
        result['rollerShutter'] = this.rollerShutter.toString()
        result['mreja'] = this.mreja

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
        let fullWidth = this.kasa.kasaWidth //1000
        let fullHeight = this.kasa.kasaHeight
        let debelinaNaKasata = this.frameSystem.sectionKasa.profilSectionHeight //67
        let zastap = this.frameSystem.overlapKriloKasa//29

        let kriloWidth = fullWidth - (2 * debelinaNaKasata) + (2 * zastap)
        let kriloHeight = fullHeight - (2 * debelinaNaKasata) + (2 * zastap)

        let debelenaNaKriloto = this.frameSystem.sectionKriloProzorec.profilSectionHeight
        let zastapStaklopaket = this.frameSystem.overlapStaklopaketKriloIliKasa
        let materialFillingWidth = kriloWidth - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)
        let materialFillingHeight = kriloHeight - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)

        let fillingMaterial = new FillingMaterial(materialFillingWidth, materialFillingHeight, 'staklo')



        this.krilo = new Krilo(
            1,
            'hingesSideLeft',
            'openTilt',
            'kriloProzorec',
            kriloWidth,
            kriloHeight,
            this.frameSystem.sectionKriloProzorec,
            fillingMaterial)
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

        let fullWidth = this.kasa.kasaWidth //1000
        let fullHeight = this.kasa.kasaHeight
        let debelinaNaKasata = this.frameSystem.sectionKasa.profilSectionHeight //67
        let debelinaNaDelitelaStatichen = this.frameSystem.sectionDelitelStatichen.profilSectionHeight //84

        let zastapKriloKasa = this.frameSystem.overlapKriloKasa//29
        let zastapKriloKasaIliDel = this.frameSystem.overlapKriloKasa//29

        let fillingMaterilaWidth = (this.kasa as KasaForEdnokrilWithRightFix).fillingMaterial.fillingMaterilaWidth


        let kriloWidth = fullWidth - (2 * debelinaNaKasata) + zastapKriloKasa - debelinaNaDelitelaStatichen + zastapKriloKasaIliDel
            - fillingMaterilaWidth

        let kriloHeight = fullHeight - (2 * debelinaNaKasata) + (2 * zastapKriloKasa)

        let debelenaNaKriloto = this.frameSystem.sectionKriloProzorec.profilSectionHeight
        let zastapStaklopaket = this.frameSystem.overlapStaklopaketKriloIliKasa
        let materialFillingWidth = kriloWidth - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)
        let materialFillingHeight = kriloHeight - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)

        let fillingMaterial = new FillingMaterial(materialFillingWidth, materialFillingHeight, 'staklo')


        this.krilo = new Krilo(
            1,
            'hingesSideLeft',
            'openTilt',
            'kriloProzorec',
            kriloWidth,
            kriloHeight,
            this.frameSystem.sectionKriloProzorec,
            fillingMaterial)
    }
}
export class DveKrilaContainer extends FrameContainer {

    kriloLeft: Krilo
    kriloRight: Krilo
    plavashtDelitel: Delitel

    constructor(frameSystem: FrameSystem, userInputParams: Object) {
        super(frameSystem, userInputParams)
        this.produceLetqshtDelitels()
        this.produceKrila()
    }

    produceKrila() {

        let fullWidth = this.kasa.kasaWidth //1000
        let fullHeight = this.kasa.kasaHeight
        let debelinaNaKasata = this.frameSystem.sectionKasa.profilSectionHeight //67
        let zastapKriloKasa = this.frameSystem.overlapKriloKasa//29
        let zastapDelitelKrilo = this.frameSystem.overlapDelitelKrilo //30
        let debelinaNaDelitela = this.frameSystem.sectionDelitelLetqsht.profilSectionHeight

        let kriloWidth = 0
        kriloWidth = (fullWidth - (2 * debelinaNaKasata) + (2 * zastapKriloKasa) - debelinaNaDelitela + (2 * zastapDelitelKrilo)) / 2

        let kriloHeight = 0
        kriloHeight = fullHeight - (2 * debelinaNaKasata) + (2 * zastapKriloKasa)

        let debelenaNaKriloto = this.frameSystem.sectionKriloProzorec.profilSectionHeight
        let zastapStaklopaket = this.frameSystem.overlapStaklopaketKriloIliKasa
        let materialFillingWidth = kriloWidth - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)
        let materialFillingHeight = kriloHeight - (debelenaNaKriloto * 2) + (2 * zastapStaklopaket)

        let fillingMaterial = new FillingMaterial(materialFillingWidth, materialFillingHeight, 'staklo')

        this.kriloLeft =
            new Krilo(
                2,//snimkaId
                'hingesSideLeft',//snimkaId
                'open', //snimkaId
                'kriloProzorec',//snimkaId
                kriloWidth,
                kriloHeight,
                this.frameSystem.sectionKriloProzorec, fillingMaterial
            )
        this.kriloRight =
            new Krilo(
                1,//snimkaId
                'hingesSideRight',//snimkaId
                'openTilt',//snimkaId
                'kriloProzorec',//snimkaId
                kriloWidth,
                kriloHeight,
                this.frameSystem.sectionKriloProzorec, fillingMaterial
            )
    }
    produceLetqshtDelitels() {
        this.plavashtDelitel = new DelitelPlavasht(
            this.kasa.kasaWidth,
            this.kasa.kasaHeight,
            this.frameSystem)
    }

    toString() {
        let result = super.toString()
        result['kriloLeft'] = this.kriloLeft.toString()
        result['kriloRight'] = this.kriloRight.toString()

        return result
    }
}
export class ProcessData {

    snimkaId: string
    frameSystem: FrameSystem
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
        if (this.snimkaId === 'EdnoKriloContainer') {
            let ednoKriloOpenTiltHingesLeft = new EdnoKriloContainer(this.frameSystem, this.params)
            return ednoKriloOpenTiltHingesLeft
        } else if (this.snimkaId === 'EdnoKrilStatilDelitelContainer') {
            let ednoKrilStatilDelitelContainer = new EdnoKrilStatilDelitelContainer(this.frameSystem, this.params)
            return ednoKrilStatilDelitelContainer
        } else if (this.snimkaId === 'DveKrilaContainer') {
            let dveKrilaOtvarqneDqsnoNaklnanqne = new DveKrilaContainer(this.frameSystem, this.params)
            return dveKrilaOtvarqneDqsnoNaklnanqne
        }
    }
}