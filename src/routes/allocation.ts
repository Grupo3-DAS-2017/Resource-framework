import { BaseRoute } from "./Generic";
import { Allocation } from '../models/allocation';

export class AllocationRoute extends BaseRoute {
  constructor() {
    super();
  }

  urlPrefix() {
    return 'allocations';
  }

  model() {
    return new Allocation;
  }
}