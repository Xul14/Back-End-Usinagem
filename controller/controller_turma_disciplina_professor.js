/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente a tabela intermediaria de turma, disciplina, professor.
 * Data: 02/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados no banco.
var turmaDisciplinaProfessorDAO = require('../model/DAO/turmaDisciplinaProfessorDAO.js')

//Insere dados na tabela
const inserirTurmaDisciplinaProfessor = async function (dados) {

    if (
        dados.id_disciplina == '' || dados.id_disciplina == undefined || isNaN(dados.id_disciplina) ||
        dados.id_turma == '' || dados.id_turma == undefined || isNaN(dados.id_turma) ||
        dados.id_professor == '' || dados.id_professor == undefined || isNaN(dados.id_professor)

    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        let dadosTabela = await turmaDisciplinaProfessorDAO.insertTurmaDisciplinaProfessor(dados);

        if (dadosTabela) {
            return message.SUCCESS_CREATED_ITEM
        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

//Atualiza dados da tabela
const AtualizarTurmaDisciplinaProfessor = async function (dados, id) {

    if (
        dados.id_disciplina == '' || dados.id_disciplina == undefined || isNaN(dados.id_disciplina) ||
        dados.id_turma == '' || dados.id_turma == undefined || isNaN(dados.id_turma) ||
        dados.id_professor == '' || dados.id_professor == undefined || isNaN(dados.id_professor)

    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID

    } else {

        dados.id = id

        let statusId = await turmaDisciplinaProfessorDAO.selectAByIdTurmaDisciplinaProfessor(id)

        if (statusId) {

            let dadosTabela = await turmaDisciplinaProfessorDAO.updateTurmaDisciplinaProfessor(dados);

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
const deletarTurmaDisciplinaProfessor = async function (id) {

    let buscarDados = await getBuscarIdTurmaDisciplinaProfessor(id)

    if (buscarDados) {

        if (id == "" || id == undefined || isNaN(id)) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDados = await turmaDisciplinaProfessorDAO.deleteTurmaDisciplinaProfessor(id)

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
const getTurmaDisciplinaProfessor = async function () {
    let dadosJson = {};

    let dadosTabela = await turmaDisciplinaProfessorDAO.selectAllTurmaDisciplinaProfessor();

    if (dadosTabela) {

        dadosJson.status = message.SUCCESS_REQUEST.status
        dadosJson.result = dadosTabela;

        return dadosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Retorna a lista de tudo da tabela filtrando pelo id
const getBuscarIdTurmaDisciplinaProfessor = async function (id) {

    if(id == '' || id == undefined || isNaN(id)){
        return message.ERROR_INVALID_ID

    }else{
        let dadosJson = {}

        let dadosTabela = await turmaDisciplinaProfessorDAO.selectAByIdTurmaDisciplinaProfessor(id);
    
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
    inserirTurmaDisciplinaProfessor,
    AtualizarTurmaDisciplinaProfessor,
    deletarTurmaDisciplinaProfessor,
    getTurmaDisciplinaProfessor,
    getBuscarIdTurmaDisciplinaProfessor
}