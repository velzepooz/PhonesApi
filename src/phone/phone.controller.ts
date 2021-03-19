import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { AddPhoneDto } from './dto/add-phone.dto';
import { Phone } from './interfaces/phone.interface';

@Controller('phones')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async findAll(): Promise<Phone[]> {
    try {
      const phones = await this.phoneService.findAll();

      return phones;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Error getting phones',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async add(@Body() addPhoneDto: AddPhoneDto) {
    try {
      await this.phoneService.add(addPhoneDto);
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Error while create new phone record',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
