import express from 'express';
import pool from '../pool.js';
import verificaJWT from '../auth.js'

const routes = express.Router();

routes.get("/prova/:id_usuario", verificaJWT, (req, res, error) => {
    const sql = 'SELECT * FROM provas WHERE `id_usuario` = ?';
    pool.query(sql, [req.params.id_usuario], (error, results, fields ) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Sem dados"});
        }
    });
});

routes.put("/prova/:titulo_prova", (req, res, error) => {
    const sql ="UPDATE provas SET `titulo_prova` = ?, `temas_prova` = ?, `descricao_prova` = ?, `data_prova` = ?, `id_usuario` = ? WHERE `titulo_prova` = ?";
  
    const values = [
      req.body.titulo_prova,
      req.body.temas_prova,
      req.body.descricao_prova,
      req.body.data_prova,
      req.body.id_usuario,
    ];
  
    pool.query(
      sql, [...values, req.params.titulo_prova], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Prova atualizada com sucesso.");
      }
    );
  });

export default routes;