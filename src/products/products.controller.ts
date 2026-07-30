import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Get()
  getProducts() {
    return 'Obteniendo productos';
  }

  @Post()
  createProduct() {
    return 'Creando un producto';
  }

  @Get('/:id')
  findOneProduct(@Param('id', new ParseIntPipe()) id: number) {
    return `Buscando el producto #${id}`;
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
