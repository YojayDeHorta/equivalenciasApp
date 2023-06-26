import { Injectable } from '@nestjs/common';
import { Longitud } from './longitud.entity';
@Injectable()
export class LongitudService {
    private arregloDelongitudes:Longitud[]=[{
        valorAconvertir:3,
        convertTo:"centimetros",
        convertFrom:"metros",
        valorConvertido:2
    }]
    getListaLongitud(){
        return this.arregloDelongitudes;
    }

    convertirLongitud(valorAconvertir:number,convertTo:string,convertFrom:string){

         //guardar longitudes
         const Longitud={
            valorAconvertir,
            convertTo,
            convertFrom,
            valorConvertido:3
         }
        this.arregloDelongitudes.push(Longitud)
        return Longitud
    }
}
