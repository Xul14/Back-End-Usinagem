/*
- Objetivo: Planejar as regras do crud referente ao professor
- Data: 22/05/2023
- Autor: Claudio Sousa
- Versão: 1.0 
*/

//import dao do professor
const professorDAO = require('../model/DAO/professorDAO.js');

//import mensagens
const config = require('../controller/modulo/config.js');

const autenticarProfessor = async(email, senha) => {
    let dadosProfessorJSON = {};
    if (
        email == '' || email == undefined || email.lenght > 255 ||
        senha == '' || senha == undefined || senha.lenght > 150
    ) {
        return config.ERROR_REQUIRED_FIELDS
    } else {
        let resultadoProfessor = await professorDAO.aunthenticate(email, senha);
        if (resultadoProfessor) {
            dadosProfessorJSON.status = config.SUCCESS_REQUEST.status
            dadosProfessorJSON.professor = resultadoProfessor
            return dadosProfessorJSON
        } else {
            return config.ERROR_INVALID_AUTHENTICATE
        }
    }
}

const getProfessores = async() => {
    let dadosProfessorJSON = {};

    let dadosProfessor = await professorDAO.getAllTeachers()

    if (dadosProfessor) {
        dadosProfessorJSON.status = config.SUCCESS_REQUEST.status
        dadosProfessorJSON.professores = dadosProfessor
        return dadosProfessorJSON
    } else {
        return config.ERROR_REGISTER_NOT_FOUND
    }
}

const getProfessorId = async(id) => {
    let dadosProfessorJSON = {};

    if (id == '' || id == undefined || isNaN(id)) {
        return config.ERROR_INVALID_ID
    } else {
        let dadosProfessor = await professorDAO.selectAlunoById(id)

        if (dadosProfessor) {
            dadosProfessorJSON.status = config.SUCCESS_REQUEST.status
            dadosProfessorJSON.professor = dadosProfessor
            return dadosProfessorJSON
        } else {
            return config.ERROR_REGISTER_NOT_FOUND
        }

    }
}

module.exports = {
    autenticarProfessor,
    getProfessores,
    getProfessorId
}