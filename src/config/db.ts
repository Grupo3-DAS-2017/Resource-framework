const MongoClient = require('mongodb').MongoClient;

export class DB {
    private static instance: DB;

    private state = {
      db: null,
    };

    private constructor() {
        console.log('New DB connection on create');
    }

    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    connect(url, done) {
        if (this.state.db) return done();

        MongoClient.connect(url, (err, db) => {
            this.state.db = db;
            done(err);
        });
    }

    getDB() {
        return this.state.db;
    }

    close(done) {
        if (this.state.db) {
            this.state.db.close((err, result) => {
                this.state.db = null;
                done(err);                
            });
        }
    }
}
