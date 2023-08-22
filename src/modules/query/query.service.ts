import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { format } from 'node-pg-format';

import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';

export interface HasuraOperation {
  type: 'run_sql';
  args: {
    cascade: boolean;
    read_only: boolean;
    source: string;
    sql: string;
  };
}

export function getPreparedHasuraQuery(
  dataSource: string,
  sqlTemplate: string,
  ...args: any[]
): HasuraOperation {
  return {
    type: 'run_sql',
    args: {
      cascade: true,
      read_only: false,
      source: dataSource,
      sql: `${format(sqlTemplate, ...args)
        .trim()
        .replace(/\s+/g, ' ')};`,
    },
  };
}

export function makeQuery(
  dataSource: string,
  sqlTemplate: string,
  ...args: any[]
): HasuraOperation {
  const preparedHasuraQuery = getPreparedHasuraQuery(
    dataSource,
    sqlTemplate.replace(/\s+/g, ' '),
    ...args
  );

  return {
    ...preparedHasuraQuery,
    args: {
      ...preparedHasuraQuery.args,
      read_only: true,
    },
  };
}
const SYSTEM_TABLES = ['pg_%', 'hdb_%', 'information_schema'];

@Injectable()
export class QueryService {
  constructor(protected readonly prisma: PrismaService) {}

  async findDatabase() {
    const query1 = makeQuery(
      'public',
      `SELECT row_to_json(table_data) as data FROM information_schema.schemata table_data WHERE %s ORDER BY schema_name ASC`,
      SYSTEM_TABLES.map((value) => `schema_name NOT LIKE '${value}'`).join(' AND ')
    );
    const res1 = await this.prisma.$queryRawUnsafe(query1.args.sql);
    const query2 = makeQuery(
      'public',
      `SELECT row_to_json(table_data) as data FROM information_schema.tables table_data WHERE %s ORDER BY table_name ASC`,
      SYSTEM_TABLES.map((value) => `table_schema NOT LIKE '${value}'`).join(' AND ')
    );
    const res2 = await this.prisma.$queryRawUnsafe(query2.args.sql);
    return [res1, res2];
  }

  async processQuery(body: any) {
    console.log(body);
    if (body.type === 'bulk') {
      const result = await Promise.all(
        body.args.map(async (args) => {
          console.log(args.args.sql);
          return await this.prisma.$queryRawUnsafe(args.args.sql);
        })
      );

      return JSON.stringify(result, (_, v) =>
        typeof v === 'bigint' ? v.toString().replace('n', '') : v
      );
    }
    return 'ok';
  }
}
