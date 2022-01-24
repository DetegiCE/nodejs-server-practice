const { sequelize } = require('./models/index.js');

const driver = () => {
    sequelize.sync().then(() => {
        console.log('Initialized');
    }).catch((err) => {
        console.error('Initialize Failed');
        console.error(err);
    });
};
driver();