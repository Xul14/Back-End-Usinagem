/******************************************************************************
 * Objetivo: Responsável pela manipulação da tabela intermediaria de turma, disciplina e professor no banco de dados.
 * Data: 02/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir dados relacionados a turma, disciplina e professor
const insertTurmaDisciplinaProfessor = async function(dados){

    const sql = `insert into tbl_turma_disciplina_professor(
            id_disciplina,
            id_turma,
            id_professor
        )values(
            ${dados.id_disciplina},
            ${dados.id_turma},
            ${dados.id_professor}
        );`
    
        let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true
    else
        return false
}

//Atualizar dados relacionados a turma, disciplina e professor
const updateTurmaDisciplinaProfessor = async function(dados){

    const sql = `update tbl_turma_disciplina_professor set

            id_disciplina = ${dados.id_disciplina},
            id_turma =  ${dados.id_turma},
            id_professor = ${dados.id_professor}

        where id = ${dados.id};`
    
        let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true
    else
        return false
}

//Deleta dados relacionados a turma, disciplina e professor
const deleteTurmaDisciplinaProfessor = async function(id){

    const sql = `delete from tbl_turma_disciplina_professor where id = ${id};`
    
        let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true
    else
        return false
}

//Seleciona todos os dados da tabela turma, disciplina, professor
const selectAllTurmaDisciplinaProfessor = async function() {

    let sql = `select * from vwTurmaDisciplinaProfessor;
 `

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

//Seleciona os dados da tabela turma, disciplina, professor filtrando pelo id
const selectAByIdTurmaDisciplinaProfessor = async function(id) {

    let sql = `select * from vwTurmaDisciplinaProfessor where id = ${id};
 `

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

module.exports = {
    insertTurmaDisciplinaProfessor,
    updateTurmaDisciplinaProfessor,
    deleteTurmaDisciplinaProfessor,
    selectAllTurmaDisciplinaProfessor,
    selectAByIdTurmaDisciplinaProfessor
}