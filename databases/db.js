import { DatabasesSync } from 'node:sqlite';

const databases = new DatabasesSync('/databases/longlist-advance.db');

export default databases;
