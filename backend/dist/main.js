"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`API is running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map