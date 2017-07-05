import { GenericDAO } from '../DAO';

export class Allocation extends GenericDAO {
    getDocName() {
        return 'allocation';
    }

    validadePresenceOf() {
        return ['user_id', 'resource_id', 'initial_date', 'time'];
    }
}