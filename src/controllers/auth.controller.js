import { dbConfig } from "../config/config.js";
import sql from "mssql";
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const connection = await sql.connect(dbConfig);

    // Check if the user already exists
    const query1 = "SELECT * FROM users WHERE username = @username";
    const result = await connection
      .request()
      .input("username", sql.VarChar, username)
      .query(query1);

    if (result.recordset.length > 0) {
      return res.json({ message: "User already exists. Please log in." });
    } else {
      const query2 =
        "INSERT INTO users (username, email, password) VALUES (@username, @email, @password)";
        const hashedPassword = await bcrypt.hash(password, 10);
      await connection
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, hashedPassword)
        .query(query2);
        

      return res.json({ message: "Registered successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const connection = await sql.connect(dbConfig);

    const query = "SELECT * FROM users WHERE username = @username";
    const result = await connection
      .request()
      .input("username", sql.VarChar, username)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid username." });
    }

    const user = result.recordset[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Successful login
    return res.json({ message: "Login successful.", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};
