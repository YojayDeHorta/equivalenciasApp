import { Injectable } from '@nestjs/common';
import { Monedas } from './monedas.entity';
import { readFile } from 'fs/promises';

const fetch = require('node-fetch');
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e283b8df23msh74bcf5383bf312ap1e196bjsn49c68856fb3c',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  };
@Injectable()
export class MonedasService {
    private arregloDemonedas:Monedas[]=[
        
    ]
    async getMonedasService(){
        return this.arregloDemonedas
    }
    async convertirMoneda(valorAconvertir:number,convertTo:string,convertFrom:string){
        try {
            const codigosMonedas = JSON.parse(await readFile("./src/monedas/codigosMonedas.json", "utf8"));
            if (!codigosMonedas.hasOwnProperty(convertFrom)||!codigosMonedas.hasOwnProperty(convertTo)) 
                return {mensaje: "parece que el convertTo o convertFrom estan incorrectos, no se encontraron en la tabla de las monedas"}
            console.log(valorAconvertir);
            
            const respuesta = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${convertFrom}&to=${convertTo}&q=${valorAconvertir}`, options);
            const result = await respuesta.text();

            const MonedaConvertida={
                valorAconvertir,
                convertTo,
                convertFrom,
                valorConvertido:result*valorAconvertir
             }
            this.arregloDemonedas.push(MonedaConvertida)
            return {mensaje:`se convirtio exitosamente de ${convertFrom} a ${convertTo}`,resultado:result*valorAconvertir}

        } catch (error) {
            console.error(error);
            return {mensaje: "ERROR DE LA API DE EQUIVALENCIAS"}

        }
    }
}
