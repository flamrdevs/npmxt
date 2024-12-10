import type { InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type TPackageCreationModel = InferSelectModel<typeof packageCreationTable>;

export const packageCreationTable = sqliteTable('package_creation_table', {
	// name
	n: text().primaryKey(),
	// date
	d: text().notNull(),
	// expires
	t: int().notNull(),
	// refresh
	r: int().notNull(),
});
