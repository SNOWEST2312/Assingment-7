import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync('/databases/longlist-advance.db');

export default database;
