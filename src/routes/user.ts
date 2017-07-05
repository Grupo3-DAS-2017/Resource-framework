import { BaseRoute } from "./Generic";
import { User } from '../models/user';

export class UserRoute extends BaseRoute {
  constructor() {
    super();
  }

  urlPrefix() {
    return 'users';
  }

  model() {
    return new User;
  }
}