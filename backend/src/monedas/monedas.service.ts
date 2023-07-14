import { Inject, Injectable } from '@nestjs/common';
import { Monedas } from './monedas.entity';
import { readFile } from 'fs/promises';
import { ConfigService } from '@nestjs/config';

const fetch = require('node-fetch');

@Injectable()
export class MonedasService {
    @Inject(ConfigService)
    public config: ConfigService;

    private arregloDemonedas:Monedas[]=[
        
    ]
    async getMonedasService(){
        const codigosMonedas = JSON.parse(await readFile("./src/monedas/codigosMonedas.json", "utf8"));
        let array=[]
        for (var key in codigosMonedas) {
            // console.log(codigosMonedas[key]);
            // ...
            array.push({
                name:codigosMonedas[key].name,
                abbreviation:key
            })
        }
        // console.log(array);
        
        return array
    }
    async convertirMoneda(valueToconvert:number,convertTo:string,convertFrom:string){
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': this.config.get('KEY'),
              'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        };
        try {
            const codigosMonedas = JSON.parse(await readFile("./src/monedas/codigosMonedas.json", "utf8"));
            if (!codigosMonedas.hasOwnProperty(convertFrom)||!codigosMonedas.hasOwnProperty(convertTo)) 
                return {ok:false,message: "it seems that the convertTo or convertFrom are incorrect, they were not found in the currencies table"}
            console.log(valueToconvert);
            
            const respuesta = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=${convertFrom}&to=${convertTo}&q=${valueToconvert}`, options);
            const result = await respuesta.text();
            // console.log(this.config.get('KEY'));
            
            const MonedaConvertida={
                valueToconvert,
                convertTo,
                convertFrom,
                valorConvertido:result*valueToconvert
             }
            this.arregloDemonedas.push(MonedaConvertida)
            return {ok:true,message:`successfully converted ${convertFrom} to ${convertTo}`,result:result*valueToconvert,currency:convertTo}

        } catch (error) {
            console.error(error);
            return {ok:false,message: "CURRENCY API ERROR"}
        }
    }
}
