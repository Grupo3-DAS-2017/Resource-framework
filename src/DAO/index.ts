const ObjectId = require('mongodb').ObjectID;
import { DB } from '../config/db';
import { PresenceValidator } from '../validations/presence';

 export abstract class GenericDAO {

    abstract getDocName();
    abstract validadePresenceOf(): Array<string>;

    private getCollection() {
        return DB.getInstance().getDB().collection(this.getDocName());        
    }

    createRecord(cb, newRecord) {

        let validationResult = this.getPresenceValidator()
                                    .validade(newRecord, this.validadePresenceOf());
        
        if (validationResult.status) {
            this.getCollection().insertOne(newRecord)
            .then( result => {
                cb(newRecord);
            }).catch(err => {
                console.log(err);
            });
        } else {
            cb(validationResult.menssage);
        }
    }

    findAll(cb) {
        this.getCollection().find().toArray()
            .then(results => {
                cb(results);
            }).catch(err => {
                console.log(err);
            });
    }

    findRecord(cb, id) {
        this.getCollection().findOne({ _id: ObjectId(id) })
        .then(result => {            
            cb(result);
        }).catch( err => {
            console.log(err);
        });
    }

    deleteRecord(cb, id) {
        this.getCollection().remove({ _id: ObjectId(id) })
            .then(() => {
                cb();
            })
            .catch(err => {
                console.log(err);
            })
    }

    updateRecord(cb, id, newData) {
        this.getCollection().findAndModify(
            { _id: ObjectId(id) },
            [],
            { $set: newData },
            {new: true}
        ).then(result => {
            cb(result.value);
        }).catch(err => {
            console.log(err);
        });
    }

    private getPresenceValidator() {
        return new PresenceValidator();
    }
}