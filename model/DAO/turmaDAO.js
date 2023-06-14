/******************************************************************************
 * Objetivo: Responsável pela manipulação das turmas no banco de dados.
 * Data: 29/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir dados da turma no banco
const insertTurma = async function (dadosTurma) {

    let sql = `insert into tbl_turma(
        nome,
        termo,
        id_curso,
        id_ano,
        id_periodo
    )values(
        '${dadosTurma.nome}',
        '${dadosTurma.termo}',
        '${dadosTurma.id_curso}',
        '${dadosTurma.id_ano}',
        '${dadosTurma.id_periodo}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Atualizar dados da turma no banco
const updateTurma = async function (dadosTurma) {

    let sql = `update tbl_turma set
        nome = '${dadosTurma.nome}',
        termo = '${dadosTurma.termo}',
        id_curso = '${dadosTurma.id_curso}',
        id_ano = '${dadosTurma.id_ano}',
        id_periodo = '${dadosTurma.id_periodo}'

    where id = ${dadosTurma.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deleta uma turma do banco 
const deleteTurma = async function (id) {

    let sql = `delete from tbl_turma where id = ${id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Seleciona todas as turmas existentes no banco
const selectALlTurmas = async function () {

    let sql = `select * from vwTurma;`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        false
    }
}

//Seleciona uma turma pelo id dela
const selectTurmaById = async function (id) {

    let sql = `select * from vwTurma where id = ${id}`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        false
    }

}

//Seleciona a turma pelo nome
const selectTurmaByName = async function (nome) {

    let sql = `select * from vwTurma where nome like '%${nome}%'`

    let rsTurma = await prisma.$queryRawUnsafe(sql)

    if (rsTurma.length > 0) {
        return rsTurma
    } else {
        false
    }
}

module.exports = {
    insertTurma,
    updateTurma,
    deleteTurma,
    selectALlTurmas,
    selectTurmaById,
    selectTurmaByName
}