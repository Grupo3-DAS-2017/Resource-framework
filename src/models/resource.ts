import { GenericDAO } from '../DAO';

export class Resource extends GenericDAO {
    getDocName() {
        return 'resource';
    }

    validadePresenceOf() {
        return ['name', 'description', 'code'];
    }
}