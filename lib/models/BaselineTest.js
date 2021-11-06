const pool = require('../utils/pool');

module.exports = class BaselineTest {
  replicantId;
  replicantContact;
  passing;

  constructor(row) {
    this.replicantId = row.replicantId;
    this.replicantContact = row.replicantContact;
    this.passing = row.passing;
  }

  static async register(replicantContact, passing) {
    const { rows } = await pool.query(
      'INSERT INTO replicants (replicantContact, passing) VALUES ($1, $2) RETURNING *',
      [replicantContact, passing]
    );

    return new BaselineTest(rows[0]);
  }

  // static async getAll() {
  //   const { rows } = await pool.query('SELECT * from orders');
  //   return rows.map((row) => new Order(row));
  // }

  static async getId(replicantId) {
    const { rows } = await pool.query(
      'SELECT * from replicants WHERE replicantId =$1',
      [replicantId]
    );
    return rows.map((row) => new BaselineTest(row));
  }

  // static async update(id, quantity) {
  //   const { rows } = await pool.query(
  //     'UPDATE orders SET quantity =$1 WHERE id =$2 RETURNING *',
  //     [quantity, id]
  //   );
  //   return new Order(rows[0]);
  // }

  // static async delete(id) {
  //   const { rows } = await pool.query(
  //     'DELETE from orders WHERE id =$1 RETURNING *',
  //     [id]
  //   );
  //   return new Order(rows[0]);
  // }
};
