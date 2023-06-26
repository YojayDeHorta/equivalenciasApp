import { IsString, IsNotEmpty ,Min } from "class-validator";

export class CreateLongitudDto {
    @Min(1)
    valorAconvertir:number;
    @IsString()
    @IsNotEmpty()
    convertTo:string;
    @IsString()
    @IsNotEmpty()
    convertFrom:string;
}