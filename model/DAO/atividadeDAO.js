/******************************************************************************
 * Objetivo: Responsável pela manipulação dos cursos no banco de dados.
 * Data: 08/06/2023
 * Autor: Claudio
 * Versão: 1.0
 *******************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instância da classe PrismaClient 
var prisma = new PrismaClient();

const selectAtividade = async () => {

    let sql = `select * from vwAtividade;`

    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result
    else
        return false;
}

const selectAtividadeById = async (id) => {
    let sql = `select * from vwAtividade where id = ${id};`
    
    let result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0)
        return result
    else
        return false;
}

const insertAtividade = async (dadosBody) => {
    let sql = `insert into tbl_atividade (
        nome,
        numero,
        id_tipo_atividade,
        id_tempo_previsto
    ) values (
        '${dadosBody.nome}',
         ${dadosBody.numero},
         ${dadosBody.id_tipo_atividade},
         ${dadosBody.id_tempo_previsto}

    );`

    let result = await prisma.$executeRawUnsafe(sql);

    if (result)
        return true
    else
        return false;
}

const selectLastID = async () => {
    let sql = `select * from tbl_atividade order by id desc limit 1;`

    let result = await prisma.$queryRawUnsafe(sql);

    if(result.length > 0){
        return result;
    }else{
        return false;
    }
}

const updateAtividade = async (dadosBody) => {
    let sql = `update tbl_atividade set
            nome = '${dadosBody.nome}',
            numero = ${dadosBody.numero},
            id_tipo_atividade = ${dadosBody.id_tipo_atividade},
            id_tempo_previsto = ${dadosBody.id_tempo_previsto}
    where id = ${dadosBody.id};`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

const deleteAtividade = async (id) =>{
    let sql = `delete from tbl_atividade where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

module.exports = {
    selectAtividade,
    selectAtividadeById,
    insertAtividade,
    selectLastID,
    updateAtividade,
    deleteAtividade
}