import { Surreal, StringRecordId } from "surrealdb";

export class SurrealWrapper {
  private db: Surreal;
  private connected: boolean = false;

  constructor() {
    this.db = new Surreal();
  }

  public isConnected(): boolean {
    return !!this.connected;
  }

  public async connect(config: DatabaseConfig): Promise<void> {
    try {
      await this.db.connect(config.url);
      await this.db.signin({
        username: config.username,
        password: config.password,
      });
      await this.db.use({
        namespace: config.namespace,
        database: config.database,
      });
      this.connected = true;
    } catch (error) {
      this.connected = false;
      throw error;
    }
  }

  public async create(table: string, data: any) {
    const create = await this.db.create(table, data);
    return create;
  }

  public async change(table: string, data: any) {
    const change = await this.db.query(
      `UPDATE ${table} MERGE ${JSON.stringify(data)}`
    );

    return change;
  }

  public async select(table: string, id?: boolean) {
    try {
      if (id) {
        const recordId = new StringRecordId(table);
        return await this.db.select(recordId);
      }

      return await this.db.select(table);
    } catch (error) {
      return false;
    }
  }

  public async update(table: string, data: any) {
    const update: any = await this.db.query(
      `UPDATE ${table} CONTENT ${JSON.stringify(data)}`
    );

    return update;
  }

  public async query(query: string, data: any) {
    const queryy = await this.db.query(query, data);
    return queryy;
  }

  public async delete(table: string) {
    return await this.db.delete(table);
  }

  public async getTable(table: string) {
    return await this.db.select(table);
  }
}
