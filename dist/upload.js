"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpload = void 0;
const dropbox_1 = require("dropbox");
const node_fetch_1 = __importDefault(require("node-fetch"));
function makeUpload(accessToken) {
    const dropbox = new dropbox_1.Dropbox({ accessToken, fetch: node_fetch_1.default });
    return {
        upload: async (path, contents, options) => {
            const res = await dropbox.filesUpload({
                path,
                contents,
                mode: getMode(options.mode),
                autorename: options.autorename,
                mute: options.mute,
            });
            return res;
        },
    };
}
exports.makeUpload = makeUpload;
function getMode(mode) {
    switch (mode) {
        case 'overwrite':
            return {
                '.tag': 'overwrite',
            };
        case 'add':
        default:
            return {
                '.tag': 'add',
            };
    }
}
