import { RoleResolver } from '@/modules/role/role.resolver';
import { RoleService } from '@/modules/role/role.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('RoleResolver', () => {
  let resolver: RoleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleResolver, RoleService],
    }).compile();

    resolver = module.get<RoleResolver>(RoleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
