export interface IMedia {
   id: number;
   order: number;
   url: string;
   size: number;
   createdAt: string;
   updatedAt: string;
}

export interface IPagination {
   total: number;
   page: number;
   pageSize: number;
   totalPages: number;
}

export interface IItemList {
   data: {
      id: number;
   }[];
   meta: IPagination;
}
