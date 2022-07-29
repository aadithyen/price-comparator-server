import { pool } from "./pool.js";

class Model {
	constructor(table) {
		this.pool = pool;
		this.table = table;
		this.pool.on(
			"error",
			(err, client) => `Error, ${err}, on idle client${client}`
		);
	}

	async insert(values) {
		let query = `INSERT INTO ${this.table} (title, site, timestamp, url, price) VALUES(${values})`;
		console.log(query);
		return this.pool.query(query);
	}

	async select(columns, clause) {
		let query = `SELECT ${columns} FROM ${this.table}`;
		if (clause) query += ` ${clause}`;
		console.log(query);
		return this.pool.query(query);
	}

	async update(column, value, clause) {
		let query = `UPDATE ${this.table} SET ${column} = ${value}`;
		if (clause) query += ` ${clause}`;
		console.log(query);
		return this.pool.query(query);
	}
}

export default Model;
