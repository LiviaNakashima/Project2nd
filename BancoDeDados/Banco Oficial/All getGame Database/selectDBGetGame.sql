select * from tbFuncionario;
select * from tbUsuario;
select * from tbServidor;
select * from tbAcesso;
select * from tbStatusServidor;
select * from tbProcessoServidor;
select codAuditoria, codServidor, tbAuditada as 'Tabela Auditada', tbCamposAuditados as 'Campos alterados',
tipoacao as 'Tipo de a��o', datahoraauditoria as 'Data e Hora da altera��o', codUsuario, nomeFuncionario as 'Nome do Funcionario'
 from tbAuditoria;