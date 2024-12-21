import { Response } from "express";

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

interface IData<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  meta?: IMeta;
}

export const sendResponse = <T>(res: Response, data: IData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
    meta: data.meta || null,
  });
};
