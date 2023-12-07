import { Module } from '@nestjs/common';

export const Constants = {
  TYPE_ITEM: {
    PRODUCT: 'product',
    SERVICE: 'service',
    ALLOCATE: 'allocate',
  },
};

@Module({})
export class ConstantsModule {}