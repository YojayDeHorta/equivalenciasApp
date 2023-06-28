import { Body, Controller,Get, Post,Param } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { CreateConverterDto } from './dto/converter.dto';
@Controller('converter')
export class ConverterController {
    constructor(private converterService:ConverterService){

    }
    @Get()
    getListaConverter(){
        return this.converterService.getListaConverter()
    }

    @Post(':unidad')
    convertirConverter(@Body() newConverter:CreateConverterDto,@Param('unidad') IDunidad){
        console.log(newConverter);
        return this.converterService.convertirConverter(IDunidad,newConverter.valueToconvert,newConverter.convertTo,newConverter.convertFrom)
    }
}
