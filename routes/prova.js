import express from 'express';
import pool from '../pool.js';
import verificaJWT from '../auth.js'

const routes = express.Router();

routes.post("/agendar/prova/:id_usuario", (req, res, error) => {
  const sql =
    "INSERT INTO provas(titulo_prova, temas_prova, descricao_prova, data_prova, id_usuario)VALUES(?,?,?,?,?)";
  const {titulo_prova, temas_prova, descricao_prova, data_prova} = req.body;
  const id_usuario = req.params.id_usuario;
  pool.query(
    sql,
    [titulo_prova, temas_prova, descricao_prova, data_prova, id_usuario],
    (error, results, fields) => {
      if (error){
        return res.status(404).json(error);
      }else{
        return res.status(200).json("Prova agendada com sucesso.");
      }
    }
  );
});

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

routes.put("/prova/:id_usuario/:id_prova", verificaJWT, (req, res, error) => {
    const sql ="UPDATE provas SET `titulo_prova` = ?, `temas_prova` = ?, `descricao_prova` = ?, `data_prova` = ? WHERE `id_usuario` = ? AND `id_prova` = ?";
  
    const values = [
      req.body.titulo_prova,
      req.body.temas_prova,
      req.body.descricao_prova,
      req.body.data_prova,
    ];
  
    pool.query(
      sql, [...values, req.params.id_usuario, req.params.id_prova], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Prova atualizada com sucesso.");
      }
    );
  });

  routes.delete("/prova/:id_usuario/:id_prova", verificaJWT, (req, res) => {
    const sql = "DELETE FROM provas WHERE `id_usuario` = ? AND `id_prova` = ?";
  
    pool.query(
      sql, [req.params.id_usuario, req.params.id_prova], (err) => {
        if (err) return res.json(err);
  
        return res.status(200).json("Prova deletada com sucesso.");
    });
  });
export default routes;