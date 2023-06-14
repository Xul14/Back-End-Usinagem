/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções das turmas.
 * Data: 29/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do ano no banco.
var turmaDAO = require('../model/DAO/turmaDAO.js')
var cursoDAO = require('../model/DAO/cursoDAO.js')
var anoDAO = require('../model/DAO/anoDAO.js')
var periodoDAO = require('../model/DAO/periodoDAO.js')

//Insere uma nova turma
const inserirTurma = async function(dadosTurma) {

    if (
        dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome.length > 15 ||
        dadosTurma.termo == '' || dadosTurma.termo == undefined ||
        dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined ||
        dadosTurma.id_ano == '' || dadosTurma.id_ano == undefined ||
        dadosTurma.id_periodo == '' || dadosTurma.id_periodo == undefined
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        let curso = await cursoDAO.selectCursoById(dadosTurma.id_curso)
        let ano = await anoDAO.selectAnoById(dadosTurma.id_ano)
        let periodo = await periodoDAO.selectPeriodoById(dadosTurma.id_periodo)

        if (curso == false || ano == false || periodo == false) {

        } else {
            let resultDadosTurma = await turmaDAO.insertTurma(dadosTurma)

            if (resultDadosTurma) {
                return message.SUCCESS_CREATED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER

            }

        }
    }
}

//Atualizar dados de uma turma
const atualizarTurma = async function(dadosTurma, idTurma) {

    if (dadosTurma.nome == '' || dadosTurma.nome == undefined || dadosTurma.nome.length > 15 ||
        dadosTurma.termo == '' || dadosTurma.termo == undefined || isNaN(dadosTurma.termo) ||
        dadosTurma.id_curso == '' || dadosTurma.id_curso == undefined || isNaN(dadosTurma.id_curso) ||
        dadosTurma.id_ano == '' || dadosTurma.id_ano == undefined || isNaN(dadosTurma.id_ano) ||
        dadosTurma.id_periodo == '' || dadosTurma.id_periodo == undefined || isNaN(dadosTurma.id_periodo)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idTurma == '' || idTurma == undefined || isNaN(idTurma)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosTurma.id = idTurma

        let statusId = await turmaDAO.selectTurmaById(idTurma)

        if (statusId) {

            let resultDadosTurma = await turmaDAO.updateTurma(dadosTurma)

            if (resultDadosTurma) {
                let dadosTurmajson = {}

                dadosTurmajson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosTurmajson.turma = dadosTurma

                return dadosTurmajson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Exclui uma turma do banco
const deletarTurma = async function(idTurma) {

        let buscarTurma = await getBuscarTurmaId(idTurma)

        if (buscarTurma) {

            if (idTurma == "" || idTurma == undefined || isNaN(idTurma)) {

                return message.ERROR_INVALID_ID

            } else {

                let resultDados = await turmaDAO.deleteTurma(idTurma)

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
    //Retorna a lista de todos as turmas
const getTurmas = async function() {
    let dadosTurmasJson = {};

    let dadosTurma = await turmaDAO.selectALlTurmas();

    if (dadosTurma) {

        dadosTurmasJson.status = message.SUCCESS_REQUEST.status
        dadosTurmasJson.turmas = dadosTurma;

        return dadosTurmasJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Pesquisa um aluno pelo id
const getBuscarTurmaId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let turmaJsonId = {}

        let dadosTurma = await turmaDAO.selectTurmaById(id);

        if (dadosTurma) {
            turmaJsonId.status = message.SUCCESS_REQUEST.status
            turmaJsonId.turma = dadosTurma;
            return turmaJsonId
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Pesquisa uma turma pelo nome
const getBuscarTurmaNome = async function(nome) {
    let turmaJsonNome = {}

    let dadosTurma = await turmaDAO.selectTurmaByName(nome);

    if (dadosTurma != null && dadosTurma != undefined && isNaN(dadosTurma)) {
        turmaJsonNome.status = message.SUCCESS_REQUEST.status
        turmaJsonNome.aluno = dadosTurma
        return turmaJsonNome
    } else {
        return message.ERROR_NAME_NOT_FOUND
    }

}

module.exports = {
    inserirTurma,
    atualizarTurma,
    deletarTurma,
    getTurmas,
    getBuscarTurmaId,
    getBuscarTurmaNome
}