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

const selectAllValorDesejado = async () => {
    let sql = `select * from vwValorDesejado;`

    let resultValorDesejado = await prisma.$queryRawUnsafe(sql);

    if (resultValorDesejado.length > 0)
        return resultValorDesejado
    else
        return false;
}

const selectValorDesejadoByID = async (id) => {
    let sql = `select * from vwValorDesejado where id = ${id}`

    let resultValorDesejado = await prisma.$queryRawUnsafe(sql);

    if (resultValorDesejado)
        return resultValorDesejado
    else
        return false;

}

const insertValorDesejado = async (dadosBody) => {
    let sql = 
    `
    insert into tbl_valor_desejado (
        valor_desejado,
        id_criterio
    ) values (
        '${dadosBody.valor_desejado}',
         ${dadosBody.id_criterio}
    )
    `

    let resultValorDesejado = await prisma.$executeRawUnsafe(sql);

    if (resultValorDesejado)
        return resultValorDesejado
    else
        return false;
}

const selectLastID = async () => {
    let sql = `select tbl_valor_desejado.id, tbl_valor_desejado.valor_desejado,
    tbl_criterio.descricao as criterio
    from tbl_valor_desejado
        inner join tbl_criterio
             on tbl_valor_desejado.id_criterio = tbl_criterio.id
        order by id desc limit 1;`
   
         let result = await prisma.$queryRawUnsafe(sql);
    if(result.length > 0){
        return result;
    }else{
        return false;
    }
}

const updateValorDesejado = async (dadosBody) => {
    let sql = 
    `
    update tbl_valor_desejado set
            valor_desejado = '${dadosBody.valor_desejado}',
            id_criterio = ${dadosBody.id_criterio}
    where id = ${dadosBody.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

const deleteValorDesejado = async (id) =>{
    let sql = `delete from tbl_valor_desejado where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}



module.exports = {
    selectAllValorDesejado,
    selectValorDesejadoByID,
    insertValorDesejado,
    selectLastID,
    updateValorDesejado,
    deleteValorDesejado
}