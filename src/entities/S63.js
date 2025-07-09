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
exports.S63 = void 0;
const typeorm_1 = require("typeorm");
let S63 = class S63 {
};
exports.S63 = S63;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], S63.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S63.prototype, "idRpt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S63.prototype, "idPet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S63.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S63.prototype, "rtuId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S63.prototype, "lvsId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S63.prototype, "lvsPos", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], S63.prototype, "errCat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], S63.prototype, "errCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], S63.prototype, "fh", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S63.prototype, "et", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], S63.prototype, "c", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], S63.prototype, "d1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], S63.prototype, "d2", void 0);
exports.S63 = S63 = __decorate([
    (0, typeorm_1.Entity)()
], S63);
