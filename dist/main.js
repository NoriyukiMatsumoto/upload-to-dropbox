"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
const upload_1 = require("./upload");
const utils_1 = require("./utils");
const dropbox_1 = require("dropbox");
const accessToken = core.getInput('dropbox_access_token');
const src = core.getInput('src');
const dest = core.getInput('dest');
const url_dest_path = core.getInput('url_dest_path');
const mode = core.getInput('mode');
const autorename = (0, utils_1.asBoolean)(core.getInput('autorename'));
const mute = (0, utils_1.asBoolean)(core.getInput('mute'));
async function run() {
    try {
        const { upload } = (0, upload_1.makeUpload)(accessToken);
        const contents = await fs.promises.readFile(src);
        if ((0, utils_1.isDirectory)(dest)) {
            const path = (0, path_1.join)(dest, (0, path_1.basename)(src));
            await upload(path, contents, { mode, autorename, mute });
            core.info(`Uploaded: ${src} -> ${path}`);
        }
        else {
            await upload(dest, contents, { mode, autorename, mute });
            core.info(`Uploaded: ${src} -> ${dest}`);
        }
    }
    catch (error) {
        if (error instanceof dropbox_1.DropboxResponseError) {
            core.error(error.error);
        }
        core.setFailed(error);
    }
}
void run();
