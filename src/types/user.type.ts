export interface IUser {
   id: number;
   name: string;
   phone: string;
   createdAt: string;
   rating: number;
}

export interface IUserResponse {
   data: IUser[];
}

export interface IUserData {
   id: number;
   name: string;
   phone: string;
   password: string;
}

export interface IResponseUserData {
   token: string | undefined;
   user: IUserData;
}

export interface IUserDataWithRole {
   id: number;
   name: string;
   phone: string;
   password: string;
   role: {
      id: number;
      slug: string;
      name: string;
   };
}
