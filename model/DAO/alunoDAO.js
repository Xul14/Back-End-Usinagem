/******************************************************************************
 * Objetivo: Responsável pela manipulação dos alunos no banco de dados.
 * Data: 22/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();


/**************** ALUNO *******************/

//Inserir dados do aluno no banco de dados
const insertAluno = async function(dadosAluno) {

    let sql = `insert into tbl_aluno(
        nome,
        email_institucional,
        senha
    )values(
        '${dadosAluno.nome}',
        '${dadosAluno.email_institucional}',
        '${dadosAluno.senha}'
    )`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;

}

//Atualizar dados do aluno no banco de dados
const updateAluno = async function(dadosAluno) {

    let sql = `update tbl_aluno set 

                nome = '${dadosAluno.nome}',
                email_institucional = '${dadosAluno.email_institucional}',
                senha = '${dadosAluno.senha}'

         where id = ${dadosAluno.id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Deletar dados do aluno no banco de dados
const deleteAluno = async function(id) {

    //ScriptSQL para deletar um registro no banco
    let sql = `delete from tbl_aluno where id = '${id}'`

    //Executa o script
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Seleciona todos os alunos do banco.
const selectAllAlunos = async function() {
    let sql = `select * from tbl_aluno`

    let rsAluno = await prisma.$queryRawUnsafe(sql);

    if (rsAluno.length > 0)
        return rsAluno;
    else
        return false;
}

//Get aluno pelo id
const selectByIdAlunos = async function(id) {

    let sql = `select * from tbl_aluno where id = ${id}`

    let rsAluno = await prisma.$queryRawUnsafe(sql);

    if (rsAluno.length > 0)
        return rsAluno;
    else
        return false;

}

//Get aluno pelo nome
const selectByNameAlunos = async function(name) {

    let sql = `select * from tbl_aluno where nome like '%${name}%'`

    let rsAluno = await prisma.$queryRawUnsafe(sql);

    if (rsAluno.length > 0)
        return rsAluno;
    else
        return false;

}

//Autentificação do email e senha do aluno para tela de login
const authenticateAluno = async function(email_institucional, senha) {
    let sql = `select * from tbl_aluno where email_institucional = '${email_institucional}' and senha = '${senha}'`

    let rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false
    }
}

//Pega todos os registros do banco que contem aquele email
const selectAlunoByEmail = async function (email_institucional){
    
    let sql = `select * from tbl_aluno where email_institucional = '${email_institucional}'`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus > 0)
        return resultStatus 
    else 
        return false

}


module.exports = {
    insertAluno,
    updateAluno,
    deleteAluno,
    selectAllAlunos,
    selectByIdAlunos,
    selectByNameAlunos,
    authenticateAluno,
    selectAlunoByEmail
}