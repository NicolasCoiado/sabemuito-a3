import express from 'express';
import pool from '../pool.js';
import verificaJWT from '../auth.js'

const routes = express.Router();

routes.post("/agendar/trabalho/:id_usuario", verificaJWT, (req, res, error) => {
  const sql =
    "INSERT INTO trabalhos(titulo_trabalho, temas_trabalho, descricao_trabalho, data_entrega, id_usuario) VALUES (?,?,?,?,?)";
  const {titulo_trabalho, temas_trabalho, descricao_trabalho, data_entrega} = req.body;
  const id_usuario = req.params.id_usuario;
  pool.query(
    sql,
    [titulo_trabalho, temas_trabalho, descricao_trabalho, data_entrega, id_usuario],
    (error, results, fields) => {
      if (error){
        return res.status(404).json(error);
      }else{
        return res.status(200).json("Trabalho agendado com sucesso.");
      }
    }
  );
});

routes.get("/trabalho/:id_usuario", verificaJWT, (req, res, error) => {
    const sql = 'SELECT * FROM trabalhos WHERE `id_usuario` = ?';
    pool.query(sql, [req.params.id_usuario], (error, results, fields ) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Sem dados"});
        }
    });
});

routes.put("/trabalho/:id_usuario/:id_trabalho", verificaJWT, (req, res, error) => {
    const sql ="UPDATE trabalhos  SET `titulo_trabalho` = ?, `temas_trabalho` = ?, `descricao_trabalho` = ?, `data_entrega` = ? WHERE `id_usuario` = ? AND `id_trabalho` = ?";
  
    const values = [
      req.body.titulo_trabalho,
      req.body.temas_trabalho,
      req.body.descricao_trabalho,
      req.body.data_entrega,
    ];
  []
    pool.query(
      sql, [...values, req.params.id_usuario, req.params.id_trabalho], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Prova atualizada com sucesso.");
      }
    );
  });

  routes.delete("/trabalho/:id_usuario/:id_trabalho", verificaJWT, (req, res) => {
    const sql = "DELETE FROM trabalhos WHERE `id_usuario` = ? AND `id_trabalho` = ?";
  
    pool.query(
      sql, [req.params.id_usuario, req.params.id_trabalho], (err) => {
        if (err) return res.json(err);
  
        return res.status(200).json("Usuário deletado com sucesso.");
    });
  });
export default routes;