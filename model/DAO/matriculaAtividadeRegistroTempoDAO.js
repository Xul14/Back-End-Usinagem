/******************************************************************************
 * Objetivo: Responsável pela manipulação no banco de dados.
 * Data: 11/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir dados no banco
const insertMatriculaAtividadeRegistroTempo = async function (dados) {
    let sql = `insert into tbl_matricula_atividade_registro_tempo(
        id_registro_tempo,
        id_atividade,
        id_matricula
    )values(
        ${dados.id_registro_tempo},
        ${dados.id_atividade},
        ${dados.id_matricula}     
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}


//Atualizar dados no banco
const updateMatriculaAtividadeRegistroTempo = async function (dados) {

    let sql = `update tbl_matricula_atividade_registro_tempo set 
        id_registro_tempo = ${dados.id_registro_tempo},
        id_atividade = ${dados.id_atividade},
        id_matricula = ${dados.id_matricula}
            where id = ${dados.id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deletar dados no banco
const deleteMatriculaAtividadeRegistroTempo = async function (id) {

    let sql = `delete from tbl_matricula_atividade_registro_tempo where id = '${id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Seleciona todos os dados do banco.
const selectAllMatriculaAtividadeRegistroTempo = async function () {
    let sql = `select * from vwMatriculaAtividadeRegistroTempo;`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

//Seleciona todos os dados do banco.
const selectIdMatriculaAtividadeRegistroTempo = async function (id) {
    let sql = `select * from vwMatriculaAtividadeRegistroTempo where id = ${id};`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

module.exports = {
    insertMatriculaAtividadeRegistroTempo,
    updateMatriculaAtividadeRegistroTempo,
    deleteMatriculaAtividadeRegistroTempo,
    selectAllMatriculaAtividadeRegistroTempo,
    selectIdMatriculaAtividadeRegistroTempo
}