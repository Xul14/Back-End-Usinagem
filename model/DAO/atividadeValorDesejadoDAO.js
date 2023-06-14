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
const insertAtividadeValorDesejado = async function (dados) {
    let sql = `insert into tbl_atividade_valor_desejado(
        id_atividade,
        id_valor_desejado
    )values(
        ${dados.id_atividade},
        ${dados.id_valor_desejado}
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}


//Atualizar dados no banco
const updateAtividadeValorDesejado = async function (dados) {

    let sql = `update tbl_atividade_valor_desejado set 
        id_atividade = ${dados.id_atividade},
        id_valor_desejado = ${dados.id_valor_desejado}
            where id = ${dados.id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deletar dados no banco
const deleteAtividadeValorDesejado = async function (id) {

    let sql = `delete from tbl_atividade_valor_desejado where id = '${id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Seleciona todos os dados do banco.
const selectAllAtividadeValorDesejado = async function () {
    let sql = `select * from vwAtividadeValorDesejado;`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

//Seleciona todos os dados do banco.
const selectIdAtividadeValorDesejado = async function (id) {
    let sql = `select * from vwAtividadeValorDesejado where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result;
    else
        return false;
}

module.exports = {
    insertAtividadeValorDesejado,
    updateAtividadeValorDesejado,
    deleteAtividadeValorDesejado,
    selectAllAtividadeValorDesejado,
    selectIdAtividadeValorDesejado
}