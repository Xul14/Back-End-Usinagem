/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao criterio.
 * Data: 02/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no banco.
var criterioDAo = require('../model/DAO/criterioDAO.js')

//Insere um novo criterio 
const inserirCriterio = async function(dadosCriterio) {

    if (dadosCriterio.descricao == '' || dadosCriterio.descricao == undefined) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDados = await criterioDAo.insertCriterio(dadosCriterio)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualizar um criterio 
const atualizarCriterio = async function(dadosCriterio, id) {

    if (dadosCriterio.descricao == '' || dadosCriterio.descricao == undefined) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosCriterio.id = id

        let statusId = await criterioDAo.selectCriterioById(id)

        if (statusId) {

            let resultDados = await criterioDAo.updateCriterio(dadosCriterio)

            if (resultDados) {
                let jsonDados = {}

                jsonDados.status = message.SUCCESS_UPDATED_ITEM.status
                jsonDados.criterio = dadosCriterio

                return jsonDados

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Deletar um criterio 
const deletarCriterio = async function(id) {
    let buscarCriterio = await getBuscarCriterioId(id)

    if (buscarCriterio) {

        if (id == '' || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID

        } else {
            let resultDados = await criterioDAo.deleteCriterio(id)

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

//Retorna uma lista de criterios 
const getBuscarCriterios = async function() {
    let dadosJson = {}

    let dadosCriterio = await criterioDAo.selectAllCriterios()

    if (dadosCriterio) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.criterios = dadosCriterio

        return dadosJson

    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Retorna um criterio pelo id
const getBuscarCriterioId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        let dadosJson = {}

        let dadosCriterio = await criterioDAo.selectCriterioById(id)

        if (dadosCriterio) {

            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.criterios = dadosCriterio

            return dadosJson

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Pesquisa um criterio pela descricao
const getBuscarCriterioDescricao = async function(descricao) {
    let descricaoJson = {}

    let dadosCriterio = await criterioDAo.selectCriterioByDescricao(descricao);

    if (dadosCriterio != null && dadosCriterio != undefined && isNaN(dadosCriterio)) {

        descricaoJson.status = message.SUCCESS_REQUEST.status
        descricaoJson.criterio = dadosCriterio;
        return descricaoJson

    } else {
        return false
    }

}

module.exports = {
    inserirCriterio,
    atualizarCriterio,
    deletarCriterio,
    getBuscarCriterios,
    getBuscarCriterioId,
    getBuscarCriterioDescricao
}