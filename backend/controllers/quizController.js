const sql = require("mssql");
const dbConfig = require("../dbConfig");

// Fetch all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM dbo.Quizzes");
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quizzes", details: error });
  }
};

// Fetch a specific quiz by ID
exports.getQuizByID = async (req, res) => {
  const { quizID } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const questionsQuery = `
      SELECT q.QuestionID, q.QuestionText, o.OptionID, o.OptionText, o.Points, o.Category
      FROM dbo.Questions q
      INNER JOIN dbo.Options o ON q.QuestionID = o.QuestionID
      WHERE q.QuizID = @quizID
    `;
    const result = await pool
      .request()
      .input("quizID", sql.Int, quizID)
      .query(questionsQuery);

    const quizQuery = "SELECT Title, Description FROM dbo.Quizzes WHERE QuizID = @quizID";
    const quizInfo = await pool
      .request()
      .input("quizID", sql.Int, quizID)
      .query(quizQuery);

    res.status(200).json({
      quizInfo: quizInfo.recordset[0],
      questions: result.recordset,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz data", details: error });
  }
};

// Fetch quiz results for a user and their children
exports.getQuizResultsByUser = async (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT 
      qr.ResultID, 
      qr.UserID, 
      qr.QuizID, 
      qr.TotalPoints, 
      qr.Badge, 
      qr.CreatedAt, 
      q.Title 
    FROM dbo.QuizResults qr
    JOIN dbo.Quizzes q ON qr.QuizID = q.QuizID
    WHERE qr.UserID = @userID

    UNION

    SELECT 
      qr.ResultID, 
      c.UserID AS ParentID, 
      qr.QuizID, 
      qr.TotalPoints, 
      qr.Badge, 
      qr.CreatedAt, 
      q.Title 
    FROM dbo.QuizResults qr
    JOIN dbo.Quizzes q ON qr.QuizID = q.QuizID
    JOIN dbo.Child c ON qr.UserID = c.ChildID
    WHERE c.UserID = @userID
    ORDER BY CreatedAt DESC;
  `;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().input("userID", sql.Int, userID).query(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz results", details: error });
  }
};


// Submit quiz results
exports.submitQuizResults = async (req, res) => {
  const { quizID } = req.params;
  const { userID, totalPoints, badge } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("userID", sql.Int, userID)
      .input("quizID", sql.Int, quizID)
      .input("totalPoints", sql.Int, totalPoints)
      .input("badge", sql.NVarChar, badge)
      .query(`
        INSERT INTO dbo.QuizResults (UserID, QuizID, TotalPoints, Badge)
        VALUES (@userID, @quizID, @totalPoints, @badge)
      `);
    res.status(200).json({ message: "Quiz results submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting quiz results", details: error });
  }
};
