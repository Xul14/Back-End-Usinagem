/******************************************************************************
 * Objetivo: Responsável pela manipulação dos peíodos no banco de dados.
 * Data: 28/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir um novo período
const insertPeriodo = async function(dadosPeriodo){
    let sql = `insert into tbl_periodo(nome)values('${dadosPeriodo.nome}' )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

//Atualizar os dados de um período
const updatePeriodo = async function (dadosPeriodo) {
    let sql = `update tbl_periodo set 
        nome = '${dadosPeriodo.nome}'
    where id = ${dadosPeriodo.id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    
    if(resultStatus){
        return true
    }else{
        return false
    }
}

//Deletar um período
const deletePeriodo = async function(id){
    let sql = `delete from tbl_periodo where id = '${id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    
    if(resultStatus){
        return true
    }else{
        return false
    }
}

//Seleciona todos os períodos
const selectAllPeriodos = async function(){
    let sql = `select * from tbl_periodo`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    
    if(resultStatus){
        return resultStatus
    }else{
        return false
    }
}

//Seleciona o período pelo id
const selectPeriodoById = async function(id){
    let sql = `select * from tbl_periodo where id = '${id}'`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    
    if(resultStatus){
        return resultStatus
    }else{
        return false
    }
}

//Seleciona o período pelo nome
const selectPeriodoByName = async function(nome){
    let sql = `select * from tbl_periodo where nome like '%${nome}%'`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    
    if(resultStatus){
        return resultStatus
    }else{
        return false
    }
}

module.exports = {
    insertPeriodo,
    updatePeriodo,
    deletePeriodo,
    selectAllPeriodos,
    selectPeriodoById,
    selectPeriodoByName
}