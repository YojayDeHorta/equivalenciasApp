export declare class MonedasService {
    private arregloDemonedas;
    getMonedasService(): Promise<any[]>;
    convertirMoneda(valueToconvert: number, convertTo: string, convertFrom: string): Promise<{
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
