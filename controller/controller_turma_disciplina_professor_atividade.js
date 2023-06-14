/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções.
 * Data: 09/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var turmaDisciplinaProfessorAtividadeDAO = require('../model/DAO/turmaDisciplinaProfessorAtividadeDAO.js')

//Insere um novo dado
const inserirTurmaDisciplinaProfessorAtividade = async function (dados) {
    if (
        dados.id_atividade == '' || dados.id_atividade == undefined || isNaN(dados.id_atividade) ||
        dados.id_turma_disciplina_professor == '' || dados.id_turma_disciplina_professor == undefined || isNaN(dados.id_turma_disciplina_professor)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {
        let resultDados = await turmaDisciplinaProfessorAtividadeDAO.insertTurmaDisciplinaProfessorAtividade(dados)

        if (resultDados) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Atualizar um novo dado
const atualizarTurmaDisciplinaProfessorAtividade = async function (dados, id) {
    if (
        dados.id_atividade == '' || dados.id_atividade == undefined || isNaN(dados.id_atividade) ||
        dados.id_turma_disciplina_professor == '' || dados.id_turma_disciplina_professor == undefined || isNaN(dados.id_turma_disciplina_professor)
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {
        dados.id = id

        let statusId = await turmaDisciplinaProfessorAtividadeDAO.selectIdTurmaDisciplinaProfessorAtividade(id)

        if (statusId) {

            let resultDados = await turmaDisciplinaProfessorAtividadeDAO.updateTurmaDisciplinaProfessorAtividade(dados)

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
const deletarTurmaDisciplinaProfessorAtividade = async function (id) {

    let buscarDado = await getBuscarTurmaDisciplinaProfessorAtividadeId(id)

    if (buscarDado) {

        if (id == "" || id == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID

        } else {
            let resultDados = await turmaDisciplinaProfessorAtividadeDAO.deleteTurmaDisciplinaProfessorAtividade(id)

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
const getTurmaDisciplinaProfessorAtividade = async function () {
    let dadosJson = {}

    let resultDados = await turmaDisciplinaProfessorAtividadeDAO.selectAllTurmaDisciplinaProfessorAtividade();

    if (resultDados) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.result = resultDados;

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }
}

//Pesquisa um dado pelo id
const getBuscarTurmaDisciplinaProfessorAtividadeId = async function (id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosJson = {}

        let resultDados = await turmaDisciplinaProfessorAtividadeDAO.selectIdTurmaDisciplinaProfessorAtividade(id);

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
    inserirTurmaDisciplinaProfessorAtividade,
    atualizarTurmaDisciplinaProfessorAtividade,
    deletarTurmaDisciplinaProfessorAtividade,
    getTurmaDisciplinaProfessorAtividade,
    getBuscarTurmaDisciplinaProfessorAtividadeId
}