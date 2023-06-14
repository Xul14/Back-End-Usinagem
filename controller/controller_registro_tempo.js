/*
 * Objetivo: responsavel pela regras de negocio do registro de tempo e comunição com banco
 * Data: 10/06/2023
 * Autora: Nicole Souza Santos
 * Versão: 1.0
 */

var registroTempoDAO = require('../model/DAO/registro_tempoDAO.js')
var message = require('./modulo/config.js')

const getTimeRecords = async function (){

    let dateTimeRecordsJSON = {}

    let dateTimeRecord = await registroTempoDAO.selectAllTimeRecord()

    if(dateTimeRecord){
        dateTimeRecordsJSON.status = message.SUCCESS_REQUEST.status
        dateTimeRecordsJSON.quantidade = dateTimeRecord.lenght
        dateTimeRecordsJSON.registrosDeTempo = dateTimeRecord
        
        return dateTimeRecordsJSON
    
    } else {
        return message.ERROR_NOT_FOUND
    }

}

const selectedTimeRecordrByIdInDb = async function(idTimeRecord) {
    if(idTimeRecord == '' || idTimeRecord == undefined || isNaN(idTimeRecord)){
        return message.ERROR_INVALID_ID
    } else {
        let dateTimeRecordJSON = {}
        
        let dateTimeRecord = await registroTempoDAO.selectTimerRecordById(idTimeRecord)

        if(dateTimeRecord){

            dateTimeRecordJSON.status = message.SUCCESS_REQUEST.status
            dateTimeRecordJSON.quantidade = dateTimeRecord.length
            dateTimeRecordJSON.registro_tempo = dateTimeRecord

            return dateTimeRecordJSON

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}

const insertTimeRecordInDb = async function (dateTimer){
    if(dateTimer.horario_inicio == '' || dateTimer.horario_inicio == undefined || dateTimer.horario_inicio.length > 5 
        || dateTimer.horario_termino == '' || dateTimer.horario_termino == undefined || dateTimer.horario_termino.length > 5
        || dateTimer.desconto == '' || dateTimer.desconto == undefined || dateTimer.desconto.length > 5
        || dateTimer.data_registro == '' || dateTimer.data_registro == undefined || dateTimer.data_registro.length > 10){
        
            return message.ERROR_REQUIRED_FIELDS

    } else {

        let startWork = dateTimer.horario_inicio
        let finishWork = dateTimer.horario_termino
        let discountWork = dateTimer.desconto

            let liquido = await registroTempoDAO.calcNetValue(finishWork, startWork, discountWork)

            if(liquido){

                dateTimer.liquido = liquido[0].liquido
                
                let dateWeb = dateTimer.data_registro

                let newDateFormatInDb = await registroTempoDAO.formatDateInDb(dateWeb)

                if(newDateFormatInDb){

                    dateTimer.data_registro = newDateFormatInDb[0].data_universal_db

                    let dateTimeRecord = await registroTempoDAO.insertTimeRecord(dateTimer)

                    if(dateTimeRecord){
    
                        let newTimeRecord = await registroTempoDAO.selectLastIdTimeRecord()
    
                        let dateTimeRecordJSON = {}
    
                        dateTimeRecordJSON.status = message.SUCCESS_CREATED_ITEM.status
                        dateTimeRecordJSON.tempoRegistro = newTimeRecord
                        
                        return dateTimeRecordJSON
    
                    } else {
                        return message.ERROR_INTERNAL_SERVER
                    }

                } else {
                    return message.ERROR_INTERNAL_SERVER
                }

            } else {
                return message.ERROR_INTERNAL_SERVER
            }
    }
}

const updateTimerRecordInDb = async function (dateTimer, idTimeRecord){
    if(dateTimer.horario_inicio == '' || dateTimer.horario_inicio == undefined || dateTimer.horario_inicio.length > 5 
    || dateTimer.horario_termino == '' || dateTimer.horario_termino == undefined || dateTimer.horario_termino.length > 5
    || dateTimer.desconto == '' || dateTimer.desconto == undefined || dateTimer.desconto.length > 5
    || dateTimer.data_registro == '' || dateTimer.data_registro == undefined || dateTimer.data_registro.length > 10
    || dateTimer.liquido == '' || dateTimer.liquido == undefined || dateTimer.liquido.length > 5){
    
        return message.ERROR_REQUIRED_FIELDS

    } else if(idTimeRecord == '' || idTimeRecord == undefined || isNaN(idTimeRecord)){

        return message.ERROR_INVALID_ID

    } else {

        let statusTimeRecordId = await registroTempoDAO.selectTimerRecordById(idTimeRecord)

        if(statusTimeRecordId){

            dateTimer.id = idTimeRecord
            let startWork = dateTimer.horario_inicio
            let finishWork = dateTimer.horario_termino
            let discountWork = dateTimer.desconto

            let liquido = await registroTempoDAO.calcNetValue(finishWork, startWork, discountWork)

            if(liquido){

                dateTimer.liquido = liquido[0].liquido
                
                let dateWeb = dateTimer.data_registro

                let newDateFormatInDb = await registroTempoDAO.formatDateInDb(dateWeb)
                
                if(newDateFormatInDb){

                    dateTimer.data_registro = newDateFormatInDb[0].data_universal_db
                  
                    let resulStatusTimeRecord = await registroTempoDAO.updateTimeRecord(dateTimer)

                    if(resulStatusTimeRecord){
                        let dateTimeRecordJSON = {}
        
                        dateTimeRecordJSON.status = message.SUCCESS_UPDATED_ITEM.status
                        dateTimeRecordJSON.RegistroTempo = dateTimer
        
                        return dateTimeRecordJSON
                    } else {
                        return message.ERROR_INTERNAL_SERVER
                    }

                } else {
                    return message.ERROR_INTERNAL_SERVER
                }

            } else {
                return message.ERROR_INTERNAL_SERVER
            }


        } else {
            return message.ERROR_NOT_FOUND
        }

    }
}

const deleteTimeRecordInDb = async function (idTimeRecord){

    if(idTimeRecord == '' || idTimeRecord == undefined || isNaN(idTimeRecord)){
        return message.ERROR_INVALID_ID
    } else {
        let statusTimeRecordId = await registroTempoDAO.selectTimerRecordById(idTimeRecord)

        if(statusTimeRecordId){
            let resultStatus = await registroTempoDAO.deleteTimeRecord(idTimeRecord)

            if(resultStatus)
                return message.SUCCESS_DELETED_ITEM
            else 
                return message.ERROR_INTERNAL_SERVER

    } else {
        return message.ERROR_NOT_FOUND
    }

}

}

module.exports = {
    getTimeRecords,
    insertTimeRecordInDb,
    deleteTimeRecordInDb,
    selectedTimeRecordrByIdInDb,
    updateTimerRecordInDb
}