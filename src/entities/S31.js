"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S31 = void 0;
const typeorm_1 = require("typeorm");
let S31 = class S31 {
};
exports.S31 = S31;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], S31.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S31.prototype, "idRpt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S31.prototype, "idPet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S31.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S31.prototype, "cnc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S31.prototype, "cnt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S31.prototype, "fh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S31.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S31.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S31.prototype, "keyRequest", void 0);
exports.S31 = S31 = __decorate([
    (0, typeorm_1.Entity)()
], S31);
