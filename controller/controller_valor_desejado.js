/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções dos valores desejados.
 * Data: 08/06/2023
 * Autor: Claudio
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
let message = require('./modulo/config.js')

//Import do valor desejado DAO
let valorDesejadoDAO = require('../model/DAO/valor_desejadoDAO.js') 

const getValorDesejado = async () => {
    let dadosValorDesejadoJSON = {};

    let resultValorDesejado = await valorDesejadoDAO.selectAllValorDesejado()

    if(resultValorDesejado){

        dadosValorDesejadoJSON.status = message.SUCCESS_REQUEST.status
        dadosValorDesejadoJSON.valor_desejado = resultValorDesejado
        return dadosValorDesejadoJSON
    }else{

        return message.ERROR_NOT_FOUND
    }
}

const getValorDesejadoByID = async (id) => {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    }else{

    let dadosValorDesejadoJSON = {};

    let resultValorDesejado = await valorDesejadoDAO.selectValorDesejadoByID(id)

    if(resultValorDesejado){

        dadosValorDesejadoJSON.status = message.SUCCESS_REQUEST.status
        dadosValorDesejadoJSON.valor_desejado = resultValorDesejado
        return dadosValorDesejadoJSON
    }else{

        return message.ERROR_NOT_FOUND
    }

    }
}

const inserirValorDesejado = async (dadosBody) => {
     if(
        dadosBody.valor_desejado == '' || dadosBody.valor_desejado == undefined ||  dadosBody.valor_desejado.length > 45 ||
        dadosBody.id_criterio == '' || dadosBody.id_criterio == undefined ||  isNaN(dadosBody.id_criterio)
     ){
        return message.ERROR_REQUIRED_FIELDS
     }else{
        let resultValorDesejado = await valorDesejadoDAO.insertValorDesejado(dadosBody)

        if(resultValorDesejado){
            let novoId = await valorDesejadoDAO.selectLastID();
            let dadoJSON = {};
            dadoJSON.status = message.SUCCESS_CREATED_ITEM.status
            dadoJSON.valor_desejado = novoId
            return dadoJSON
        }else {
            return message.ERROR_INTERNAL_SERVER
        }
    
     }
}

const atualizarValorDesejado = async  (dadosBody, id) => {
    if(
        dadosBody.valor_desejado == '' || dadosBody.valor_desejado == undefined ||  dadosBody.valor_desejado.length > 45 ||
        dadosBody.id_criterio == '' || dadosBody.id_criterio == undefined ||  isNaN(dadosBody.id_criterio)
     ){
        return message.ERROR_REQUIRED_FIELDS
     }else if(id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    }else{
        dadosBody.id = id
        let checagemValorDesejado = await valorDesejadoDAO.selectValorDesejadoByID(id)
        if(checagemValorDesejado){
            let result = await valorDesejadoDAO.updateValorDesejado(dadosBody)

            if(result){
                let dadosJSON = {}
                dadosJSON.status = message.SUCCESS_CREATED_ITEM.status
                dadosJSON.valor_desejado = dadosBody
                return dadosJSON
            }else{
                return message.ERROR_INTERNAL_SERVER
            }

        }else{
            return message.ERROR_NOT_FOUND
        }
    }
}

const deletarValorDesejado = async(id) => {
    let result = await getValorDesejadoByID(id)

    if(result.status == 200){
        let resultDados = await valorDesejadoDAO.deleteValorDesejado(id)
        if(resultDados){
            return message.SUCCESS_DELETED_ITEM
        }else{
            return message.ERROR_INTERNAL_SERVER
        }

    }else{
        return result
    }

}

module.exports = {
    getValorDesejado,
    getValorDesejadoByID,
    inserirValorDesejado,
    atualizarValorDesejado,
    deletarValorDesejado
}