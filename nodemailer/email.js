/*
 * Objetivo: Implementação do nodemailer para envio de email referente ao esquecimento da senha
 * data: 08/06
 * versão: 1.0
 * autor: Nicole Souza
 */

const { response } = require('express')
const nodemailer = require('nodemailer')

const sendNewPassowrdEmail = async function (email, name, token){
    
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'desenvolvedoressenaijandira@gmail.com' ,
            pass:'amfuhxtcrwfkneso'
        }
    })

    transport.sendMail({
        from: 'desenvolvedores SENAI <desenvolvedoressenaijandira@gmail.com>',
        to: `${email}`,
        subject: 'Alteração da senha',
        html: `<h1>Olá ${name}</h1>
                <span>Para a troca de senha forneça o token de acesso para validação:</span>
                <p>${token}</p>
                <p>Esse token é valido por apenas 10 minutos</p>
                <p>Caso não tenha sido redirecionado corretamente acesse <a href="https://front-end-forgot-password.vercel.app/">pagina de solicitação de troca de senha</a></p>`,
        text: `Olá! Para troca da senha é necessario fornecer o seguinte token de acesso:\n
                ${token}`
    }).then(() => console.log('enviado')).catch((err) => console.log('Error ao enviar' + err))
}


module.exports = {
    sendNewPassowrdEmail
}