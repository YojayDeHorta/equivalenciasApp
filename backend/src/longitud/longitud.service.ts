import { Injectable } from '@nestjs/common';
import { Longitud } from './longitud.entity';
import { readFile } from 'fs/promises';

@Injectable()
export class LongitudService {
    private arregloDelongitudes:Longitud[]=[{
        valorAconvertir:3,
        convertTo:"cm",
        convertFrom:"m",
        valorConvertido:2
    }]
    async getListaLongitud(){

        return this.arregloDelongitudes;
    }

    async convertirLongitud(valorAconvertir:number,convertTo:string,convertFrom:string){
        const equivalencias = JSON.parse(await readFile("./src/equivalencias.json", "utf8"));
        const longitud = equivalencias.longitud        
        if (!longitud.convertFrom.hasOwnProperty(convertFrom)||!longitud.convertFrom.hasOwnProperty(convertTo)) 
            return {mensaje: "parece que el convertTo o convertFrom estan incorrectos, no se encontraron en la tabla de equivalencias"}

        let convertidoAmetros=valorAconvertir*longitud.convertFrom[convertFrom]
        let metrosTo=convertidoAmetros*longitud.convertTo[convertTo]
        console.log(metrosTo.toExponential().replace('e', ' x 10^'));

         //guardar longitudes
         const LongitudConvertida={
            valorAconvertir,
            convertTo,
            convertFrom,
            valorConvertido:metrosTo
         }
        this.arregloDelongitudes.push(LongitudConvertida)
        return {mensaje:`se convirtio exitosamente ${convertFrom} a ${convertTo}`,resultado:metrosTo}
    }
}
