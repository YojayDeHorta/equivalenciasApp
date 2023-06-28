import { Body, Controller,Get, Post,Param } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { CreateConverterDto } from './dto/converter.dto';
@Controller('converter')
export class ConverterController {
    constructor(private converterService:ConverterService){

    }
    @Get(':unidad')
    getListaConverter(@Param('unidad') IDunidad){
        return this.converterService.getListaConverter(IDunidad)
    }

    @Post(':unidad')
    convertirConverter(@Body() newConverter:CreateConverterDto,@Param('unidad') IDunidad){
        console.log(newConverter);
        return this.converterService.convertirConverter(IDunidad,newConverter.valueToconvert,newConverter.convertTo,newConverter.convertFrom)
    }
}
