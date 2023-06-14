/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções do atividade.
 * Data: 08/06/2023
 * Autor: Claudio
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
let message = require('./modulo/config.js')

//Import da atividadeDAO
let atividadeDAO = require('../model/DAO/atividadeDAO.js')

const getAtividade = async() => {
    let dadosJSON = {}

    let result = await atividadeDAO.selectAtividade()
    if (result) {
        dadosJSON.status = message.SUCCESS_REQUEST.status
        dadosJSON.atividade = result
        return dadosJSON
    } else {

        return message.ERROR_NOT_FOUND
    }
}

const getAtividadeById = async(id) => {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJSON = {};

        let result = await atividadeDAO.selectAtividadeById(id)

        if (result) {

            dadosJSON.status = message.SUCCESS_REQUEST.status
            dadosJSON.atividade = result
            return dadosJSON
        } else {

            return message.ERROR_NOT_FOUND
        }

    }
}

const inserirAtividade = async(dadosBody) => {
    if (
        dadosBody.nome == '' || dadosBody.nome == undefined || dadosBody.nome.length > 45 ||
        dadosBody.numero == undefined || isNaN(dadosBody.numero) ||
        dadosBody.id_tipo_atividade == undefined || isNaN(dadosBody.id_tipo_atividade) ||
        dadosBody.id_tempo_previsto == undefined || isNaN(dadosBody.id_tempo_previsto)
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {

        let result = await atividadeDAO.insertAtividade(dadosBody)

        if (result) {

            let idNovo = await atividadeDAO.selectLastID()
            let dadoJSON = {};

            dadoJSON.status = message.SUCCESS_CREATED_ITEM.status
            dadoJSON.atividade = idNovo

            return dadoJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const atualizarAtividade = async(dadosBody, id) => {
    if (
        dadosBody.nome == '' || dadosBody.nome == undefined || dadosBody.nome.length > 45 ||
        dadosBody.numero == undefined || isNaN(dadosBody.numero) ||
        dadosBody.id_tipo_atividade == undefined || isNaN(dadosBody.id_tipo_atividade) ||
        dadosBody.id_tempo_previsto == undefined || isNaN(dadosBody.id_tempo_previsto)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {

        dadosBody.id = id

        let checagemAtividade = await atividadeDAO.selectAtividadeById(id)

        if (checagemAtividade) {
            let result = await atividadeDAO.updateAtividade(dadosBody)

            if (result) {
                let dadosJSON = {}

                dadosJSON.status = message.SUCCESS_CREATED_ITEM.status
                dadosJSON.atividade = dadosBody
                console.log(dadosBody.nome);
                return dadosJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

const deletarAtividade = async(id) => {
    let result = await getAtividadeById(id)

    if (result.status == 200) {
        let resultDados = await atividadeDAO.deleteAtividade(id)
        if (resultDados) {
            return message.SUCCESS_DELETED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }

    } else {
        return result
    }
}

module.exports = {
    getAtividade,
    getAtividadeById,
    inserirAtividade,
    atualizarAtividade,
    deletarAtividade
}