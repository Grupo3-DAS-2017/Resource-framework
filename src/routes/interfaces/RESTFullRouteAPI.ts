import { NextFunction, Request, Response, Router } from "express";

export interface RESTFullRouteAPI {
   viewAll(req: Request, res: Response, next: NextFunction);
   viewRecord(req: Request, res: Response, next: NextFunction);
   createRecord(req: Request, res: Response, next: NextFunction);
   updateRecord(req: Request, res: Response, next: NextFunction);
   deleteRecord(req: Request, res: Response, next: NextFunction);
}