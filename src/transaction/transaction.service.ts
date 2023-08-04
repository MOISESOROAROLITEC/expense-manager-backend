import { Injectable } from '@nestjs/common';
import * as GrapQLTypes from 'src/graphql-types';

@Injectable()
export class TransactionService {

  async create(): Promise<GrapQLTypes.Transaction> {
    return
  }
}
