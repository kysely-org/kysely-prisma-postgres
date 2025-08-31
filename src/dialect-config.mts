export interface PPGDialectConfig {
	ppg: PPGSql | (() => PPGSql | Promise<PPGSql>)
}

export interface PPGSql {
	query: <O>(query: string, params: unknown[]) => Promise<O[]>
}
