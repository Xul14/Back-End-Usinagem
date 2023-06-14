/*
 * Objetivo: responsavel pela manipulação de dados dos registro de tempo no banco
 * Data: 10/06/2023
 * Autora: Nicole Souza Santos
 * Versão: 1.0
 */

let { PrismaClient } = require('@prisma/client')

let prisma = new PrismaClient()

const insertTimeRecord = async function (dateTimer){
    
    let sql = ` insert into tbl_registro_tempo (
        horario_inicio,
        horario_termino,
        desconto,
        liquido,
        data_registro
        ) values (
            '${dateTimer.horario_inicio}',
            '${dateTimer.horario_termino}',
            '${dateTimer.desconto}',
            '${dateTimer.liquido}',
            '${dateTimer.data_registro}'
        )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else 
        return false
}


// formata data para enviar para banco
const formatDateInDb = async function (dateInIsoBr){

    let sql = `select date_format(str_to_date('${dateInIsoBr}', '%d/%m/%Y'), '%Y-%m-%d') as data_universal_db`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus)
        return resultStatus
    else
        return false

}

// calcula as horas trabalhadas e valor liquido (horas trabalhadas - desconto)
const calcNetValue = async function (finish, start, discount){

    let sql = `select time_format(subtime(timediff('${finish}', '${start}'), '${discount}'),'%H:%i') as liquido`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus)
        return resultStatus
    else
        return false

}

// deleta registro de tempo do banco
const deleteTimeRecord = async function (id){
    let sql = `delete from tbl_registro_tempo where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

// atualiza registro de tempo do banco
const updateTimeRecord = async function (dateTimer){
    let sql = `update tbl_registro_tempo set 
                            horario_inicio = '${dateTimer.horario_inicio}',
                            horario_termino = '${dateTimer.horario_termino}',
                            desconto = '${dateTimer.desconto}',
                            liquido = '${dateTimer.liquido}',
                            data_registro = '${dateTimer.data_registro}'
                            where id = '${dateTimer.id}'
                            `
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false
}

// retorna todos os registros cadastrados
const selectAllTimeRecord = async function (){
    
    let sql = `select * from vwRegistroTempo;`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus)
        return resultStatus
    else 
        return false


}

// retorna o ultimo registro de tempo cadastrado
const selectLastIdTimeRecord = async function (){

    let sql = `select * from vwRegistroTempo order by id desc limit 1;`

    let resultStatusTimeRecord = await prisma.$queryRawUnsafe(sql)

    if(resultStatusTimeRecord.length > 0)
        return resultStatusTimeRecord
    else 
        return false

}

const selectTimerRecordById = async function (idTimeRecord){
    let sql = `select * from vwRegistroTempo where id = ${idTimeRecord}`

    let resultStatusTeacher = await prisma.$queryRawUnsafe(sql)

    if(resultStatusTeacher.length > 0)
        return resultStatusTeacher
    else
        return false
}

module.exports = {
    insertTimeRecord,
    updateTimeRecord,
    deleteTimeRecord,
    selectAllTimeRecord,
    selectLastIdTimeRecord,
    calcNetValue,
    formatDateInDb,
    selectTimerRecordById
}