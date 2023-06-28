import { IsString, IsNotEmpty ,Min } from "class-validator";

export class CreateConverterDto {
    @Min(1)
    valueToconvert:number;
    @IsString()
    @IsNotEmpty()
    convertTo:string;
    @IsString()
    @IsNotEmpty()
    convertFrom:string;
}