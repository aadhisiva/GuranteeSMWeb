export enum DISTRICT_ROLES { 
    DPM ="DPM",
    WCD = "WCD-DD",
    DHO="DHO",
    RDPR="RDPR-DSO",
    DUDC="DUDC-PD",
    BBMP="BBMP"
};

export const DISTRICT_ALL_ROLES = [
    DISTRICT_ROLES.DPM,
    DISTRICT_ROLES.WCD,
    DISTRICT_ROLES.RDPR,
    DISTRICT_ROLES.BBMP,
    DISTRICT_ROLES.DHO,
    DISTRICT_ROLES.DUDC
];
export enum TALUK_ROLES { 
    CDPO = "CDPO",
    THO = "THO",
    EO = "EO",
    CMC_TMC_TPC = "CMC/TMC/TPC",
    ZON_IC = "Zone InCharge"
};

export const TALUK_ALL_ROLES = [
    TALUK_ROLES.CDPO,
    TALUK_ROLES.CMC_TMC_TPC,
    TALUK_ROLES.EO,
    TALUK_ROLES.ZON_IC,
    TALUK_ROLES.THO
];
export enum PHC_ROLES { 
    SuperVisor = "SuperVisor",
    PHCO = "PHCO",
    PDO = "PDO",
    CAO_CO = "CAO/CO",
    DIVISON_IN = "Division InCharge",
};

export const PHC_ALL_ROLES = [
    PHC_ROLES.CAO_CO,
    PHC_ROLES.PDO,
    PHC_ROLES.PHCO,
    PHC_ROLES.SuperVisor,
    PHC_ROLES.DIVISON_IN
];