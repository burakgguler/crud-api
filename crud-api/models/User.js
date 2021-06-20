const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATE
    },
    balance: {
        type: Sequelize.FLOAT
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
}
);

module.exports = User;