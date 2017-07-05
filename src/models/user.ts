import { GenericDAO } from '../DAO';

export class User extends GenericDAO {
    getDocName() {
        return 'user';
    }

    validadePresenceOf() {
        return ['name', 'matricula'];
    }
}