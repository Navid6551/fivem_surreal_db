export class ConfigManager {
  private config: DatabaseConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): DatabaseConfig {
    const url = GetConvar("surreal_url", "http://127.0.0.1:8000/rpc");
    const namespace = GetConvar("surreal_namespace", "test");
    const database = GetConvar("surreal_database", "test");
    const username = GetConvar("surreal_username", "root");
    const password = GetConvar("surreal_password", "root");

    console.log(`Loading SurrealDB configuration:
        URL: ${url}
        Namespace: ${namespace}
        Database: ${database}
        Username: ${username}
      `);

    return {
      url,
      namespace,
      database,
      username,
      password,
    };
  }

  public getConfig(): DatabaseConfig {
    return this.config;
  }

  public reloadConfig(): DatabaseConfig {
    this.config = this.loadConfig();
    return this.config;
  }
}
