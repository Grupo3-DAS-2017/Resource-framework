import { NextFunction, Request, Response, Router } from "express";
import { RESTFullRouteAPI } from '../interfaces/RESTFullRouteAPI';
import { GenericDAO } from '../../DAO';

/**
 * Constructor
 *
 * @class BaseRoute
 */
export abstract class BaseRoute implements RESTFullRouteAPI {

  protected title: string;

  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */
  constructor() {
    //initialize variables
    this.title = "ResourceFramework API";
  }

  abstract model() : GenericDAO;
  abstract urlPrefix();
  
  public render(req: Request, res: Response, json?: Object) {
    //add title
    res.locals.title = this.title;

    //render view
    res.json(json);
  }

  public create(router: Router) {
    console.log(`[ROUTES::create] Creating ${this.urlPrefix()} route.`);
    let parsedPrefix = this.parsedPrefix();

    router.route(parsedPrefix)
          .get((req: Request, res: Response, next: NextFunction) => {
            this.viewAll(req, res, next);
          })
          .post((req: Request, res: Response, next: NextFunction) => {
            this.createRecord(req, res, next);
          });

    router.route(parsedPrefix + '/:model_id')
          .get((req: Request, res: Response, next: NextFunction) => {
            this.viewRecord(req, res, next);
          })
          .put((req: Request, res: Response, next: NextFunction) => {
            this.updateRecord(req, res, next);
          })
          .delete((req: Request, res: Response, next: NextFunction) => {
            this.deleteRecord(req, res, next);
          });
  }

  viewAll(req: Request, res: Response, next: NextFunction) {
    this.model().findAll((results) => {
      this.render(req, res, results);
    });
  }

  viewRecord(req: Request, res: Response, next: NextFunction) {
    this.model().findRecord((result) => {
      this.render(req, res, result);
    }, req.params.model_id);
  }

  createRecord(req: Request, res: Response, next: NextFunction) {
    this.model().createRecord((result) => {
       this.render(req, res, result); 
    }, req.body);
  }

  updateRecord(req: Request, res: Response, next: NextFunction) {
    this.model().updateRecord((result) => {
      this.render(req, res, result);
    }, req.params.model_id, req.body);
  }

  deleteRecord(req: Request, res: Response, next: NextFunction) {
    this.model().deleteRecord((result) => {
      this.render(req, res, result);
    }, req.params.model_id);
  }

  parsedPrefix() {
    return "/" + this.urlPrefix();
  }
}