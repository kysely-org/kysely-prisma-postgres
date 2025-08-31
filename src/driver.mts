import type {
	CompiledQuery,
	DatabaseConnection,
	Driver,
	QueryResult,
	TransactionSettings,
} from 'kysely'
import type { PPGDialectConfig, PPGSql } from './dialect-config.mjs'

export class PPGDriver implements Driver {
	readonly #config: PPGDialectConfig
	#connection: PPGDatabaseConnection | undefined

	constructor(config: PPGDialectConfig) {
		this.#config = config
	}

	async acquireConnection(): Promise<DatabaseConnection> {
		// biome-ignore lint/style/noNonNullAssertion: `init` has already run at least once.
		return this.#connection!
	}

	beginTransaction(
		_connection: DatabaseConnection,
		_settings: TransactionSettings,
	): Promise<void> {
		throw new Error("PPGDialect doesn't support interactive transactions.")
	}

	async commitTransaction(_connection: DatabaseConnection): Promise<void> {
		// noop
	}

	async destroy(): Promise<void> {
		// noop
	}

	async init(): Promise<void> {
		const { ppg } = this.#config

		this.#connection ||= new PPGDatabaseConnection(
			isPPGSql(ppg) ? ppg : await ppg(),
		)
	}

	async releaseConnection(_connection: DatabaseConnection): Promise<void> {
		// noop
	}

	async rollbackTransaction(_connection: DatabaseConnection): Promise<void> {
		// noop
	}
}

function isPPGSql(thing: unknown): thing is PPGSql {
	return typeof thing === 'function' && 'query' in thing
}

class PPGDatabaseConnection implements DatabaseConnection {
	readonly #ppg: PPGSql

	constructor(ppg: PPGSql) {
		this.#ppg = ppg
	}

	async executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
		const result = await this.#ppg.query<R>(compiledQuery.sql, [
			...compiledQuery.parameters,
		])

		return { rows: result }
	}

	streamQuery<R>(
		_compiledQuery: CompiledQuery,
		_chunkSize?: number,
	): AsyncIterableIterator<QueryResult<R>> {
		throw new Error("PPGDialect doesn't support streaming.")
	}
}
