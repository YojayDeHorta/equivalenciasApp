import { Injectable } from '@nestjs/common';
import { Converter } from './converter.entity';
import { readFile } from 'fs/promises';
const units = {
    length: [
        {
            name: 'Kilometers',
            abbreviation: 'km'
        },  
        {
            name: 'Meters',
            abbreviation:'m'
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
            abbreviation:'mm'
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
            abbreviation:'m/s'
        }, 
        {
            name: 'Kilometers per hour',
            abbreviation: 'km/h'
        }, 
        {
            name: 'Millimeters per second',
            abbreviation:'mm/s'
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
            abbreviation:'mo'
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
            abbreviation:'min'
        }, 
        {
            name: 'Seconds',
            abbreviation:'s'
        }, 
        {
            name: 'Milliseconds',
            abbreviation:'ms'
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
}
@Injectable()
export class ConverterService {
    private arregloDeConversiones:Converter[]=[{
        valueToconvert:3,
        convertTo:"cm",
        convertFrom:"m",
        valorConvertido:2
    }]
    async getListaConverter(IDunidad:string){
        const converter = units;
        // const converter = JSON.parse(await readFile("./src/converter/converterNames.json", "utf8"));
        if (!converter.hasOwnProperty(IDunidad)) 
            return {ok:false,message: "it seems that the converter/equivalence is wrong, they were not found in the table of equivalences"}
        return converter[IDunidad];
    }

    async convertirConverter(IDunidad:string,valueToconvert:number,convertTo:string,convertFrom:string){
        const equivalencias = JSON.parse(await readFile("./src/equivalencias.json", "utf8"));
        if (!equivalencias.hasOwnProperty(IDunidad)) 
            return {ok:false,message: "it seems that the converter/equivalence is wrong, they were not found in the table of equivalences"}

        const equivalenciaPrincipal = equivalencias[IDunidad]        
        if (!equivalenciaPrincipal.convertFrom.hasOwnProperty(convertFrom)||!equivalenciaPrincipal.convertFrom.hasOwnProperty(convertTo)) 
            return {ok:false,message: "it seems that the convertTo or convertFrom is wrong, they were not found in the table of equivalences"}

        let convertidoAmetros=valueToconvert*equivalenciaPrincipal.convertFrom[convertFrom]
        let metrosTo=convertidoAmetros*equivalenciaPrincipal.convertTo[convertTo]
        console.log(metrosTo.toExponential().replace('e', ' x 10^'));
        let metroconvertido:any
        if (metrosTo.toString().includes('e')) {
            metroconvertido=metrosTo.toExponential().replace('e', 'x10^')
        }else{
            metroconvertido=metrosTo
        }
         //guardar longitudes
         const ConverterConvertida={
            valueToconvert,
            convertTo,
            convertFrom,
            valorConvertido:metrosTo
         }
        this.arregloDeConversiones.push(ConverterConvertida)
        return {ok:true,message:`successfully converted ${convertFrom} to ${convertTo}`,result:metroconvertido}
    }
}
