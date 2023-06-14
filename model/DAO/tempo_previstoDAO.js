/******************************************************************************
 * Objetivo: Responsável pela manipulação do tempo previsto no banco de dados.
 * Data: 08/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir dados do tempo previsto no banco de dados
const insertTempoPrevisto = async function(dadosTempoPrevisto) {

    let sql = `insert into tbl_tempo_previsto(
        tempo
    )values(
        '${dadosTempoPrevisto.tempo}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;

}

//Atualizar dados do tempo previsto no banco de dados
const updateTempoPrevisto = async function(dadosTempoPrevisto) {

    let sql = `update tbl_tempo_previsto set tempo = '${dadosTempoPrevisto.tempo}' 
               where id = ${dadosTempoPrevisto.id};`


    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deletar dados do tempo previsto no banco de dados
const deleteTempoPrevisto = async function(id) {

    //ScriptSQL para deletar um registro no banco
    let sql = `delete from tbl_tempo_previsto where id = '${id}'`

    //Executa o script
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Retorna o aluno pela matricula
const selectTempoPrevisto = async function() {
    let sql = `select tbl_tempo_previsto.id, 
    time_format(tbl_tempo_previsto.tempo , '%H:%i') as tempo from tbl_tempo_previsto;`

    let rsTempo = await prisma.$queryRawUnsafe(sql)

    if (rsTempo.length > 0) {
        return rsTempo
    } else {
        return false
    }
}

//Get o tempo previsto pelo id
const selectByIdTempoPrevisto = async function(id) {

    let sql = `select tbl_tempo_previsto.id, 
    time_format(tbl_tempo_previsto.tempo , '%H:%i') as tempo from tbl_tempo_previsto
         where id = ${id};`

    let rsTempo = await prisma.$queryRawUnsafe(sql);

    if (rsTempo.length > 0)
        return rsTempo;
    else
        return false;

}

//Get tempo previsto pelo nome
const selectByTempoPrevisto = async function(tempo) {

    let sql = `select tbl_tempo_previsto.id, 
    time_format(tbl_tempo_previsto.tempo , '%H:%i') as tempo from tbl_tempo_previsto
         where tempo like '%${tempo}%';`

    let rsTempo = await prisma.$queryRawUnsafe(sql);

    if (rsTempo.length > 0)
        return rsTempo;
    else
        return false;

}

module.exports = {
    insertTempoPrevisto,
    updateTempoPrevisto,
    deleteTempoPrevisto,
    selectTempoPrevisto,
    selectByIdTempoPrevisto,
    selectByTempoPrevisto
}