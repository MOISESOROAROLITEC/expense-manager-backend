import { Test, TestingModule } from '@nestjs/testing';
import { TrransactionsFieldsResolver } from './trransactions-fields.resolver';

describe('TrransactionsFieldsResolver', () => {
  let resolver: TrransactionsFieldsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrransactionsFieldsResolver],
    }).compile();

    resolver = module.get<TrransactionsFieldsResolver>(TrransactionsFieldsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
