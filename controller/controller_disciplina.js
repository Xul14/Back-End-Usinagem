/*
- Objetivo: Planejar as regras do crud referente a disciplina
- Data: 22/05/2023
- Autor: Claudio Sousa
- Versão: 1.0 
*/
//import dao da disciplina
const disciplinaDAO = require('../model/DAO/disciplinaDAO.js');

//import mensagens
const config = require('../controller/modulo/config.js');

const getDisciplinas = async () => {
    let dadosDisciplinaJSON = {};

    let dadosDisciplina = await disciplinaDAO.getAllDisciplinas();

    if (dadosDisciplina) {
        dadosDisciplinaJSON.status = config.SUCCESS_REQUEST.status
        dadosDisciplinaJSON.disciplinas = dadosDisciplina
        return dadosDisciplinaJSON
    } else {
        return config.ERROR_REGISTER_NOT_FOUND
    }
}

const getDisciplinaId = async (id) => {
    let dadosDisciplinaJSON = {};

    if (id == '' || id == undefined || isNaN(id)) {
        return config.ERROR_INVALID_ID
    } else {
        let dadosDisciplina = await disciplinaDAO.selectDisciplinaById(id)

        if (dadosDisciplina) {
            dadosDisciplinaJSON.status = config.SUCCESS_DELETED_ITEM.status
            dadosDisciplinaJSON.disciplina = dadosDisciplina
            return dadosDisciplinaJSON

        } else {
            return config.ERROR_REGISTER_NOT_FOUND
        }

    }
}

const inserirDisciplina = async (dadosDisciplina) => {
    if (dadosDisciplina.nome == '' || dadosDisciplina.nome == undefined || dadosDisciplina.nome.length > 45) {
        return config.ERROR_REQUIRED_FIELDS
    } else {
        let resultDados = await disciplinaDAO.insertDisciplina(dadosDisciplina)
        if (resultDados) {
            let novoId = await disciplinaDAO.selectLastID();
            let dadoJSON = {};
            dadoJSON.status = config.SUCCESS_CREATED_ITEM.status
            dadoJSON.disciplina = novoId
            return dadoJSON
        } else {
            return config.ERROR_INTERNAL_SERVER
        }

    }
}

const atualizarDisciplina = async (dadosDisciplina, idDisciplina) => {

    if (dadosDisciplina.nome == '' || dadosDisciplina.nome == undefined || dadosDisciplina.nome.length > 45) {
        return config.ERROR_REQUIRED_FIELDS

    } else if(idDisciplina == '' || idDisciplina == undefined || isNaN(idDisciplina)){
        return config.ERROR_INVALID_ID

    }else {
        dadosDisciplina.id = idDisciplina

        let novaDisciplina = await disciplinaDAO.selectDisciplinaById(idDisciplina)

        if (novaDisciplina) {

            let resultDadosDisciplina = await disciplinaDAO.updateDisciplina(dadosDisciplina)

            if (resultDadosDisciplina) {

                let dadosDisciplinaJSON = {}

                dadosDisciplinaJSON.status = config.SUCCESS_CREATED_ITEM.status
                dadosDisciplinaJSON.disciplina = dadosDisciplina

                return dadosDisciplinaJSON
            } else {
                return config.ERROR_INTERNAL_SERVER
            }

        } else {
            return config.ERROR_NOT_FOUND
        }

    }
}

const deletarDisciplina = async (id) => {

    let result = await getDisciplinaId(id)

    if (result.status == 200) {
        let resultDados = await disciplinaDAO.deleteDisciplina(id)
        if (resultDados) {
            return config.SUCCESS_DELETED_ITEM
        } else {
            return config.ERROR_INTERNAL_SERVER
        }
    } else {
        return result
    }
}

module.exports = {
    getDisciplinas,
    getDisciplinaId,
    inserirDisciplina,
    atualizarDisciplina,
    deletarDisciplina
}