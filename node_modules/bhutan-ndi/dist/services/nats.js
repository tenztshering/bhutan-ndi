"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToNATS = connectToNATS;
exports.subscribeToThread = subscribeToThread;
exports.closeNATSConnection = closeNATSConnection;
const nats_1 = require("nats");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let natsConnection = null;
const sc = (0, nats_1.StringCodec)();
function connectToNATS() {
    return __awaiter(this, void 0, void 0, function* () {
        if (natsConnection)
            return natsConnection;
        // Import nkeyAuthenticator from 'nats'
        // Make sure to add this import at the top: import { nkeyAuthenticator } from 'nats';
        natsConnection = yield (0, nats_1.connect)({
            servers: process.env.NATS_URL,
            authenticator: (0, nats_1.nkeyAuthenticator)(() => {
                if (!process.env.NATS_SEED)
                    throw new Error('NATS_SEED is not defined');
                return Uint8Array.from(Buffer.from(process.env.NATS_SEED, 'base64'));
            })
        });
        return natsConnection;
    });
}
function subscribeToThread(threadId, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const nc = yield connectToNATS();
        const sub = nc.subscribe(threadId);
        (() => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, sub_1 = __asyncValues(sub), sub_1_1; sub_1_1 = yield sub_1.next(), _a = sub_1_1.done, !_a; _d = true) {
                    _c = sub_1_1.value;
                    _d = false;
                    const m = _c;
                    callback(JSON.parse(sc.decode(m.data)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = sub_1.return)) yield _b.call(sub_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }))();
        return sub;
    });
}
function closeNATSConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (natsConnection) {
            yield natsConnection.close();
            natsConnection = null;
        }
    });
}
