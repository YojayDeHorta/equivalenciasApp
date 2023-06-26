import { Body, Controller,Get, Post } from '@nestjs/common';
import { LongitudService } from './longitud.service';
import { CreateLongitudDto } from './dto/longitud.dto';
@Controller('longitud')
export class LongitudController {
    constructor(private longitudService:LongitudService){

    }
    @Get()
    getListaLongitud(){
        return this.longitudService.getListaLongitud()
    }

    @Post()
    convertirLongitud(@Body() newLongitud:CreateLongitudDto){
        console.log(newLongitud);
        return this.longitudService.convertirLongitud(newLongitud.valorAconvertir,newLongitud.convertTo,newLongitud.convertFrom)
    }
}
