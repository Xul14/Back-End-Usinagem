/******************************************************************************
 * Objetivo: Responsável pela regra de negócio referente as funções dos alunos.
 * Data: 22/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import das mensagens de erro
var message = require('./modulo/config.js')

//Import do arquivo DAO para acessar dados do aluno no banco.
var alunoDAO = require('../model/DAO/alunoDAO.js')


//Insere um novo aluno
const inserirAluno = async function(dadosAluno) {

    if (dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 100 ||
        dadosAluno.email_institucional == '' || dadosAluno.email_institucional == undefined || dadosAluno.email_institucional.length > 255 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 150
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        let checkEmailAluno = await alunoDAO.selectAlunoByEmail(dadosAluno.email_institucional)

        if (checkEmailAluno) {
            return message.ERROR_INVALID_EMAIL

        } else {
            let resultDadosAluno = await alunoDAO.insertAluno(dadosAluno)

            if (resultDadosAluno) {
                return message.SUCCESS_CREATED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        }
    }
}

//Atualizar um aluno existente
const atualizarAluno = async function(dadosAluno, idAluno) {

    if (
        dadosAluno.nome == '' || dadosAluno.nome == undefined || dadosAluno.nome.length > 100 ||
        dadosAluno.email_institucional == '' || dadosAluno.email_institucional == undefined || dadosAluno.email_institucional.length > 255 ||
        dadosAluno.senha == '' || dadosAluno.senha == undefined || dadosAluno.senha.length > 150
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else if (idAluno == '' || idAluno == undefined || isNaN(idAluno)) {
        return message.ERROR_INVALID_ID

    } else {
        dadosAluno.id = idAluno

        let statusId = await alunoDAO.selectByIdAlunos(idAluno)

        if (statusId) {

            let resultDadosAluno = await alunoDAO.updateAluno(dadosAluno)

            if (resultDadosAluno) {
                let dadosAlunojson = {}

                dadosAlunojson.status = message.SUCCESS_UPDATED_ITEM.status
                dadosAlunojson.aluno = dadosAluno

                return dadosAlunojson

            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}

//Exclui um aluno
const deletarAluno = async function(idAluno) {

    let buscarAluno = await getBuscarAlunoId(idAluno)

    if (buscarAluno) {

        if (idAluno == "" || idAluno == undefined || isNaN(idAluno)) {

            return message.ERROR_INVALID_ID

        } else {

            let resultDadosAluno = await alunoDAO.deleteAluno(idAluno)

            if (resultDadosAluno) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }

    } else {
        return message.ERROR_ID_NOT_FOUND
    }


}

//Retorna a lista de todos os alunos
const getAlunos = async function() {
    let dadosAlunosJson = {};

    let dadosAluno = await alunoDAO.selectAllAlunos();

    if (dadosAluno) {

        dadosAlunosJson.status = message.SUCCESS_REQUEST.status
        dadosAlunosJson.alunos = dadosAluno;

        return dadosAlunosJson
    } else {
        return message.ERROR_NOT_FOUND
    }

}

//Pesquisa um aluno pelo id
const getBuscarAlunoId = async function(id) {

    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let alunosJsonId = {}

        let dadosAluno = await alunoDAO.selectByIdAlunos(id);

        if (dadosAluno) {
            alunosJsonId.status = message.SUCCESS_REQUEST.status
            alunosJsonId.aluno = dadosAluno;
            return alunosJsonId
        } else {
            return message.ERROR_NOT_FOUND
        }
    }

}

//Pesquisa um aluno pelo nome
const getBuscarAlunoNome = async function(nome) {
    let alunosJsonNome = {}

    let dadosAluno = await alunoDAO.selectByNameAlunos(nome);

    if (dadosAluno != null && dadosAluno != undefined && isNaN(dadosAluno)) {

        alunosJsonNome.status = message.SUCCESS_REQUEST.status
        alunosJsonNome.aluno = dadosAluno;
        return alunosJsonNome
    } else {
        return false
    }

}

//Retorna o aluno se a senha e email estiverem corretos
const getBuscarAlunosByEmailSenha = async function(email_institucional, senha) {

    if (
        email_institucional == '' || email_institucional == undefined || email_institucional.length > 255 ||
        senha == '' || senha == undefined || senha.length > 150
    ) {
        return message.ERROR_REQUIRED_FIELDS

    } else {

        let alunoJsonEmailSenha = {}

        let dadosAluno = await alunoDAO.authenticateAluno(email_institucional, senha)

        if (dadosAluno != null && dadosAluno != undefined && isNaN(dadosAluno)) {
            alunoJsonEmailSenha.status = message.SUCCESS_REQUEST.status
            alunoJsonEmailSenha.aluno = dadosAluno;
            return alunoJsonEmailSenha
        } else {
            return message.ERROR_INVALID_EMAIL_PASSWORD
        }
    }
}


module.exports = {
    inserirAluno,
    atualizarAluno,
    deletarAluno,
    getAlunos,
    getBuscarAlunoId,
    getBuscarAlunoNome,
    getBuscarAlunosByEmailSenha
}