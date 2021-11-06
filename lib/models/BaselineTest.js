const pool = require('../utils/pool');

module.exports = class BaselineTest {
  id;
  contact;
  passing;

  constructor(row) {
    this.id = row.id;
    this.contact = row.contact;
    this.passing = row.passing;
  }

  static async register(contact, passing) {
    const { rows } = await pool.query(
      'INSERT INTO replicants (contact, passing) VALUES ($1, $2) RETURNING *',
      [contact, passing]
    );
    return new BaselineTest(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from replicants');
    return rows.map((row) => new BaselineTest(row));
  }

  static async getId(id) {
    const { rows } = await pool.query('SELECT * from replicants WHERE id =$1', [
      id,
    ]);
    return rows.map((row) => new BaselineTest(row));
  }

  static async update(contact, passing, id) {
    const { rows } = await pool.query(
      'UPDATE replicants SET contact =$1 AND passing=$2 WHERE id =$3 RETURNING *',
      [contact, passing, id]
    );
    return new BaselineTest(rows[0]);
  }

  // static async delete(id) {
  //   const { rows } = await pool.query(
  //     'DELETE from orders WHERE id =$1 RETURNING *',
  //     [id]
  //   );
  //   return new Order(rows[0]);
  // }
};
