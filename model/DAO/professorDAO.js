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

const aunthenticate =  async (email, senha) => {
    let sql = `SELECT * FROM tbl_professor WHERE email = '${email}' AND senha = '${senha}'`

    let rsProfessor = await prisma.$queryRawUnsafe(sql);

    if(rsProfessor.length > 0){
        return rsProfessor;
    }else{
        return false
    }
}

const getAllTeachers = async () => {
    let sql = `select * from tbl_professor`

    let rsProfessor = await prisma.$queryRawUnsafe(sql);

    if(rsProfessor.length > 0){
        return rsProfessor;
    }else{
        return false;
    }
}

const selectAlunoById = async (id) => {
    let sql = `select * from tbl_professor where id = ${id}`
    let rsProfessor = await prisma.$queryRawUnsafe(sql);
    if(rsProfessor.length > 0){
        return rsProfessor;
    }else{
        return false;
    }
}


module.exports = {
    aunthenticate,
    getAllTeachers,
    selectAlunoById
}