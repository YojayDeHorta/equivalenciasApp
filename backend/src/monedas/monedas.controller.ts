import { Body, Controller,Get, Post } from '@nestjs/common';
import { MonedasService } from './monedas.service';
import { CreateMonedasDto } from './dto/monedas.dto';


@Controller('monedas')
export class MonedasController {
    constructor(private monedaService:MonedasService){

    }
    @Get()
    getListaMonedas(){
        return this.monedaService.getMonedasService()
    }
    @Post()
    convertirMoneda(@Body() newMonedas:CreateMonedasDto){
        console.log(newMonedas);
        return this.monedaService.convertirMoneda(newMonedas.valorAconvertir,newMonedas.convertTo,newMonedas.convertFrom)
    }
}
