/******************************************************************************
 * Objetivo: Responsável pela manipulação da matrícula dos alunos no banco de dados.
 * Data: 30/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient()

//Inserir uma nova matricula no banco
const insertMatricula = async function (dadosMatricula) {
    let sql = `insert into tbl_matricula(
        numero,
        id_aluno,
        id_turma
        )values(
            '${dadosMatricula.numero}',
            '${dadosMatricula.id_aluno}',
            '${dadosMatricula.id_turma}'
        );`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;

}

//Atualiza os dados de uma matricula
const updateMatricula = async function (dadosMatricula) {
    let sql = `update tbl_matricula set
        numero = '${dadosMatricula.numero}',
        id_aluno = ${dadosMatricula.id_aluno},
        id_turma = ${dadosMatricula.id_turma}

        where id = ${dadosMatricula.id}
    `
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Deleta uma matricula do banco
const deleteMatricula = async function (id) {
    let sql = `delete from tbl_matricula where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Retorna todas as matriculas
const selectAllMatriculas = async function () {
    let sql = `select * from vwMatricula;`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

//Retorna o aluno pela matricula
const selectMatriculaAluno = async function (matricula) {
    let sql = `select * from vwMatricula where numero_matricula = ${matricula};`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

//Retorna a matricula pelo id
const selectMatriculaById = async function (id) {
    let sql = `select * from vwMatricula where id_matricula = ${id};`

    let rsMatricula = await prisma.$queryRawUnsafe(sql)

    if (rsMatricula.length > 0) {
        return rsMatricula
    } else {
        return false
    }
}

module.exports = {
    insertMatricula,
    updateMatricula,
    deleteMatricula,
    selectAllMatriculas,
    selectMatriculaAluno,
    selectMatriculaById
}