import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Book } from './books.model';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Get()
    async fetchAll(): Promise<Book[]> {
        return this.booksService.fetchAll();
    }

    @Get(':id')
    async fetchById(@Param() params): Promise<Book> {
        return this.booksService.fetchById(Number(params.id));
    }

    @Post()
    async create(@Body() book: Book): Promise<Book> {
        return this.booksService.create(book);
    }

    @Put(':id')
    async update(@Body() book: Book, @Param() params): Promise<[number, Book[]]> {
        return this.booksService.update(book, Number(params.id));
    }

    @Delete(':id')
    async remove(@Param() params): Promise<Book> {
        return this.booksService.remove(Number(params.id));
    }
}
