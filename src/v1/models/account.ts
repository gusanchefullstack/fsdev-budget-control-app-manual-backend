export interface IAccountCreate {
  name: string;
  accountNumber: string;
  entity: string;
  balance?: number;
}

export interface IAccountUpdate {
  name?: string;
  accountNumber?: string;
  entity?: string;
  balance?: number;
}
