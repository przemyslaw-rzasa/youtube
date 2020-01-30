"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/user.entity");
exports.GetUser = common_1.createParamDecorator((data, req) => req.user);
//# sourceMappingURL=get-user.decorator.js.map