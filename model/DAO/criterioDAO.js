/******************************************************************************
 * Objetivo: Responsável pela manipulação dos criterios no banco de dados.
 * Data: 02/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();


//Inserir dados do criterio no banco de dados
const insertCriterio = async function(dadosCriterio) {

    let sql = `insert into tbl_criterio(
        descricao
    )values(
        '${dadosCriterio.descricao}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;

}

//Atualizar dados do criterio no banco de dados
const updateCriterio = async function(dadosCriterio) {

    let sql = `update tbl_criterio set 
        descricao = '${dadosCriterio.descricao}'
            where id = ${dadosCriterio.id} `

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}

//Deletar um criterio
const deleteCriterio = async function(id) {

    let sql = `delete from tbl_criterio where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}

//Seleciona todos os criterios existentes no banco
const selectAllCriterios = async function() {

    let sql = `select * from tbl_criterio`

    let resultCriterios = await prisma.$queryRawUnsafe(sql)

    if (resultCriterios.length > 0) {
        return resultCriterios
    } else {
        return false
    }
}

//Seleciona um criterio pelo id dele
const selectCriterioById = async function(id) {

    let sql = `select * from tbl_criterio where id = ${id}`

    let resultCriterios = await prisma.$queryRawUnsafe(sql)

    if (resultCriterios.length > 0) {
        return resultCriterios
    } else {
        return false
    }
}

//Seleciona um criterio pela descrição dele
const selectCriterioByDescricao = async function(descricao) {

    let sql = `select * from tbl_criterio where descricao like '%${descricao}%'`

    let rsCriterio = await prisma.$queryRawUnsafe(sql);

    if (rsCriterio.length > 0)
        return rsCriterio;
    else
        return false;

}

module.exports = {
    insertCriterio,
    updateCriterio,
    deleteCriterio,
    selectAllCriterios,
    selectCriterioById,
    selectCriterioByDescricao
}