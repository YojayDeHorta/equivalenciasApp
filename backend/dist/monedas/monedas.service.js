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
exports.MonedasService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const config_1 = require("@nestjs/config");
const fetch = require('node-fetch');
let MonedasService = exports.MonedasService = class MonedasService {
    constructor() {
        this.arregloDemonedas = [];
    }
    async getMonedasService() {
        const codigosMonedas = JSON.parse(await (0, promises_1.readFile)("./src/monedas/codigosMonedas.json", "utf8"));
        let array = [];
        for (var key in codigosMonedas) {
            array.push({
                name: codigosMonedas[key].name,
                abbreviation: key
            });
        }
        return array;
    }
    async convertirMoneda(valueToconvert, convertTo, convertFrom) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': this.config.get('KEY'),
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        };
        try {
            const codigosMonedas = JSON.parse(await (0, promises_1.readFile)("./src/monedas/codigosMonedas.json", "utf8"));
            if (!codigosMonedas.hasOwnProperty(convertFrom) || !codigosMonedas.hasOwnProperty(convertTo))
                return { ok: false, message: "it seems that the convertTo or convertFrom are incorrect, they were not found in the currencies table" };
            console.log(valueToconvert);
            if (convertFrom == convertTo) {
                return { ok: false, message: "the currency to be converted is the same, please make a change in the currencies" };
            }
            const respuesta = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${convertFrom}&to=${convertTo}&q=${valueToconvert}`, options);
            const result = await respuesta.text();
            const MonedaConvertida = {
                valueToconvert,
                convertTo,
                convertFrom,
                valorConvertido: result * valueToconvert
            };
            this.arregloDemonedas.push(MonedaConvertida);
            return { ok: true, message: `successfully converted ${convertFrom} to ${convertTo}`, result: result * valueToconvert, currency: convertTo };
        }
        catch (error) {
            console.error(error);
            return { ok: false, message: "CURRENCY API ERROR" };
        }
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], MonedasService.prototype, "config", void 0);
exports.MonedasService = MonedasService = __decorate([
    (0, common_1.Injectable)()
], MonedasService);
//# sourceMappingURL=monedas.service.js.map