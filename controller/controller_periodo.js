/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções dos períodos.
 * Data: 28/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do periodo no banco.
var periodoDAO = require('../model/DAO/periodoDAO.js')

//Inserir um novo período
const inserirPeriodo = async function (dadosPeriodo) {

    if (dadosPeriodo.nome == '' || dadosPeriodo.nome == undefined || dadosPeriodo.nome.length > 10) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDadosPeriodo = await periodoDAO.insertPeriodo(dadosPeriodo)

        if (resultDadosPeriodo) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

//Atualizar um período existente
const atualizarPeriodo = async function (dadosPeriodo, idPeriodo) {
    if (dadosPeriodo.nome == '' || dadosPeriodo.nome == undefined || dadosPeriodo.nome.length > 150) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idPeriodo == '' || idPeriodo == undefined || isNaN(idPeriodo)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosPeriodo.id = idPeriodo

        let statusId = await periodoDAO.selectPeriodoById(idPeriodo)

        if (statusId) {

            let resultDadosPeriodo = await periodoDAO.updatePeriodo(dadosPeriodo)

            if (resultDadosPeriodo) {
                let dadosPeriodoJson = {}

                dadosPeriodoJson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosPeriodoJson.aluno = dadosPeriodo

                return dadosPeriodoJson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Atualizar um período existente
const deletarPeriodo = async function (idPeriodo) {

    let buscarPeriodo = await getBuscarPeriodoId(idPeriodo)

    if (buscarPeriodo) {

        if (idPeriodo == "" || idPeriodo == undefined || isNaN(idPeriodo)) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDadosPeriodo = await periodoDAO.deletePeriodo(idPeriodo)

            if (resultDadosPeriodo) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

}

//Retorna uma lista com os períodos
const getPeriodos = async function () {
    let dadosJson = {}

    let dadosPeriodo = await periodoDAO.selectAllPeriodos()

    if (dadosPeriodo) {
        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.periodos = dadosPeriodo

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Retorna o curso buscando pelo id
const getBuscarPeriodoId = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosJson = {}

        let dadosPeriodo = await periodoDAO.selectPeriodoById(id)

        if (dadosPeriodo) {
            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.periodo = dadosPeriodo

            return dadosJson

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna o curso buscando pelo nome
const getBuscarPeriodoNome = async function (nome) {

    let dadosJson = {}

    let dadosPeriodo = await periodoDAO.selectPeriodoByName(nome)

    if (dadosPeriodo != null && dadosPeriodo != undefined && isNaN(dadosPeriodo)) {
        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.periodo = dadosPeriodo

        return dadosJson

    } else {
        return message.ERROR_NOT_FOUND
    }
}

module.exports = {
    inserirPeriodo,
    atualizarPeriodo,
    deletarPeriodo,
    getPeriodos,
    getBuscarPeriodoId,
    getBuscarPeriodoNome
}