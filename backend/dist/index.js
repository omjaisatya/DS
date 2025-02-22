"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const connection_1 = require("./db/connection");
const envConfig_1 = require("./config/envConfig");
const port = envConfig_1.PORT || 5000;
(0, connection_1.connectToDatabase)()
    .then(() => {
    server_1.default.listen(port, () => {
        console.log(`Server is running on Port ${port}`);
    });
})
    .catch((err) => {
    console.log("Error to connecting Database", err);
});
//# sourceMappingURL=index.js.map