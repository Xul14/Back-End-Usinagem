/*
 * Objetivo: Responsavel pela regra de negocio referente ao CRUD de professores
 * Data: 14/04/2023
 * Autora: Nicole Souza
 * Versão: 1.0
 */

var admDAO = require('../model/DAO/admDAO.js')
var jwt = require('../middleware/middleware_jwt.js')
var message = require('./modulo/config.js')
const bcrypt = require('bcrypt')
var nodemailerEmail = require('../nodemailer/email.js')


// retorna uma lista de professores
const getTeachers = async function (){

    let dateTeachersJSON = {}

    let dateTeachers = await admDAO.selectAllTeachers()

    if(dateTeachers){
        dateTeachersJSON.status = message.SUCESS_REQUEST.status
        dateTeachersJSON.quantidade = dateTeachers.length
        dateTeachersJSON.professores = dateTeachers

        return dateTeachersJSON
    } else {
        return message.ERROR_NOT_FOUND
    }

}

// retorna professor com base no nome
const getTeacherByName = async function (name) {
    
    if(name == '' || name == undefined || name < 1){
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let teacher = await admDAO.selectByNameTeacher(name)

        if(teacher){

            let dateAdministratorJSON = {}

        dateAdministratorJSON.status = message.SUCCESS_CREATED_ITEM.status
        dateAdministratorJSON.quantidade = teacher.length
        dateAdministratorJSON.professor = teacher

        return dateAdministratorJSON

        } else {
            return message.ERROR_NOT_FOUND
        }

    }

}

const forgotPassword = async function (email){
    if(email == '' || email == undefined || email.length > 255){
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let checkEmailAdm = await admDAO.selectAdmByEmail(email)

        if(checkEmailAdm){
            let idAdm = checkEmailAdm[0].id
            let nameAdm = checkEmailAdm[0].nome
            let emailAdm = checkEmailAdm[0].email

            let token = await jwt.createJWT(idAdm)
            nodemailerEmail.sendNewPassowrdEmail(emailAdm, nameAdm, token)
            
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

// Valida e faz a troca da senha (AINDA NÃO TERMINADO)
const newPasswordAdm = async function (token, email, newPassword){
    if(token == '' || token == undefined 
    || email == '' || email == undefined || email > 255
    || newPassword == '' || newPassword == undefined || newPassword > 150){
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let validateEmail = await admDAO.selectTeacherByEmail(email)

        if(validateEmail){
            let validateToken = await jwt.validadeJWT(token)
            if(validateToken){

            } else {
                return message.ERROR_AUTHETICATION_TOKEN
            }
        } else {
            return message.ERROR_AUTHETICATION_EMAIL
        }
    }
}

// insere novo professor no banco
const insertTeacherInDb = async function (dateTeacher){

    if(dateTeacher.nome == '' || dateTeacher.nome == undefined || dateTeacher.nome.length > 100 
        || dateTeacher.email == '' || dateTeacher.email == undefined || dateTeacher.email.length > 255
        || dateTeacher.senha == '' || dateTeacher.senha == undefined || dateTeacher.senha.length > 150
        || dateTeacher.nif == '' || dateTeacher.nif == undefined || dateTeacher.nif.length > 15
        || dateTeacher.id_administrador == '' || dateTeacher.id_administrador == undefined){
        
            return message.ERROR_REQUIRED_FIELDS
    } else {
        console.log(dateTeacher.id_administrador)
        let checkAdm = await admDAO.selectAdmById(dateTeacher.id_administrador)
        console.log(checkAdm)

        if(checkAdm){
            console.log(dateTeacher.email)
            let checkEmailTeacherInDn = await admDAO.selectTeacherByEmail(dateTeacher.email)
            console.log(checkEmailTeacherInDn)
            if(checkEmailTeacherInDn){

                return message.ERROR_INVALID_EMAIL
            } else {
                let dateTeachers = await admDAO.insertTeacher(dateTeacher)
    
                if(dateTeachers){
                    let newTeacherId = await admDAO.selectLastIdTeacher()
    
                    let dateTeachersJSON = {}
    
                    dateTeachersJSON.status = message.SUCCESS_CREATED_ITEM.status
                    dateTeachersJSON.professor = newTeacherId
    
                    return dateTeachersJSON
    
                } else {
                    return message.ERROR_INTERNAL_SERVER
                }
            }  
        } else {
            return message.ERROR_AUTHETICATION_ADM
        }
    }
}

// autenticação 
const authenticatingAdministrator = async function (email, password){

    if(email == '' || email == undefined || email > 255 ||
        password == '' || password == undefined || password > 150){

        return message.ERROR_REQUIRED_FIELDS

    } else {

        let clearEmail = email.replace("'", " ")

        let clearPassword = password.replace("'", " ")

        let dateAdministrator = await admDAO.authenticateAdmin(clearEmail)

        if(dateAdministrator == false || dateAdministrator > 0){

            return message.ERROR_AUTHETICATION
            
        } else {
            let passorwordInDb = dateAdministrator[0].senha
            let passHashCompare = compareHash(clearPassword, passorwordInDb)
            console.log(passHashCompare)

            if(passHashCompare){
                let dateAdministratorJSON = {}
                let dateAdmin = {}

                let tokenTeacher = await jwt.createJWT(dateAdministrator[0].id)
            
                dateAdmin.id = dateAdministrator[0].id
                dateAdmin.nome = dateAdministrator[0].nome
                dateAdmin.email = dateAdministrator[0].email
                // adição da chave no JSON
                dateAdmin.token = tokenTeacher // o token sempre muda a cada validação
                dateAdministratorJSON.status = message.SUCESS_AUTHETICATON.status
                dateAdministratorJSON.administrador = dateAdmin // RETORNA SOMENTE ID, NOME E EMAIL 

                return dateAdministratorJSON
            } else {
                return message.ERROR_ACCESS_DENIED
            }
            
        }

    }

}

const updateTeacherInDb = async function (dateTeacher, idTeacher){

    if(dateTeacher.nome == ' ' || dateTeacher.nome == undefined || dateTeacher.nome.length > 100 
    || dateTeacher.email == ' ' || dateTeacher.email == undefined || dateTeacher.email.length > 255
    || dateTeacher.senha == ' ' || dateTeacher.senha == undefined || dateTeacher.senha.length > 150
    || dateTeacher.nif == ' ' || dateTeacher.nif == undefined || dateTeacher.nif.length > 15){
    
        return message.ERROR_REQUIRED_FIELDS

    } else if(idTeacher == ' ' || idTeacher == undefined || isNaN(idTeacher)){
        
        return message.ERROR_INVALID_ID
    
    } else {
        dateTeacher.id = idTeacher

        let statusTeacherId = await selectedTeacherByIdInDb(idTeacher)

        if(statusTeacherId){
            let resultStatus = await admDAO.updateTeacher(dateTeacher)

            if(resultStatus){
                let dateTeacherJSON = {}

                dateTeacherJSON.status = message.SUCESS_UPDATE_ITEM.status
                dateTeacherJSON.professor = dateTeacher

                return dateTeacherJSON
            } else {
                return message.ERROR_NOT_FOUND
            }

        } else {
            return message.ERROR_NOT_FOUND
        }

        
    }

}

const selectedTeacherByIdInDb = async function(idTeacher) {
    if(idTeacher == '' || idTeacher == undefined || isNaN(idTeacher)){
        return message.ERROR_INVALID_ID
    } else {
        let teacherJSON = {}
        
        let dateTeacher = await admDAO.selectTeacherById(idTeacher)

        if(dateTeacher){

            teacherJSON.status = message.SUCESS_REQUEST.status
            teacherJSON.quantidade = dateTeacher.length
            teacherJSON.professor = dateTeacher
            return teacherJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const deleteTeacherInDb = async function (idTeacher) {

        if(idTeacher == '' || idTeacher == undefined || isNaN(idTeacher)){
            return message.ERROR_INVALID_ID
        } else {
            let statusTeacherId = await admDAO.selectTeacherById(idTeacher)

            if(statusTeacherId){
                let resultStatus = await admDAO.deleteTeacher(idTeacher)

                if(resultStatus)
                    return message.SUCCESS_DELETED_ITEM
                else 
                    return message.ERROR_INTERNAL_SERVER

        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}

// gera o hash atraves da string de senha fornecida - DEVE SER CHAMADA SEMPRE QUE UM NOVO PROFESSOR FOR CRIADO OU EDITADO
const generateHash = async function (password) {
    const salt = bcrypt.genSaltSync(12)

    const hash = bcrypt.hashSync(password, salt)

    if(hash){
        const hashTokenJSON = {}
        hashTokenJSON.status = message.SUCCESS_CREATED_ITEM
        hashTokenJSON.hash = hash
        
        return hashTokenJSON
    } else {
        return message.ERROR_INTERNAL_SERVER
    }
    
    
}

// compara o hash atraves da string de senha fornecida
const compareHash = async function (password, hash) {

    let comparedPassword = bcrypt.compareSync(password, hash)

    return comparedPassword
}

module.exports = {
    getTeachers,
    insertTeacherInDb,
    authenticatingAdministrator,
    getTeacherByName,
    updateTeacherInDb,
    deleteTeacherInDb,
    selectedTeacherByIdInDb,
    generateHash,
    compareHash,
    forgotPassword,
    newPasswordAdm
}

