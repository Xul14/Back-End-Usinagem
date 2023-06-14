/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente a tabela intermediaria de matricula, atividade e registro de tempo.
 * Data: 11/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var matriculaAtividadeRegistroTempoDAO = require('../model/DAO/matriculaAtividadeRegistroTempoDAO.js')

//Insere dados na tabela
const inserirMatriculaAtividadeRegistroTempo = async function (dados) {
  
    if (
        dados.id_registro_tempo == '' || dados.id_registro_tempo == undefined || isNaN(dados.id_registro_tempo) ||
        dados.id_atividade == '' || dados.id_atividade == undefined || isNaN(dados.id_atividade) ||
        dados.id_matricula == '' || dados.id_matricula == undefined || isNaN(dados.id_matricula)

    ) {
        console.log(dados.id_registro_tempo);
        console.log(dados.id_atividade);
        console.log(dados.id_matricula);
        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosTabela = await matriculaAtividadeRegistroTempoDAO.insertMatriculaAtividadeRegistroTempo(dados);

        if (dadosTabela) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Atualiza dados da tabela
const AtualizarMatriculaAtividadeRegistroTempo = async function (dados, id) {

    if (
        dados.id_registro_tempo == '' || dados.id_registro_tempo == undefined || isNaN(dados.id_registro_tempo) ||
        dados.id_atividade == '' || dados.id_atividade == undefined || isNaN(dados.id_atividade) ||
        dados.id_matricula == '' || dados.id_matricula == undefined || isNaN(dados.id_matricula)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {

        dados.id = id

        let statusId = await matriculaAtividadeRegistroTempoDAO.selectIdMatriculaAtividadeRegistroTempo(id)

        if (statusId) {

            let dadosTabela = await matriculaAtividadeRegistroTempoDAO.updateMatriculaAtividadeRegistroTempo(dados);

            if (dadosTabela) {
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

//Exclui um registro
const deletarMatriculaAtividadeRegistroTempo = async function (id) {

    let buscarDados = await getBuscarIdMatriculaAtividadeRegistroTempo(id)

    if (buscarDados) {

        if (id == "" || id == undefined || isNaN(id)) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDados = await matriculaAtividadeRegistroTempoDAO.deleteMatriculaAtividadeRegistroTempo(id)

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

//Retorna a lista de tudo da tabela
const getMatriculaAtividadeRegistroTempo = async function () {
    let dadosJson = {};

    let dadosTabela = await matriculaAtividadeRegistroTempoDAO.selectAllMatriculaAtividadeRegistroTempo();

    if (dadosTabela) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.result = dadosTabela;

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Retorna a lista de tudo da tabela filtrando pelo id
const getBuscarIdMatriculaAtividadeRegistroTempo = async function (id) {

    if(id == '' || id == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID

    }else{
        let dadosJson = {}

        let dadosTabela = await matriculaAtividadeRegistroTempoDAO.selectIdMatriculaAtividadeRegistroTempo(id);
    
        if (dadosTabela) {
    
            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.result = dadosTabela
            return dadosJson

        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

module.exports = {
    inserirMatriculaAtividadeRegistroTempo,
    AtualizarMatriculaAtividadeRegistroTempo,
    deletarMatriculaAtividadeRegistroTempo,
    getMatriculaAtividadeRegistroTempo,
    getBuscarIdMatriculaAtividadeRegistroTempo
}