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

export enum EnumFrameModel {
    kbe = 'kbe',
    kommerling76 = 'kommerling76',
    E1000 = 'E1000',
    E75 = 'E75',
}


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

export enum EnumShutterModel {
    buildOn = 'buildOn',
    buildIn = 'buildIn',
    kapak1 = 'kapak1',
    kapak2 = 'kapak2',

}

interface IProfilApplicataionAndType {
    profilType: string;
    profilApplication: string;
}