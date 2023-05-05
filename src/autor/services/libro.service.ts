import { Injectable, NotFoundException } from '@nestjs/common';
import { Libro } from '../entities/libro.entity';
import { Autor } from './../entities/autor.entity';
import { CreateLibroDto, UpdateLibroDto } from '../dtos/libro.dto';

@Injectable()
export class LibroService {
  private counterId = 1;
  fechaPublicacion = new Date(1967, 5);
  private libro: Libro[] = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autorId: 1,
      autor: {
        id: 1,
        nombre: 'Gabriel García Márquez',
        edad: '87',
        nacionalidad: 'Colombiano',
        genero: 'Masculino',
        obras_publicadas: [],
      },
      genero: 'Novela',
      sinopsis:
        'Entre la boda de José Arcadio Buendía con Amelia Iguarán hasta la maldición de Aureliano Babilonia transcurre todo un siglo. Cien años de soledad para una estirpe única, fantástica, capaz de fundar una ciudad tan especial como Macondo y de engendrar niños con cola de cerdo.',
      idioma: 'Español',
      formato: 'Digital y Fisico',
      anio_publicacion: this.fechaPublicacion,
    },
  ];

  findAll() {
    return this.libro;
  }

  findOne(id: number) {
    const libro = this.libro.find((item) => item.id === id);
    if (!libro) {
      throw new NotFoundException(`Libro #${id} not found`);
    }
    return libro;
  }

  create(data: CreateLibroDto) {
    this.counterId = this.counterId + 1;
    const newLibro = {
      id: this.counterId,
      ...data,
    };
    this.libro.push(newLibro);
    return newLibro;
  }

  update(id: number, changes: UpdateLibroDto) {
    const libro = this.findOne(id);
    const index = this.libro.findIndex((item) => item.id === id);
    this.libro[index] = {
      ...libro,
      ...changes,
    };
    return this.libro[index];
  }

  delete(id: number) {
    const index = this.libro.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Libro #${id} not found`);
    }
    this.libro.splice(index, 1);
    return true;
  }
}
