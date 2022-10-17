import { Prisma } from '@prisma/client';

import { PrismaService } from 'providers/prisma/prisma.service';
import { PaginationParams } from './pagination-params';

export type Many<P> = {
  data: P[];
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

// TODO: try to use better generics
// checkout casl-prisma, they have done the same thing
export async function findManyAndCount<P, T extends Prisma.ModelName>(
  prisma: PrismaService,
  model: T,
  params?: PaginationParams,
): Promise<Many<P>> {
  const itemsPerPage = params?.itemsPerPage ?? 20;
  const page = params?.page ?? 1;
  const where = params?.where ? JSON.parse(params.where) : undefined;
  const orderBy = params?.orderBy ? JSON.parse(params.orderBy) : undefined;

  const skip = (page - 1) * itemsPerPage;
  const take = itemsPerPage;

  // PascalCase to camelCase
  const modelName = model.charAt(0).toLowerCase() + model.slice(1);

  const result = await prisma.$transaction([
    prisma[modelName].findMany({
      skip,
      take,
      where: {
        AND: {
          ...where,
        },
      },
      orderBy,
    }),
    prisma[modelName].count({
      where: {
        ...where,
      },
    }),
  ]);

  return {
    data: result[0],
    itemsPerPage,
    totalItems: result[1],
    currentPage: page,
    totalPages: Math.ceil(result[1] / itemsPerPage),
  };
}
