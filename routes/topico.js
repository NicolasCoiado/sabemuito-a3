import express from 'express';
import pool from '../pool.js';
import verificaJWT from '../auth.js'

const routes = express.Router();

routes.post("/cadastro/topico/:id_lista", verificaJWT, (req, res, error) => {
    const id_lista = req.params.id_lista;
    const {nome_topico} = req.body;
    const sql = "INSERT INTO topico (nome_topico, id_lista) VALUES (?,?)";

    pool.query(
        sql,
        [nome_topico, id_lista],
        (error, results, fields) => {
            if (error){
            return res.status(404).json(error);
            }else{
                return res.status(200).json("Tópico cadastrado com sucesso.");
            }
        }
    );
    
});

routes.get("/topico/:id_lista", verificaJWT, (req, res, error) => {
    const sql = 'SELECT * FROM topico WHERE `id_lista` = ?';
    pool.query(sql, [req.params.id_lista], (error, results, fields ) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Sem dados"});
        }
    });
});

routes.put("/topico/:id_lista/:id_topico", verificaJWT, (req, res, error) => {
    const sql ="UPDATE topico SET `nome_topico` = ? WHERE `id_lista` = ? AND `id_topico` = ?";
  
    const values = [
      req.body.nome_topico
    ];
  
    pool.query(
      sql, [...values, req.params.id_lista, req.params.id_topico], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Topico atualizado com sucesso.");
      }
    );
  });

  routes.put("/estudou/topico/:id_lista/:id_topico", verificaJWT, (req, res, error) => {
    const sql ="UPDATE topico SET `status_topico` = 0 WHERE `id_lista` = ? AND `id_topico` = ?";
  
    pool.query(
      sql, [req.params.id_lista, req.params.id_topico], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Topico atualizado com sucesso.");
      }
    );
  });

  routes.put("/revisar/topico/:id_lista/:id_topico", verificaJWT, (req, res, error) => {
    const sql ="UPDATE topico SET `status_topico` = 1 WHERE `id_lista` = ? AND `id_topico` = ?";
  
    pool.query(
      sql, [req.params.id_lista, req.params.id_topico], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Topico atualizado com sucesso.");
      }
    );
  });

  routes.delete("/topico/:id_lista/:id_topico", verificaJWT, (req, res) => {
    const sql = "DELETE FROM topico WHERE `id_lista` = ? AND `id_topico` = ?";
  
    pool.query(
      sql, [req.params.id_lista, req.params.id_topico], (err) => {
        if (err) return res.json(err);
  
        return res.status(200).json("Topico deletado com sucesso.");
    });
  });

export default routes;