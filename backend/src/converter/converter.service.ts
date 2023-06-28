import { Injectable } from '@nestjs/common';
import { Converter } from './converter.entity';
import { readFile } from 'fs/promises';

@Injectable()
export class ConverterService {
    private arregloDeConversiones:Converter[]=[{
        valueToconvert:3,
        convertTo:"cm",
        convertFrom:"m",
        valorConvertido:2
    }]
    async getListaConverter(){

        return this.arregloDeConversiones;
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
