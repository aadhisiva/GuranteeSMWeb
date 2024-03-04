import React from "react";

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
    VillageOrWardName?:string; 
    Name?:string; 
    Role?:string; 
    Mobile?:string;
    CreatedBy?: string;
    CreatedMobile?: string; 
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
export interface ISearchBox {
    searchTerm?: string;
    setSearchTerm?: any;
}
export interface IPagination {
    totalPages?: number | any;
    currentCount?: number | any;
    currentPage?: number | any;
    onPageChange?: any;
    totalCount?: string | any;
}

export interface IDashBoardCounts {
    Totalcount?: number | undefined;
    TotalOffline?: number | undefined;
    TotalMobile?: number | any;
    TotalOnline?: number;
}
export interface IReportsDashBoard {
    Gl_Count?: number | undefined;
    Gj_Count?: number | undefined;
    Yn_Count?: number | undefined;
    Ab_Count?: number | undefined;
    Ss_Count?: number | undefined;
}
export interface IDistrictReports {
    DistrictName?: string;
    TalukOrTownName?: string;
    Gruhalakshmi?: string;
    GruhaJyothi?: string;
    Yuvanidhi?: string;
    AnnaBhagya?: string;
    Shakthi?: string;
    Asha?: string;
    Anganvadi?: string;
    UrbanSurveyor?: string | undefined;
    Total_Asha_AWW?: string;
}