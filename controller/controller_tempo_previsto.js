/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao tempo previsto.
 * Data: 08/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var tempo_previstoDAO = require('../model/DAO/tempo_previstoDAO.js')

//Inserir um novo tempo previsto
const inserirTempoPrevisto = async function(dadosTempoPrevisto) {

    if (dadosTempoPrevisto.tempo == '' || dadosTempoPrevisto.tempo == undefined) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDados = await tempo_previstoDAO.insertTempoPrevisto(dadosTempoPrevisto)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualiza um tempo previsto
const atualizarTempoPrevisto = async function(dadosTempoPrevisto, id) {
    
    if (dadosTempoPrevisto.tempo == '' || dadosTempoPrevisto.tempo == undefined) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosTempoPrevisto.id = id

        let statusId = await tempo_previstoDAO.selectByIdTempoPrevisto(id)

        if (statusId) {

            let resultDados = await tempo_previstoDAO.updateTempoPrevisto(dadosTempoPrevisto)

            if (resultDados) {
                let dadosJson = {}

                dadosJson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosJson.tempo_previsto = dadosTempoPrevisto

                return dadosJson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Exclui um tempo previsto
const deletarTempoPrevisto = async function(idTempo) {

    let buscarDado = await getBuscarTempoPrevistoId(idTempo)

    if (buscarDado) {

        if (idTempo == '' || idTempo == undefined || isNaN(idTempo)) {
            return message.ERROR_INVALID_ID

        } else {
            let resulDados = await tempo_previstoDAO.deleteTempoPrevisto(idTempo)

            if (resulDados) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    } else {
        return message.ERROR_ID_NOT_FOUND
    }
}

//Retorna os tipos de atividades
const getTempoPrevisto = async function() {
    let dadosJson = {}

    let dadosTempoPrevisto = await tempo_previstoDAO.selectTempoPrevisto()

    if (dadosTempoPrevisto) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.tempo_previsto = dadosTempoPrevisto

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Retorna os tipos de atividades pelo id
const getBuscarTempoPrevistoId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosJson = {}

        let dadosTempoPrevisto = await tempo_previstoDAO.selectByIdTempoPrevisto(id)

        if (dadosTempoPrevisto) {
            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.tempo_previsto = dadosTempoPrevisto

            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Pesquisa um aluno pelo tempo
const getBuscarTempoPrevistoNome = async function(tempo) {
    let jsonNome = {}

    let dadosTempoPrevisto = await tempo_previstoDAO.selectByTempoPrevisto(tempo);

    if (dadosTempoPrevisto != null && dadosTempoPrevisto != undefined) {

        jsonNome.status = message.SUCCESS_REQUEST.status
        jsonNome.tempo_previsto = dadosTempoPrevisto

        return jsonNome
    } else {
        return false
    }

}

module.exports = {
    inserirTempoPrevisto,
    atualizarTempoPrevisto,
    deletarTempoPrevisto,
    getTempoPrevisto,
    getBuscarTempoPrevistoId,
    getBuscarTempoPrevistoNome
}