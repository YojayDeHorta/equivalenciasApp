"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConverterService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const units = {
    length: [
        {
            name: 'Kilometers',
            abbreviation: 'km'
        },
        {
            name: 'Meters',
            abbreviation: 'm'
        },
        {
            name: 'Decimeters',
            abbreviation: 'dm'
        },
        {
            name: 'Centimeters',
            abbreviation: 'cm'
        },
        {
            name: 'Millimeters',
            abbreviation: 'mm'
        },
        {
            name: 'Micrometers',
            abbreviation: 'um'
        },
        {
            name: 'Nanometers',
            abbreviation: 'nm'
        },
        {
            name: 'Angstroms',
            abbreviation: 'A'
        }
    ],
    speed: [
        {
            name: 'Kilometers per second',
            abbreviation: 'km/s'
        },
        {
            name: 'Meters per second',
            abbreviation: 'm/s'
        },
        {
            name: 'Kilometers per hour',
            abbreviation: 'km/h'
        },
        {
            name: 'Millimeters per second',
            abbreviation: 'mm/s'
        },
        {
            name: 'Micrometers per second',
            abbreviation: 'um/s'
        }
    ],
    time: [
        {
            name: 'Years',
            abbreviation: 'yr'
        },
        {
            name: 'Months',
            abbreviation: 'mo'
        },
        {
            name: 'Weeks',
            abbreviation: 'wk'
        },
        {
            name: 'Days',
            abbreviation: 'd'
        },
        {
            name: 'Hours',
            abbreviation: 'h'
        },
        {
            name: 'Minutes',
            abbreviation: 'min'
        },
        {
            name: 'Seconds',
            abbreviation: 's'
        },
        {
            name: 'Milliseconds',
            abbreviation: 'ms'
        },
        {
            name: 'Microseconds',
            abbreviation: 'us'
        },
        {
            name: 'Nanoseconds',
            abbreviation: 'ns'
        }
    ]
};
let ConverterService = exports.ConverterService = class ConverterService {
    constructor() {
        this.arregloDeConversiones = [{
                valueToconvert: 3,
                convertTo: "cm",
                convertFrom: "m",
                valorConvertido: 2
            }];
    }
    async getListaConverter(IDunidad) {
        const converter = units;
        if (!converter.hasOwnProperty(IDunidad))
            return { ok: false, message: "it seems that the converter/equivalence is wrong, they were not found in the table of equivalences" };
        return converter[IDunidad];
    }
    async convertirConverter(IDunidad, valueToconvert, convertTo, convertFrom) {
        const equivalencias = JSON.parse(await (0, promises_1.readFile)("./src/equivalencias.json", "utf8"));
        if (!equivalencias.hasOwnProperty(IDunidad))
            return { ok: false, message: "it seems that the converter/equivalence is wrong, they were not found in the table of equivalences" };
        const equivalenciaPrincipal = equivalencias[IDunidad];
        if (!equivalenciaPrincipal.convertFrom.hasOwnProperty(convertFrom) || !equivalenciaPrincipal.convertFrom.hasOwnProperty(convertTo))
            return { ok: false, message: "it seems that the convertTo or convertFrom is wrong, they were not found in the table of equivalences" };
        let convertidoAmetros = valueToconvert * equivalenciaPrincipal.convertFrom[convertFrom];
        let metrosTo = convertidoAmetros * equivalenciaPrincipal.convertTo[convertTo];
        console.log(metrosTo.toExponential().replace('e', ' x 10^'));
        let metroconvertido;
        if (metrosTo.toString().includes('e') || metrosTo > 1000000) {
            metroconvertido = metrosTo.toExponential().replace('e', 'x10^');
        }
        else {
            metroconvertido = metrosTo.toPrecision(4);
        }
        const ConverterConvertida = {
            valueToconvert,
            convertTo,
            convertFrom,
            valorConvertido: metrosTo
        };
        this.arregloDeConversiones.push(ConverterConvertida);
        return { ok: true, message: `successfully converted ${convertFrom} to ${convertTo}`, result: metroconvertido };
    }
};
exports.ConverterService = ConverterService = __decorate([
    (0, common_1.Injectable)()
], ConverterService);
//# sourceMappingURL=converter.service.js.map