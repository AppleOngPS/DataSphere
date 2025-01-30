const sql = require("mssql");
const dbConfig = require("../dbConfig");

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

class BookSlot {
  static async create({ email, reason, sessionTime, roomUrl }) {
    await poolConnect;

    const request = pool
      .request()
      .input("email", sql.NVarChar(255), email)
      .input("reason", sql.NVarChar(500), reason)
      .input("sessionTime", sql.DateTime, sessionTime)
      .input("roomUrl", sql.NVarChar(500), roomUrl);

    const result = await request.query(`
      INSERT INTO bookings (email, reason, session_time, room_url)
      OUTPUT INSERTED.id, INSERTED.session_time
      VALUES (@email, @reason, @sessionTime, @roomUrl)
    `);

    return result.recordset[0];
  }

  static async findById(id) {
    await poolConnect;

    const request = pool.request().input("id", sql.Int, id);

    const result = await request.query(`
      SELECT * FROM bookings WHERE id = @id
    `);

    return result.recordset[0];
  }
}

module.exports = BookSlot;
