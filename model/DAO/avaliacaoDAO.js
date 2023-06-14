/******************************************************************************
 * Objetivo: Responsável pela manipulação no banco de dados.
 * Data: 12/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();


//Inserir dados no banco
const insertAvaliacao = async function(dados) {
    let sql = `insert into tbl_avaliacao(
        avaliacao_aluno,
        obtido,
        avaliacao_professor,
        id_professor,
        id_atividade_valor_desejado,
        id_matricula
    )values(
        ${dados.avaliacao_aluno},
        '${dados.obtido}',
        ${dados.avaliacao_professor},
        ${dados.id_professor},
        ${dados.id_atividade_valor_desejado},
        ${dados.id_matricula}
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}


//Atualizar dados no banco
const updateAvaliacao = async function(dados) {

    let sql = `update tbl_avaliacao set 
    avaliacao_aluno = ${dados.avaliacao_aluno},
    obtido = ${dados.obtido},
    avaliacao_professor = ${dados.avaliacao_professor},
    id_professor = ${dados.id_professor},
    id_atividade_valor_desejado = ${dados.id_atividade_valor_desejado},
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
const deleteAvaliacao = async function(id) {

    let sql = `delete from tbl_avaliacao where id = '${id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Seleciona todos os dados do banco.
const selectAllAvaliacao = async function() {
    let sql = `select * from tbl_avaliacao;`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

//Seleciona todos os dados do banco.
const selectIdAvaliacao = async function(id) {
    let sql = `select * from tbl_avaliacao where id = ${id};`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectIdAvaliacao
}