const uuid = require('uuid');

class User {
    constructor(username, age, hobbies = []) {
        this.id = uuid.v4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    static fromObject(obj) {
        const { id, username, age, hobbies } = obj;
        const user = new User(username, age, hobbies);
        user.id = id;
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            age: this.age,
            hobbies: this.hobbies
        };
    }
}

module.exports = User;
