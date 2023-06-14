/******************************************************************************
 * Objetivo: Responsável pela manipulação dos anos no banco de dados.
 * Data: 29/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Insere uma no ano no banco
const insertAno = async function(dadosAno) {
    let sql = `insert into tbl_ano (ano) values ('${dadosAno.ano}')`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Atuliaza um ano no banco
const updateAno = async function(dadosAno) {
    let sql = `update tbl_ano set
        ano = '${dadosAno.ano}' 
     where id = ${dadosAno.id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Deleta um ano do banco
const deleteAno = async function(idAno) {
    let sql = `delete from tbl_ano where id = '${idAno}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

//Seleciona todos os anos no banco
const selectAllAnos = async function() {
    let sql = `select * from tbl_ano`

    let rsAno = await prisma.$queryRawUnsafe(sql);

    if (rsAno.length > 0)
        return rsAno;
    else
        return false;

}

//Seleciona o ano pelo id
const selectAnoById = async function(id) {
    let sql = `select * from tbl_ano where id = ${id}`

    let rsAno = await prisma.$queryRawUnsafe(sql);

    if (rsAno.length > 0)
        return rsAno;
    else
        return false;

}

//Seleciona o ano pelo numero do ano
const selectAnoByYear = async function(year) {
    let sql = `select * from tbl_ano where ano like '%${year}%'`

    let rsAno = await prisma.$queryRawUnsafe(sql);

    if (rsAno.length > 0) {
        return rsAno;
    } else
        return false;

}

module.exports = {
    insertAno,
    updateAno,
    deleteAno,
    selectAllAnos,
    selectAnoById,
    selectAnoByYear
}