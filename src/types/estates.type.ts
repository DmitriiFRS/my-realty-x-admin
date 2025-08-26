export interface ICreateEstateData {
   description: string;
   estateTypeId: number;
   cityId: number;
   districtId: number;
   roomId?: number;
   currencyTypeId: number;
   dealTermId: number;
   area: number;
   price: number;
   primaryImage: File;
   images: File[];
}
