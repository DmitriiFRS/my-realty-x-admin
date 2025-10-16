import { IMedia, IPagination } from './common.type';
import { IEntity } from './entities.type';
import { IUser } from './user.type';

export type IEstateStatus = 'pending' | 'verified' | 'rejected';

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
   featureIds: number[];
   status: string;
   primaryImage: File;
   images: File[];
   targetUserId: number;
}

export interface IUpdateEstateData extends ICreateEstateData {
   existingImages: IMedia[];
}

export interface IEstate {
   id: number;
   slug: string;
   description: string;
   area: number;
   price: string;
   primaryImageUrl: string;
   createdAt: string;
   updatedAt: string;
   user: IUser;
   status: {
      id: number;
      status: IEstateStatus;
   };
   currencyType: IEntity;
   dealTerm: IEntity;
   district: IEntity;
   city: IEntity;
   estateType: IEntity;
   room: IEntity | null;
   features: IEntity[];
   media: IMedia[];
}

export interface IEstatesResponse extends IEstate {
   data: IEstate[];
   meta: IPagination;
}
