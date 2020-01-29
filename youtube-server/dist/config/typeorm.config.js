"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../users/user.entity");
exports.typeOrmConfig = {
    type: "postgres",
    host: "youtube-database",
    username: "youtube",
    password: "youtube",
    database: "youtube",
    entities: [user_entity_1.User],
    synchronize: true
};
//# sourceMappingURL=typeorm.config.js.map