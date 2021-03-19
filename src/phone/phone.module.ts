import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { PhoneRepository } from './repository/phone.repository';

@Module({
  controllers: [PhoneController],
  providers: [PhoneService, PhoneRepository],
})
export class PhoneModule {}
