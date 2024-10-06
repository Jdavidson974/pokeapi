import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: '.uploads' })) // Assurez-vous que 'file' correspond à la clé du champ dans Postman
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Aucun fichier téléchargé');
    }
    const text = await this.ocrService.recognizeText(file.path); // Utilise file.path
    return { text };
  }
}
