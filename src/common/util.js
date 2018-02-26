import fs from 'fs';
import path from 'path';

export default  {
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