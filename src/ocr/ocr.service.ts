import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { readFile } from 'fs/promises';

@Injectable()
export class OcrService {
  async recognizeText(imagePath: string): Promise<string> {
    try {
      // Charger l'image
      const imageBuffer = await readFile(imagePath);

      // Utiliser Tesseract pour extraire le texte
      const result = await Tesseract.recognize(
        imageBuffer,
        'eng', // Changez la langue selon vos besoins
      );
      console.log(result.data.text);

      return result.data.text; // Retourner le texte extrait
    } catch (error) {
      console.error('Erreur lors de l\'extraction de texte:', error);
      throw new Error('Erreur lors de l\'extraction de texte.');
    }
  }
}
