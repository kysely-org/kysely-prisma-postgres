import {
	type DatabaseIntrospector,
	type Dialect,
	type DialectAdapter,
	type Driver,
	type Kysely,
	PostgresAdapter,
	PostgresIntrospector,
	PostgresQueryCompiler,
	type QueryCompiler,
} from 'kysely'
import type { PPGDialectConfig } from './dialect-config.mjs'
import { PPGDriver } from './driver.mjs'
import { freeze } from './utils.mjs'

export class PPGDialect implements Dialect {
	readonly #config: PPGDialectConfig

	constructor(config: PPGDialectConfig) {
		this.#config = freeze({ ...config })
	}

	createAdapter(): DialectAdapter {
		return new PostgresAdapter()
	}

	createDriver(): Driver {
		return new PPGDriver(this.#config)
	}

	// biome-ignore lint/suspicious/noExplicitAny: this is fine.
	createIntrospector(db: Kysely<any>): DatabaseIntrospector {
		return new PostgresIntrospector(db)
	}

	createQueryCompiler(): QueryCompiler {
		return new PostgresQueryCompiler()
	}
}
