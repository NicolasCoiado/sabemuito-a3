import express from 'express';
import pool from '../pool.js';
import verificaJWT from '../auth.js'

const routes = express.Router();

routes.post("/cadastro/lista/:id_usuario", verificaJWT, (req, res, error) => {
    const id_usuario = req.params.id_usuario;
    const {titulo_lista, descricao_lista} = req.body;

    const sql = "INSERT INTO lista_estudos (titulo_lista, descricao_lista, id_usuario) VALUES (?,?,?)";

    pool.query(
        sql,
        [titulo_lista, descricao_lista,  id_usuario],
        (error, results, fields) => {
            if (error){
            return res.status(404).json(error);
            }else{
                return res.status(200).json("Lista cadastrada com sucesso.");
            }
        }
    );
    
});

routes.get("/lista/:id_usuario", verificaJWT, (req, res, error) => {
    const sql = 'SELECT * FROM lista_estudos WHERE `id_usuario` = ?';
    pool.query(sql, [req.params.id_usuario], (error, results, fields ) => {
        if(!error){
            res.status(200).json(results);
        } else {
            res.status(404).json({msg: "Sem dados"});
        }
    });
});

routes.put("/lista/:id_usuario/:id_lista", verificaJWT, (req, res, error) => {
    const sql ="UPDATE lista_estudos SET `titulo_lista` = ?, `descricao_lista` = ? WHERE `id_usuario` = ? AND `id_lista` = ?";
  
    const values = [
      req.body.titulo_lista,
      req.body.descricao_lista
    ];
  
    pool.query(
      sql, [...values, req.params.id_usuario, req.params.id_lista], (error, results, fields) => {
        if (error) return res.json(error);
        return res.status(200).json("Lista atualizada com sucesso.");
      }
    );
  });

  routes.delete("/lista/:id_usuario/:id_lista", verificaJWT, (req, res) => {
    const sql = "DELETE FROM lista_estudos WHERE `id_usuario` = ? AND `id_lista` = ?";
  
    pool.query(
      sql, [req.params.id_usuario, req.params.id_lista], (err) => {
        if (err) return res.json(err);
  
        return res.status(200).json("Lista deletada com sucesso.");
    });
  });

export default routes;