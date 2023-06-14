/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao GET da matricula dos alunos.
 * Data: 30/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var matriculaDAO = require('../model/DAO/matriculaDAO.js')

//Insere uma nova matricula
const inserirMatricula = async function(dadosMatricula){
    if(
        dadosMatricula.numero == '' || dadosMatricula.numero == undefined || dadosMatricula.numero.length > 45 ||
        dadosMatricula.id_aluno == '' || dadosMatricula.id_aluno == undefined || isNaN(dadosMatricula.id_aluno) ||
        dadosMatricula.id_turma == '' || dadosMatricula.id_turma == undefined || isNaN(dadosMatricula.id_turma)
    ){
        return message.ERROR_REQUIRED_FIELDS
    }else{
        let resultDados = await matriculaDAO.insertMatricula(dadosMatricula)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualiza uma matricula 
const atualizarMatricula = async function(dadosMatricula, idMatricula){

    if(
        dadosMatricula.numero == '' || dadosMatricula.numero == undefined || dadosMatricula.numero.length > 45 ||
        dadosMatricula.id_aluno == '' || dadosMatricula.id_aluno == undefined || isNaN(dadosMatricula.id_aluno) ||
        dadosMatricula.id_turma == '' || dadosMatricula.id_turma == undefined || isNaN(dadosMatricula.id_turma) 
    ){
        return message.ERROR_REQUIRED_FIELDS

    }else if (idMatricula == '' || idMatricula == undefined || isNaN(idMatricula)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosMatricula.id = idMatricula

        let statusId = await matriculaDAO.selectMatriculaById(idMatricula)

        if (statusId) {

            let resultDadosMatricula = await matriculaDAO.updateMatricula(dadosMatricula)

            if (resultDadosMatricula) {
                let dadosMatriculajson = {}

                dadosMatriculajson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosMatriculajson.aluno = dadosMatricula

                return dadosMatriculajson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}

//Deleta uma matricula 
const deletarMatricula = async function(idMatricula){

    let buscarAlunomatricula = await getMatriculaId(idMatricula)

    if (buscarAlunomatricula) {

        if (idMatricula == "" || idMatricula == undefined || isNaN(idMatricula)) {

            return message.ERROR_INVALID_ID 

        } else {

            let resultDados = await matriculaDAO.deleteMatricula(idMatricula)

            if (resultDados) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return message.ERROR_ID_NOT_FOUND
    }
}

//retorna uma lista de matriculas 
const getMatriculas = async function(){
    let dadosJson = {};

    let dadosMatricula = await matriculaDAO.selectAllMatriculas();

    if (dadosMatricula) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.matriculas = dadosMatricula;

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getMatricula = async function(matriculaAluno) {

    let buscarAluno = await matriculaDAO.selectMatriculaAluno(matriculaAluno);

    if (buscarAluno) {

        let dadosAlunoJson = {}

        dadosAlunoJson.status = message.SUCCESS_REQUEST.status
        dadosAlunoJson.aluno = buscarAluno

        return dadosAlunoJson


    } else {
        return message.ERROR_ID_NOT_FOUND
    }
}

//Retorna uma matricula pelo id dela
const getMatriculaId = async function(id){

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let matriculaJsonId = {}

        let dadosMatricula = await matriculaDAO.selectMatriculaById(id);

        if (dadosMatricula) {
            matriculaJsonId.status = message.SUCCESS_REQUEST.status
            matriculaJsonId.aluno = dadosMatricula;
            return matriculaJsonId
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

module.exports = {
    inserirMatricula,
    atualizarMatricula,
    deletarMatricula,
    getMatriculas,
    getMatricula,
    getMatriculaId
}