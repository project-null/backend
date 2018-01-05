const fs = require('fs');
const path = require('path');

module.exports = {
    config: null,

    // 读取配置文件
    getConfig() {
        if (!!this.config) {
            return this.config;
        }
        let configPath = path.join(__dirname, '..', 'config.json');
        this.config = JSON.parse(fs.readFileSync(configPath));
        return this.config;
    },
}