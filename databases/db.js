import { DatabaseSync } from 'node:sqlite';

const databases = new DatabaseSync('/databases/longlist-advance.db');

export default databases;
