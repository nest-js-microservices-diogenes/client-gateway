import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto';
import { PRODUCT_SERVICE } from 'src/config';

interface Product {
  name: string;
  id: number;
  price: number;
}

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    return this.productsClient.send(
      { cmd: 'find_all_products' },
      { limit, page },
    );
  }

  @Post()
  createProduct() {
    return 'Creando un producto';
  }

  @Get('/:id')
  async findOneProduct(@Param('id', new ParseIntPipe()) id: number) {
    try {
      const product: Product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('/:id')
  updateProduct(@Param('id', new ParseIntPipe()) id: number) {
    return `Actualizando el producto ${id}`;
  }

  @Delete('/:id')
  deleteProduct(@Param('id', new ParseIntPipe()) id: number) {
    return `Eliminando el producto ${id}`;
  }
}
