import { Test, TestingModule } from '@nestjs/testing';
import { BiomesController } from './biomes.controller';
import { BiomesService } from './biomes.service';

describe('BiomesController', () => {
  let controller: BiomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiomesController],
      providers: [BiomesService],
    }).compile();

    controller = module.get<BiomesController>(BiomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
