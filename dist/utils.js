"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asBoolean = exports.isDirectory = void 0;
function isDirectory(path) {
    return path.endsWith('/');
}
exports.isDirectory = isDirectory;
function asBoolean(s) {
    return s.toLowerCase() === 'true';
}
exports.asBoolean = asBoolean;
