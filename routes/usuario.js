import express from "express";
import pool from "../pool.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;
const routes = express.Router();

routes.get("/", (req, res, error) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuario WHERE usuario.email=?";
  pool.query(sql, [email], (error, results, fields) => {
    if (results.length > 0) {
      if (
        email === results[0].email &&
        bcrypt.compareSync(senha, results[0].senha)
      ) {

        const token = jwt.sign({name: email}, SECRET, {expiresIn: 7200})     
        
        res.status(200).json({
          messagem: "Login realizado com sucesso!",
          id: results[0].id,
          token
        })
      } else {
        res.send(401).end();
      }
    }
  });
});


routes.post("/cadastro", (req, res, error) => {
  const sql =
    "INSERT INTO usuario(nome, email, telefone, senha)VALUES(?,?,?,?)";
  const { nome, email, telefone } = req.body;
  const senha = bcrypt.hashSync(req.body.senha);
  pool.query(
    sql,
    [nome, email, telefone, senha],
    (error, results, fields) => {
      if (error){
        return res.status(404).json(error);
      }else{
        return res.status(200).json("Usuário criado com sucesso.");
      }
    }
  );
});


routes.put("/:email", (req, res, error) => {
  const sql ="UPDATE usuario SET `nome` = ?, `email` = ?, `telefone` = ?, `senha` = ? WHERE `email` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.telefone,
    bcrypt.hashSync(req.body.senha),
  ];

  pool.query(
    sql, [...values, req.params.email], (error, results, fields) => {
      if (error) return res.json(error);
      return res.status(200).json("Usuário atualizado com sucesso.");
    }
  );
});


  
routes.delete("/:email", (req, res) => {
  const sql = "DELETE FROM usuario WHERE `email` = ?";

  pool.query(
    sql, [req.params.email], (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Usuário deletado com sucesso.");
  });
});


export default routes;