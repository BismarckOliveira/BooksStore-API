import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book)
        private bookModel: typeof Book,
    ) { }

    async fetchAll(): Promise<Book[]> {
        return this.bookModel.findAll();
    }

    async fetchById(id: number): Promise<Book> {
        const Book = await this.bookModel.findByPk(id);
        return Book;
    }

    async create(book: Book): Promise<Book> {
        const newBook = this.bookModel.create(book);
        return newBook;
    }

    async update(book: Book, id: number): Promise<[number, Book[]]> {
        return this.bookModel.update(book, {
            where: { id: id },
            returning: true,
        });
    }

    async remove(id: number): Promise<Book> {
        const book = await this.fetchById(id);
        book.destroy();
        return book;
    }
}
