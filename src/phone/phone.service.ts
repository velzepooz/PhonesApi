import { Injectable } from '@nestjs/common';
import { Phone } from './interfaces/phone.interface';
import { PhoneRepository } from './repository/phone.repository';

@Injectable()
export class PhoneService {
  constructor(private phoneRepository: PhoneRepository) {}

  async add(phone: Phone) {
    try {
      const phoneRecord = await this.phoneRepository.createPhoneRecord(phone);

      return phoneRecord;
    } catch (error) {
      console.log(error);

      throw new PhoneServiceError(error.message);
    }
  }

  async findAll(): Promise<Phone[]> {
    try {
      const phones = await this.phoneRepository.findAll();

      return phones;
    } catch (error) {
      console.log(error);

      throw new PhoneServiceError(error.message);
    }
  }
}

class PhoneServiceError extends Error {
  constructor(message) {
    super(message);

    this.name = 'PhoneServiceError';
  }
}
