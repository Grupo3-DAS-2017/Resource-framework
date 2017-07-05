import * as express from "express";
import * as bodyParser from "body-parser";

import { BaseRoute } from './routes/Generic';
import { UserRoute } from "./routes/user";
import { ResourceRoute } from "./routes/resource";
import { AllocationRoute } from "./routes/allocation";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add api
    this.api();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  private config() {
    //use json form parser middlware
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  private api() {
    let router: express.Router;
    router = express.Router();
    
    let routes = [
      new UserRoute(),
      new ResourceRoute(),
      new AllocationRoute()
    ];
    
    this.createRoute(routes, router);
    this.app.use(router);
  }

  createRoute(routes: Array<BaseRoute>, router: express.Router) {
    routes.forEach( route => {
      route.create(router);
    });
  }

}