import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCtegory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepositoy: ICategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCtegory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCtegory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existsCategory = await this.categoriesRepositoy.findByName(name);

      if (!existsCategory) {
        await this.categoriesRepositoy.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
