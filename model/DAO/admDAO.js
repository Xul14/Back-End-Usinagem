/*
 * Objetivo: responsavel pela manipulação de dados dos adm no banco
 * Data: 29/05/2023
 * Autora: Nicole Souza Santos
 * Versão: 1.0
 */

let { PrismaClient } = require('@prisma/client')

let prisma = new PrismaClient()


const authenticateAdmin = async function (email){
    
    let sql = `select * from tbl_administrador where email = '${email}'`

    let resultStatus = await prisma.$queryRawUnsafe(sql)

    if(resultStatus)
        return resultStatus 
    else 
        return false

}

const insertTeacher = async function (dateTeacher) {

    let sql = `insert into tbl_professor (
		nome,
        email,
        senha,
        nif,
        id_administrador
        ) values (
        '${dateTeacher.nome}',
        '${dateTeacher.email}',
        '${dateTeacher.senha}',
        '${dateTeacher.nif}',
        '${dateTeacher.id_administrador}'
        )`

    let resultStatus = await prisma.$executeRawUnsafe(sql)
    console.log(resultStatus)

    if(resultStatus)
        return true
    else 
        return false

}

const updateTeacher = async function (dateTeacher) {

    let sql = `update tbl_professor set nome = '${dateTeacher.nome}',
                                        email = '${dateTeacher.email}',
                                        senha = '${dateTeacher.senha}',
                                        nif = '${dateTeacher.nif}'
                                    where id = '${dateTeacher.id}'`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false

}

const deleteTeacher = async function (id) {
    
    let sql = `delete from tbl_professor where id = ${id}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus)
        return true
    else
        return false

}

const selectAllTeachers = async function () {
    
    let sql = `select tbl_professor.nome, tbl_professor.email, tbl_professor.nif,
                        tbl_administrador.nome as administrador
                from tbl_professor
                    inner join tbl_administrador
                        on tbl_administrador.id = tbl_professor.id_administrador`

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    

    if(resultStatus)
        return resultStatus
    else 
        return false

}

const selectByNameTeacher = async function (name){

    let sql = `select * from tbl_professor where nome like '%${name}%'`

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    console.log(resultStatus)
    
    if(resultStatus)
        return resultStatus
    else 
        return false

}

const selectLastIdTeacher = async function (){

    let sql = `select * from tbl_professor order by id desc limit 1`

    let resultStatusTeacher = await prisma.$queryRawUnsafe(sql)
    console.log(resultStatusTeacher.length)

    if(resultStatusTeacher.length > 0)
        return resultStatusTeacher
    else 
        return false

}

const selectTeacherById = async function (id){

    let sql = `select * from tbl_professor where id = '${id}'`

    let resultStatusTeacher = await prisma.$queryRawUnsafe(sql)

    if(resultStatusTeacher.length > 0)
        return resultStatusTeacher
    else
        return false

}

const selectAdmById = async function (id){

    let sql = `select * from tbl_administrador where id = '${id}'`

    let resultStatusAdm = await prisma.$queryRawUnsafe(sql)
    console.log(resultStatusAdm)

    if(resultStatusAdm.length > 0)
        return resultStatusAdm
    else
        return false

}

const selectTeacherByEmail = async function (email){
    
    let sql = `select * from tbl_professor where email = '${email}'`

    let resultStatusTeacher = await prisma.$queryRawUnsafe(sql)
    console.log(resultStatusTeacher)

    if(resultStatusTeacher.length > 0)
        return resultStatusTeacher
    else 
        return false

}

const selectAdmByEmail = async function (email){
    
    let sql = `select * from tbl_administrador where email = '${email}'`

    let resultStatusTeacher = await prisma.$queryRawUnsafe(sql)
    console.log(resultStatusTeacher)

    if(resultStatusTeacher.length > 0)
        return resultStatusTeacher
    else 
        return false

}




module.exports = {
    selectAllTeachers,
    insertTeacher,
    selectLastIdTeacher,
    authenticateAdmin,
    selectByNameTeacher,
    deleteTeacher,
    updateTeacher,
    selectTeacherById,
    selectTeacherByEmail,
    selectAdmByEmail,
    selectAdmById
}