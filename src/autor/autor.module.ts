import { Module } from '@nestjs/common';

import { AutorController } from './controllers/autor.controller';
import { LibroController } from './controllers/libro.controller';
import { AutorService } from './services/autor.service';
import { LibroService } from './services/libro.service';
import { BibliotecaModule } from 'src/biblioteca/biblioteca.module';

@Module({
  imports: [BibliotecaModule],
  controllers: [AutorController, LibroController],
  providers: [AutorService, LibroService],
  exports: [LibroService],
})
export class AutorModule {}
