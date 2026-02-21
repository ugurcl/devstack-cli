import { FileOutput } from "../../types/index.js";

export function generateQueryBuilder(): FileOutput[] {
  return [
    {
      path: "src/utils/queryBuilder.util.ts",
      content: `import { Query } from "mongoose";

interface QueryParams {
  sort?: string;
  fields?: string;
  page?: string;
  limit?: string;
  [key: string]: unknown;
}

interface PaginationInfo {
  page: number;
  limit: number;
  skip: number;
  total: number;
  totalPages: number;
}

const EXCLUDED_FIELDS = ["sort", "fields", "page", "limit"];

export class QueryBuilder<T> {
  private query: Query<T[], T>;
  private params: QueryParams;
  private _total = 0;

  constructor(query: Query<T[], T>, params: QueryParams) {
    this.query = query;
    this.params = params;
  }

  filter(): this {
    const filterObj: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(this.params)) {
      if (!EXCLUDED_FIELDS.includes(key) && value !== undefined) {
        filterObj[key] = value;
      }
    }

    let filterStr = JSON.stringify(filterObj);
    filterStr = filterStr.replace(/\\b(gte|gt|lte|lt)\\b/g, (match) => \`$\${match}\`);

    this.query = this.query.find(JSON.parse(filterStr));
    return this;
  }

  sort(): this {
    if (this.params.sort) {
      const sortBy = this.params.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  select(): this {
    if (this.params.fields) {
      const fields = this.params.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }

  paginate(): this {
    const page = Math.max(parseInt(this.params.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(this.params.limit || "10", 10), 1), 100);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  async exec(): Promise<T[]> {
    return this.query.exec();
  }

  async count(model: { countDocuments(filter?: Record<string, unknown>): Promise<number> }): Promise<PaginationInfo> {
    const filterObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(this.params)) {
      if (!EXCLUDED_FIELDS.includes(key) && value !== undefined) {
        filterObj[key] = value;
      }
    }

    this._total = await model.countDocuments(filterObj);
    const page = Math.max(parseInt(this.params.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(this.params.limit || "10", 10), 1), 100);

    return {
      page,
      limit,
      skip: (page - 1) * limit,
      total: this._total,
      totalPages: Math.ceil(this._total / limit),
    };
  }
}
`,
    },
  ];
}
