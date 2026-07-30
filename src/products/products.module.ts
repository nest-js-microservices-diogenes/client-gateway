import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: Envs.PRODUCTS_MS_HOST,
          port: Envs.PRODUCT_MS_PORT,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
