import { loadEnvFile } from 'node:process'
import { isCI } from 'std-env'
import { defineConfig } from 'vitest/config'

try {
	loadEnvFile()
} catch (error) {
	if (!isCI) {
		throw error
	}
}

export default defineConfig({
	test: {
		allowOnly: !isCI,
		globalSetup: ['./vitest.setup.mts'],
		typecheck: {
			enabled: true,
			ignoreSourceErrors: true,
		},
	},
})
