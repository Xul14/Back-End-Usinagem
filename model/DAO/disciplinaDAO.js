/*
- Objetivo: Planejar as funções que entrarão em contato com o banco
- Data: 22/05/2023
- Autor: Claudio Sousa
- Versão: 1.0 
*/

//import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');

//Instância da classe prisma client
const prisma = new PrismaClient();

//função para pegar todas as disciplinas 
const getAllDisciplinas = async () => {
    let sql = `select * from tbl_disciplina`;

    let rsDisciplina = await prisma.$queryRawUnsafe(sql);

    if(rsDisciplina.length > 0){
        return rsDisciplina;
    }else{
        return false;
    }
}

//função para trazer a disciplina pelo id
const selectDisciplinaById = async (id) => {
    let sql = `select * from tbl_disciplina where id = ${id}`

    let rsDisciplina = await prisma.$queryRawUnsafe(sql);

    if(rsDisciplina.length > 0){
        return rsDisciplina;
    }else{
        return false;
    }
}

const insertDisciplina = async (dadosDisciplina) => {
    let sql = 
    `insert into tbl_disciplina (
        nome,
        descricao
    ) values (
        '${dadosDisciplina.nome}',
        '${dadosDisciplina.descricao}'
    )
    `
    let result = await prisma.$executeRawUnsafe(sql)
    if(result){
        return true
    }else{
        return false
    }
}

const selectLastID = async () => {
    let sql = `select * from tbl_disciplina order by id desc limit 1;`
    let rsDisciplina = await prisma.$queryRawUnsafe(sql);
    if(rsDisciplina.length > 0){
        return rsDisciplina;
    }else{
        return false;
    }
}

const updateDisciplina = async (dadosDisciplina) => {
    let sql = 
    `
    update tbl_disciplina set
            nome = '${dadosDisciplina.nome}',
            descricao = '${dadosDisciplina.descricao}'
    where id = ${dadosDisciplina.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

const deleteDisciplina = async (id) => {
    let sql = `delete from tbl_disciplina where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}


module.exports = {
    getAllDisciplinas,
    selectDisciplinaById,
    insertDisciplina,
    selectLastID,
    updateDisciplina,
    deleteDisciplina
}