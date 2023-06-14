/******************************************************************************
 * Objetivo: Responsável pela manipulação dos cursos no banco de dados.
 * Data: 26/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

//Inserir dados do curso no banco de dados
const insertCurso = async function(dadosCurso) {

    let sql = `insert into tbl_curso (
        nome,
        descricao,
        carga_horaria
        ) values (
            '${dadosCurso.nome}',
            '${dadosCurso.descricao}',
            '${dadosCurso.carga_horaria}'
            );`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;

}

//Atualizar dados do curso no banco de dados
const updateCurso = async function(dadosCurso) {

    let sql = `update tbl_curso set
     nome = '${dadosCurso.nome}' ,
     descricao = '${dadosCurso.descricao}' ,
     carga_horaria = '${dadosCurso.carga_horaria}' 
        where id = ${dadosCurso.id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }

}

//Deleta um curso
const deleteCurso = async function(id) {
    let sql = `delete from tbl_curso where id = '${id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql);

    if (resultStatus)
        return true;
    else
        return false;
}

//Seleciona todos os cursos
const selectAllCursos = async function(){
    let sql = `select * from tbl_curso`

    let resultCursos = await prisma.$queryRawUnsafe(sql);

    if (resultCursos.length > 0)
        return resultCursos
    else
        return false;
}

//Seleciona um curso pelo id
const selectCursoById = async function(id){
    let sql = `select * from tbl_curso where id = '${id}'`

    let resultCursos = await prisma.$queryRawUnsafe(sql);

    if (resultCursos.length > 0)
        return resultCursos
    else
        return false;
}

//Seleciona um curso pelo id
const selectCursoByName = async function(nome){
    let sql = `select * from tbl_curso where nome like '%${nome}%'`

    let resultCursos = await prisma.$queryRawUnsafe(sql);

    if (resultCursos.length > 0)
        return resultCursos
    else
        return false;
}

module.exports = {
    insertCurso,
    updateCurso,
    deleteCurso,
    selectAllCursos,
    selectCursoById,
    selectCursoByName
}