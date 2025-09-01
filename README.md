![A Kysely-branded yellow duck riding a Prisma Postgres branded grey elephant](./assets//banner.png)

[![NPM Version](https://img.shields.io/npm/v/kysely-prisma-postgres?style=flat&label=latest)](https://github.com/kysely-org/kysely-prisma-postgres/releases/latest)
[![Tests](https://github.com/kysely-org/kysely-prisma-postgres/actions/workflows/test.yml/badge.svg)](https://github.com/kysely-org/kysely-prisma-postgres)
[![License](https://img.shields.io/github/license/kysely-org/kysely-prisma-postgres?style=flat)](https://github.com/kysely-org/kysely-prisma-postgres/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues-closed/kysely-org/kysely-prisma-postgres?logo=github)](https://github.com/kysely-org/kysely-prisma-postgres/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)
[![Pull Requests](https://img.shields.io/github/issues-pr-closed/kysely-org/kysely-prisma-postgres?label=PRs&logo=github&style=flat)](https://github.com/kysely-org/kysely-prisma-postgres/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc)
![GitHub contributors](https://img.shields.io/github/contributors/kysely-org/kysely-prisma-postgres)
[![Downloads](https://img.shields.io/npm/dw/kysely-prisma-postgres?logo=npm)](https://www.npmjs.com/package/kysely-prisma-postgres)

###### Join the discussion ⠀⠀⠀⠀⠀⠀⠀

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=flat&logo=discord&logoColor=white)](https://discord.gg/xyBJ3GwvAm)
[![Bluesky](https://img.shields.io/badge/Bluesky-0285FF?style=flat&logo=Bluesky&logoColor=white)](https://bsky.app/profile/kysely.dev)

`kysely-prisma-postgres` offers a [Kysely](https://kysely.dev/) dialect for [Prisma Postgres (PPG)](https://www.prisma.io/postgres), enabling type-safe SQL queries over HTTP.

## Installation

```bash
npm install kysely-prisma-postgres @prisma/ppg kysely
```

```bash
pnpm add kysely-prisma-postgres @prisma/ppg kysely
```

```bash
yarn add kysely-prisma-postgres @prisma/ppg kysely
```

## Usage

```ts
import { ppg } from "@prisma/ppg";
import { Kysely } from "kysely";
import { PPGDialect } from "kysely-prisma-postgres";

interface Database {
	person: {
		id: string;
		name: string;
	};
}

const db = new Kysely<Database>({
	dialect: new PPGDialect({
		ppg: ppg(process.env.PRISMA_POSTGRES_CONNECTION_STRING!),
	}),
});

const people = await db.selectFrom("person").selectAll().execute();
```
