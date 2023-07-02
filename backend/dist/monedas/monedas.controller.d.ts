import { MonedasService } from './monedas.service';
import { CreateMonedasDto } from './dto/monedas.dto';
export declare class MonedasController {
    private monedaService;
    constructor(monedaService: MonedasService);
    getListaMonedas(): Promise<any[]>;
    convertirMoneda(newMonedas: CreateMonedasDto): Promise<{
        ok: boolean;
        message: string;
        result?: undefined;
        currency?: undefined;
    } | {
        ok: boolean;
        message: string;
        result: number;
        currency: string;
    }>;
}
