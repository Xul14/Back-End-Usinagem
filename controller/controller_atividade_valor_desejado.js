/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções.
 * Data: 09/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var atividadeValorDesejadoDAO = require('../model/DAO/atividadeValorDesejadoDAO.js')

//Insere um novo dado
const inserirAtividadeValorDesejado = async function (dados) {
    if (
        dados.id_atividade == '' || dados.id_atividade == undefined || isNaN(dados.id_atividade) ||
        dados.id_valor_desejado == '' || dados.id_valor_desejado == undefined || isNaN(dados.id_valor_desejado)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDados = await atividadeValorDesejadoDAO.insertAtividadeValorDesejado(dados)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualizar um novo dado
const atualizarAtividadeValorDesejado = async function (dados, id) {
    if (
        dados.id_atividade == '' || dados.id_atividade == undefined || isNaN(dados.id_atividade) ||
        dados.id_valor_desejado == '' || dados.id_valor_desejado == undefined || isNaN(dados.id_valor_desejado)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        dados.id = id

        let statusId = await atividadeValorDesejadoDAO.selectIdAtividadeValorDesejado(id)

        if (statusId) {

            let resultDados = await atividadeValorDesejadoDAO.updateAtividadeValorDesejado(dados)

            if (resultDados) {
                let dadosJson = {}

                dadosJson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosJson.result = dados

                return dadosJson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Exclui um dado
const deletarAtividadeValorDesejado = async function (id) {

    let buscarDado = await getBuscarAtividadeValorDesejadoId(id)

    if (buscarDado) {

        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID

        } else {
            let resultDados = await atividadeValorDesejadoDAO.deleteAtividadeValorDesejado(id)

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

//Retorna a lista de todos os dados
const getAtividadeValorDesejado = async function () {
    let dadosJson = {}

    let resultDados = await atividadeValorDesejadoDAO.selectAllAtividadeValorDesejado();

    if (resultDados) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.result = resultDados;

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Pesquisa um dado pelo id
const getBuscarAtividadeValorDesejadoId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJson = {}

        let resultDados = await atividadeValorDesejadoDAO.selectIdAtividadeValorDesejado(id);

        if (resultDados) {
            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.result = resultDados;
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAtividadeValorDesejado,
    atualizarAtividadeValorDesejado,
    deletarAtividadeValorDesejado,
    getAtividadeValorDesejado,
    getBuscarAtividadeValorDesejadoId
}