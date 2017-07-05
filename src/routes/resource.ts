import { BaseRoute } from "./Generic";
import { Resource } from '../models/resource';

export class ResourceRoute extends BaseRoute {
  constructor() {
    super();
  }

  urlPrefix() {
    return 'resources';
  }

  model() {
    return new Resource;
  }
}