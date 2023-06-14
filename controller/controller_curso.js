/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções dos cursos.
 * Data: 26/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do curso no banco.
var cursoDAO = require('../model/DAO/cursoDAO.js')

//Insere um curso
const inserirCurso = async function (dadosCurso) {
    if (
        dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 45 ||
        dadosCurso.carga_horaria.length > 45
    ) {

        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDadosCurso = await cursoDAO.insertCurso(dadosCurso)

        if (resultDadosCurso) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualizar um curso existente
const atualizarCurso = async function (dadosCurso, idCurso) {

    if (
        dadosCurso.nome == '' || dadosCurso.nome == undefined || dadosCurso.nome.length > 45 ||
        dadosCurso.carga_horaria.length > 45
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosCurso.id = idCurso

        let statusId = await cursoDAO.selectCursoById(idCurso)

        if (statusId) {

            let resultDados = await cursoDAO.updateCurso(dadosCurso)

            if (resultDados) {
                let dadosCursojson = {}

                dadosCursojson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosCursojson.curso = dadosCurso

                return dadosCursojson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}

//Deleta um curso
const deletarCurso = async function (idCurso) {

    let buscarCurso = await getBuscarCursoId(idCurso)

    if (buscarCurso) {

        if (idCurso == "" || idCurso == undefined || isNaN(idCurso)) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDados = await cursoDAO.deleteCurso(idCurso)

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

//Retorna uma lista de todos os cursos
const getBuscarCursos = async function () {
    let dadosCursoJson = {}

    let resultCursos = await cursoDAO.selectAllCursos()

    if (resultCursos) {

        dadosCursoJson.status = message.SUCCESS_REQUEST.status
        dadosCursoJson.cursos = resultCursos

        return dadosCursoJson

    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Retorna o curso pelo id
const getBuscarCursoId = async function (idCurso) {
    if (idCurso == '' || idCurso == undefined || isNaN(idCurso)) {
        return message.ERROR_INVALID_ID
    } else {

        let cursoJsonId = {}

        let dadosCurso = await cursoDAO.selectCursoById(idCurso);

        if (dadosCurso) {
            cursoJsonId.status = message.SUCCESS_REQUEST.status
            cursoJsonId.curso = dadosCurso
            return cursoJsonId
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna o curso pelo nome
const getBuscarCursoName = async function (nameCurso) {
    let cursoJsonNome = {}

    let dadosCurso = await cursoDAO.selectCursoByName(nameCurso);

    if (dadosCurso != null && dadosCurso != undefined && isNaN(dadosCurso)) {

        cursoJsonNome.status = message.SUCCESS_REQUEST.status;
        cursoJsonNome.curso = dadosCurso;

        return cursoJsonNome

    } else {
        return false
    }
}


module.exports = {
    inserirCurso,
    atualizarCurso,
    deletarCurso,
    getBuscarCursos,
    getBuscarCursoId,
    getBuscarCursoName
}