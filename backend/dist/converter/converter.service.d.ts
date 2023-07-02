export declare class ConverterService {
    private arregloDeConversiones;
    getListaConverter(IDunidad: string): Promise<any>;
    convertirConverter(IDunidad: string, valueToconvert: number, convertTo: string, convertFrom: string): Promise<{
        ok: boolean;
        message: string;
        result?: undefined;
    } | {
        ok: boolean;
        message: string;
        result: any;
    }>;
}
