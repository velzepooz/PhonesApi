import * as AWS from 'aws-sdk';
import { AddPhoneDto } from '../dto/add-phone.dto';
import { v4 as uuid } from 'uuid';
import { Phone } from '../interfaces/phone.interface';

// AWS.config.update({ region: 'eu-west-1' });
// const endpoint = {
//   'endpoint': 'http://localhost:8000',
// };

export class PhoneRepository {
  async createPhoneRecord(addPhoneDto: AddPhoneDto) {
    const newPhoneRecord = {
      id: uuid(),
      number: addPhoneDto.number,
    };

    try {
      await new AWS.DynamoDB.DocumentClient()
        .put({
          TableName: process.env.ORDERS_TABLE_NAME,
          Item: newPhoneRecord,
        })
        .promise();
    } catch (error) {
      throw new PhoneRepositoryError(error);
    }
  }

  async findAll(): Promise<Phone[]> {
    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .scan({
          TableName: process.env.ORDERS_TABLE_NAME,
        })
        .promise();

      return result.Items.map((item) => {
        return {
          id: item.id,
          number: item.number,
        };
      });
    } catch (error) {
      throw new PhoneRepositoryError(error);
    }
  }
}

export class PhoneRepositoryError extends Error {
  constructor(message) {
    super(message);

    this.name = 'PhoneRepositoryError';
  }
}
