/******************************************************************************
 * Objetivo: Responsável pela manipulação do tipo de atividade no banco de dados.
 * Data: 01/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir dados do tipo de atividade no banco de dados
const insertTipoAtividade = async function(dadosTipoAtividade) {

    let sql = `insert into tbl_tipo_atividade(
        nome
    )values(
        '${dadosTipoAtividade.nome}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;

}

//Atualizar dados do tipo de atividade no banco de dados
const updateTipoAtividade = async function(dadosTipoAtividade) {

    let sql = `update tbl_tipo_atividade set nome = '${dadosTipoAtividade.nome}' 
               where id = ${dadosTipoAtividade.id};`


    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deletar dados do tipo de atividade no banco de dados
const deleteTipoAtividade = async function(id) {

    //ScriptSQL para deletar um registro no banco
    let sql = `delete from tbl_tipo_atividade where id = '${id}'`

    //Executa o script
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Retorna os tipos de atividades
const selectTipoAtividade = async function() {
    let sql = `select * from tbl_tipo_atividade `

    let rsAtividade = await prisma.$queryRawUnsafe(sql)

    if (rsAtividade.length > 0) {
        return rsAtividade
    } else {
        return false
    }
}

//Get o tipo de atividade pelo id
const selectByIdTipoAtividade = async function(id) {

    let sql = `select * from tbl_tipo_atividade where id = ${id}`

    let rsAtividade = await prisma.$queryRawUnsafe(sql);

    if (rsAtividade.length > 0)
        return rsAtividade;
    else
        return false;

}

//Get tipo de atividade pelo nome
const selectByNameTipoAtividade = async function(name) {

    let sql = `select * from tbl_tipo_atividade where nome like '%${name}%'`

    let rsAtividade = await prisma.$queryRawUnsafe(sql);

    if (rsAtividade.length > 0)
        return rsAtividade;
    else
        return false;

}

module.exports = {
    insertTipoAtividade,
    updateTipoAtividade,
    deleteTipoAtividade,
    selectTipoAtividade,
    selectByIdTipoAtividade,
    selectByNameTipoAtividade
}