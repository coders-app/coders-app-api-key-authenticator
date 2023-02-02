var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  authenticateApp: () => authenticateApp_default,
  checkApiKey: () => checkApiKey_default
});
module.exports = __toCommonJS(src_exports);

// src/redis/redis.ts
var import_ioredis = __toESM(require("ioredis"), 1);

// src/loadEnvironments.ts
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password
} = process.env;
var environment = {
  redis: {
    host,
    port: +port,
    password
  }
};

// src/redis/redis.ts
var {
  redis: { host: host2, password: password2, port: port2 }
} = environment;
var redis = new import_ioredis.default({ host: host2, password: password2, port: port2 });
var redis_default = redis;

// src/redis/getApps/getApps.ts
var getApps = async (targetApp) => {
  const apps = await redis_default.get(targetApp);
  return apps ? JSON.parse(apps) : {};
};
var getApps_default = getApps;

// src/authenticateApp/authenticateApp.ts
var authenticateApp = async (targetApp, appToAuthenticate, hashToAuthenticate) => {
  const apps = await getApps_default(targetApp);
  const hash = apps[appToAuthenticate];
  if (!hash) {
    return false;
  }
  return hash === hashToAuthenticate;
};
var authenticateApp_default = authenticateApp;

// src/checkApiKey/checkApiKey.ts
var checkApiKey = (targetApp, appToAuthenticate) => async (req, res, next) => {
  const apiKeyHeader = "X-API-KEY";
  const apiKey = req.get(apiKeyHeader);
  try {
    if (!await authenticateApp_default(targetApp, appToAuthenticate, apiKey)) {
      throw new Error("Invalid API key");
    }
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
var checkApiKey_default = checkApiKey;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateApp,
  checkApiKey
});