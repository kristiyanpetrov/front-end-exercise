import { User } from "./user.model";

export interface File {
  creationDateTime:	string;
  status:	string;
  modifiedBy:	number;
  createdByUser?: User;
  modifiedByUser?: User;
  type:	string;
  uri: string;
  version:	number;
  id:	string;
  fileId:	string;
  scheduled: boolean;
  title:	string;
  createdBy: number;
  modifiedDateTime:	string;
  live:	boolean;
  popularity: number;
}
