// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ListarServidor', function (req, res, next) {
    console.log(banco.conexao);
    banco.conectar().then(() => {
      return banco.sql.query(`select loginServidor, linkServidor, situacaoServidor from tbServidor`);
    }).then(consulta => {
  
      console.log(`Resultado da consulta de serviços: ${JSON.stringify(consulta.recordset)}`);
  
      if (consulta.recordset.length == 0) {
        res.status(404).send('Nenhum serviço encontrado');
      } else {
        res.send(consulta.recordset);
      }
  
    }).catch(err => {
  
      var erro = `Erro na pesquisa de serviços: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
  
    }).finally(() => {
      banco.sql.close();
    });
  
  });

  router.post('/cadastrar', function (req, res, next) {

    var link;
    var login;
    var senha;
    var cadastro_valido = false;
  
    banco.conectar().then(() => {
      console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
      login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
      senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
      link = req.body.link;
      if (login == undefined || senha == undefined || link == undefined) {
      // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
        throw new Error(`Dados de cadastro não chegaram completos: ${login} / ${senha} / ${link}`);
      }
      return banco.sql.query(`select count(*) as contagem from tbServidor where linkServidor = '${link}'`);
    }).then(consulta => {
  
    if (consulta.recordset[0].contagem >= 1) {
      res.status(400).send(`Já existe Servidor com o link "${link}"`);
      return;
      } else {
      console.log('válido!');
      cadastro_valido = true;
    }
  
    }).catch(err => {
  
      var erro = `Erro no cadastro: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
  
    }).finally(() => {
      if (cadastro_valido) {		  
          
      banco.sql.query(`insert into tbServidor (loginServidor, linkServidor, senhaServidor) values (${login}','${link}','${senha}')`).then(function() {
        console.log(`Servidor cadastrado com sucesso!`);
        res.sendStatus(201); 
        // status 201 significa que algo foi criado no back-end, 
          // no caso, um registro de usuário ;)		
      }).catch(err => {
  
        var erro = `Erro no cadastro: ${err}`;
        console.error(erro);
        res.status(500).send(erro);
  
      }).finally(() => {
        banco.sql.close();
      });
      }
    });
    
  
  });
  
  
  
// não mexa nesta linha!
module.exports = router;
