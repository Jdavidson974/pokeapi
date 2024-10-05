import { Test, TestingModule } from '@nestjs/testing';
import { BiomesService } from './biomes.service';

describe('BiomesService', () => {
  let service: BiomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiomesService],
    }).compile();

    service = module.get<BiomesService>(BiomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
