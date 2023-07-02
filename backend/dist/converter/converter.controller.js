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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverterController = void 0;
const common_1 = require("@nestjs/common");
const converter_service_1 = require("./converter.service");
const converter_dto_1 = require("./dto/converter.dto");
let ConverterController = exports.ConverterController = class ConverterController {
    constructor(converterService) {
        this.converterService = converterService;
    }
    getListaConverter(IDunidad) {
        return this.converterService.getListaConverter(IDunidad);
    }
    convertirConverter(newConverter, IDunidad) {
        console.log(newConverter);
        return this.converterService.convertirConverter(IDunidad, newConverter.valueToconvert, newConverter.convertTo, newConverter.convertFrom);
    }
};
__decorate([
    (0, common_1.Get)(':unidad'),
    __param(0, (0, common_1.Param)('unidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConverterController.prototype, "getListaConverter", null);
__decorate([
    (0, common_1.Post)(':unidad'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('unidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [converter_dto_1.CreateConverterDto, Object]),
    __metadata("design:returntype", void 0)
], ConverterController.prototype, "convertirConverter", null);
exports.ConverterController = ConverterController = __decorate([
    (0, common_1.Controller)('converter'),
    __metadata("design:paramtypes", [converter_service_1.ConverterService])
], ConverterController);
//# sourceMappingURL=converter.controller.js.map