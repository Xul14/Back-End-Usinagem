/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções.
 * Data: 12/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var avaliacaoDAO = require('../model/DAO/avaliacaoDAO.js')

//Insere um novo dado
const inserirAvaliacao = async function(dados) {
    if (
        dados.avaliacao_aluno == '' || dados.avaliacao_aluno == undefined || dados.avaliacao_aluno.length > 1 ||
        dados.obtido == '' || dados.obtido == undefined || dados.obtido.length > 45 ||
        dados.avaliacao_professor == '' || dados.avaliacao_professor == undefined || dados.avaliacao_professor.length > 1 ||
        dados.id_professor == '' || dados.id_professor == undefined || isNaN(dados.id_professor) ||
        dados.id_atividade_valor_desejado == '' || dados.id_atividade_valor_desejado == undefined || isNaN(dados.id_atividade_valor_desejado) ||
        dados.id_matricula == '' || dados.id_matricula == undefined || isNaN(dados.id_matricula)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDados = await avaliacaoDAO.insertAvaliacao(dados)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualizar um novo dado
const atualizarAvaliacao = async function(dados, id) {
    if (
        dados.avaliacao_aluno == '' || dados.avaliacao_aluno == undefined || dados.avaliacao_aluno.length > 1 ||
        dados.obtido == '' || dados.obtido == undefined || dados.obtido.length > 45 ||
        dados.avaliacao_professor == '' || dados.avaliacao_professor == undefined || dados.avaliacao_professor.length > 1 ||
        dados.id_professor == '' || dados.id_professor == undefined || isNaN(dados.id_professor) ||
        dados.id_atividade_valor_desejado == '' || dados.id_atividade_valor_desejado == undefined || isNaN(dados.id_atividade_valor_desejado) ||
        dados.id_matricula == '' || dados.id_matricula == undefined || isNaN(dados.id_matricula)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        dados.id = id

        let statusId = await avaliacaoDAO.selectIdAvaliacao(id)

        if (statusId) {

            let resultDados = await avaliacaoDAO.updateAvaliacao(dados)

            if (resultDados) {
                let dadosJson = {}

                dadosJson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosJson.avaliacao = dados

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
const deletarAvaliacao = async function(id) {

    let buscarDado = await getBuscarAvaliacaoId(id)

    if (buscarDado) {

        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID

        } else {
            let resultDados = await avaliacaoDAO.deleteAvaliacao(id)

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
const getAvaliacao = async function() {
    let dadosJson = {}

    let resultDados = await avaliacaoDAO.selectAllAvaliacao();

    if (resultDados) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.avaliacao = resultDados;

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Pesquisa um dado pelo id
const getBuscarAvaliacaoId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJson = {}

        let resultDados = await avaliacaoDAO.selectIdAvaliacao(id);

        if (resultDados) {
            dadosJson.status = message.SUCCESS_REQUEST.status
            dadosJson.avaliacao = resultDados;
            return dadosJson
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

module.exports = {
    inserirAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao,
    getAvaliacao,
    getBuscarAvaliacaoId
}