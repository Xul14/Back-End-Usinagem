/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao tipo de atividade.
 * Data: 01/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var tipo_atividadeDAO = require('../model/DAO/tipo_atividadeDAO.js')

//Inserir um novo tipo de atividade
const inserirTipoAtividade = async function(dadosTipoAtividade) {

    if (dadosTipoAtividade.nome == '' || dadosTipoAtividade.nome == undefined || dadosTipoAtividade.nome.length > 15) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDados = await tipo_atividadeDAO.insertTipoAtividade(dadosTipoAtividade)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualiza um tipo de atividade
const atualizarTipoAtividade = async function(dadosTipoAtividade, id) {
    if (dadosTipoAtividade.nome == '' || dadosTipoAtividade.nome == undefined || dadosTipoAtividade.nome.length > 15) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosTipoAtividade.id = id

        let statusId = await tipo_atividadeDAO.selectByIdTipoAtividade(id)

        if (statusId) {

            let resultDados = await tipo_atividadeDAO.updateTipoAtividade(dadosTipoAtividade)

            if (resultDados) {
                let dadosJson = {}

                dadosJson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosJson.tipo_atividade = dadosTipoAtividade

                return dadosJson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Exclui um tipo de atividade
const deletarTipoAtividade = async function(idTipoAtividade) {

    let buscarTipoAtividade = await getBuscarTipoAtividadeId(idTipoAtividade)

    if (buscarTipoAtividade) {

        if (idTipoAtividade == '' || idTipoAtividade == undefined || isNaN(idTipoAtividade)) {
            return message.ERROR_INVALID_ID

        } else {
            let resulDados = await tipo_atividadeDAO.deleteTipoAtividade(idTipoAtividade)

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
const getTipoAtividade = async function() {
    let dadosJson = {}

    let dadosTipoAtividade = await tipo_atividadeDAO.selectTipoAtividade()

    if (dadosTipoAtividade) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.tipo_atividade = dadosTipoAtividade

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Retorna os tipos de atividades pelo id
const getBuscarTipoAtividadeId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosJson = {}

        let dadosTipoAtividade = await tipo_atividadeDAO.selectByIdTipoAtividade(id)

        if (dadosTipoAtividade) {
            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.tipo_atividade = dadosTipoAtividade

            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Pesquisa um aluno pelo nome
const getBuscarTipoAtividadeNome = async function(nome) {
    let jsonNome = {}

    let dadosTipoAtividade = await tipo_atividadeDAO.selectByNameTipoAtividade(nome);

    if (dadosTipoAtividade != null && dadosTipoAtividade != undefined && isNaN(dadosTipoAtividade)) {

        jsonNome.status = message.SUCCESS_REQUEST.status
        jsonNome.tipo_atividade = dadosTipoAtividade

        return jsonNome
    } else {
        return false
    }

}

module.exports = {
    inserirTipoAtividade,
    atualizarTipoAtividade,
    deletarTipoAtividade,
    getTipoAtividade,
    getBuscarTipoAtividadeId,
    getBuscarTipoAtividadeNome
}