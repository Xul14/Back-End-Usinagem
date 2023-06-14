/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções dos anos.
 * Data: 29/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do ano no banco.
var anoDAO = require('../model/DAO/anoDAO.js')
const { ERROR_ID_NOT_FOUND } = require('./modulo/config.js')

//Insere um ano no banco
const inserirAno = async function(dadosAno) {

    if (dadosAno.ano == '' || dadosAno.ano == undefined || dadosAno.ano.length > 4) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDadosAno = await anoDAO.insertAno(dadosAno)

        if (resultDadosAno) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualiza um ano
const atualizarAno = async function(dadosAno, idAno) {

    if (dadosAno.ano == '' || dadosAno.ano == undefined || dadosAno.ano.length > 4) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idAno == '' || idAno == undefined || isNaN(idAno)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosAno.id = idAno

        let statusId = await anoDAO.selectAnoById(idAno)

        if (statusId) {
            let resultdadosAno = await anoDAO.updateAno(dadosAno)

            if (resultdadosAno) {
                let dadosAnojson = {}

                dadosAnojson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosAnojson.ano = dadosAno

                return dadosAnojson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Exclui um ano
const deletarAno = async function(idAno) {
    let buscarAno = await getBuscarAnoId(idAno)

    if (buscarAno) {

        if (idAno == '' || idAno == undefined || isNaN(idAno)) {
            return ERROR_INVALID_ID

        } else {
            let resultDadosAno = await anoDAO.deleteAno(idAno)

            if (resultDadosAno) {
                return SUCCESS_DELETED_ITEM
            } else {
                return ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return ERROR_ID_NOT_FOUND
    }

}

//Retorna a lista de todos os anos existentes
const getAnos = async function() {
    let dadosAnoJson = {}

    let dadosAno = await anoDAO.selectAllAnos()

    if (dadosAno) {

        dadosAnoJson.status = message.SUCCESS_REQUEST.status
        dadosAnoJson.anos = dadosAno

        return dadosAnoJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Retorna um ano buscando pelo id
const getBuscarAnoId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosAnoJson = {}

        let dadosAno = await anoDAO.selectAnoById(id)

        if (dadosAno) {

            dadosAnoJson.status = message.SUCCESS_REQUEST.status
            dadosAnoJson.ano = dadosAno

            return dadosAnoJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Retorna um ano pesquisando pelo numero do ano
const getBuscarAnoYear = async function(year) {
    let dadosAnoJson = {}

    let dadosAno = await anoDAO.selectAnoByYear(year)

    if (dadosAno != null && dadosAno != undefined) {

        dadosAnoJson.status = message.SUCCESS_REQUEST.status
        dadosAnoJson.ano = dadosAno

        return dadosAnoJson
    } else {
        return false
    }
}

module.exports = {
    inserirAno,
    atualizarAno,
    deletarAno,
    getAnos,
    getBuscarAnoId,
    getBuscarAnoYear
}