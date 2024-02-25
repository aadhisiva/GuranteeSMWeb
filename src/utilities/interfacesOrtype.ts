export interface ISelectInput {
    options?: any;
    value?:string; 
    defaultSelect?:string; 
    controlId?:string; 
    name?:string;
    isValueAdded?: boolean, 
    required?: boolean, 
    onChange?: (e: any) => void;
}

export interface ITitleBar {
    title?: any;
}
export interface ITextInput {
    onChange?: (e: any) => void;
    name?: string;
    placeholder?: string;
    value?:string; 
    defaultOption?:string; 
    controlId?:string; 
    type?:string; 
    maxLength?:number; 
    disabled?:boolean; 
    className?:any; 
}
export interface IMasterData {
    PHCName?: string;
    SubCenterName?: string;
    Type?: string;
    DistrictName?:string; 
    TalukOrTownName?:string; 
    HobliOrZoneName?:string; 
    VillageOrWardName?:number; 
    Name?:number; 
    Role?:number; 
    Mobile?:number; 
}
export interface IModalFromEdit {
    title?: string;
    onHide?: () => void;
    show?: boolean;
    saveType?: string;
    handleSubmitForm?: any;
    formData?: any;
    handleInputChange?: (e: any) => void;
    handleModifyAssignedUser?: any;
}
export interface ILoaderOverlay {
    isLoading?: boolean;
}