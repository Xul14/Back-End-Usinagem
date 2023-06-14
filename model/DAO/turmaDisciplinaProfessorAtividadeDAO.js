/******************************************************************************
 * Objetivo: Responsável pela manipulação no banco de dados.
 * Data: 09/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();


//Inserir dados no banco
const insertTurmaDisciplinaProfessorAtividade = async function (dados) {
    let sql = `insert into tbl_turma_disciplina_professor_atividade(
        id_atividade,
        id_turma_disciplina_professor
    )values(
        ${dados.id_atividade},
        ${dados.id_turma_disciplina_professor}
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}


//Atualizar dados no banco
const updateTurmaDisciplinaProfessorAtividade = async function (dados) {

    let sql = `update tbl_turma_disciplina_professor_atividade set 
        id_atividade = ${dados.id_atividade},
        id_turma_disciplina_professor = ${dados.id_turma_disciplina_professor}
            where id = ${dados.id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deletar dados no banco
const deleteTurmaDisciplinaProfessorAtividade = async function (id) {

    let sql = `delete from tbl_turma_disciplina_professor_atividade where id = '${id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Seleciona todos os dados do banco.
const selectAllTurmaDisciplinaProfessorAtividade = async function () {
    let sql = `select * from vwTurmaDisciplinaProfessorAtividade;`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

//Seleciona todos os dados do banco.
const selectIdTurmaDisciplinaProfessorAtividade = async function (id) {
    let sql = `select * from vwTurmaDisciplinaProfessorAtividade where id = ${id};`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

module.exports = {
    insertTurmaDisciplinaProfessorAtividade,
    updateTurmaDisciplinaProfessorAtividade,
    deleteTurmaDisciplinaProfessorAtividade,
    selectAllTurmaDisciplinaProfessorAtividade,
    selectIdTurmaDisciplinaProfessorAtividade
}