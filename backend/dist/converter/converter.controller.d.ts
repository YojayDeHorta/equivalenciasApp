import { ConverterService } from './converter.service';
import { CreateConverterDto } from './dto/converter.dto';
export declare class ConverterController {
    private converterService;
    constructor(converterService: ConverterService);
    getListaConverter(IDunidad: any): Promise<any>;
    convertirConverter(newConverter: CreateConverterDto, IDunidad: any): Promise<{
        ok: boolean;
        message: string;
        result?: undefined;
    } | {
        ok: boolean;
        message: string;
        result: any;
    }>;
}
