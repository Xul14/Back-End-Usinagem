/*
 * Objetivo: Implementação do JWT no projeto
 * data: 06/06
 * versão: 1.0
 * autor: Nicole Souza
 */

// import
const jwt = require('jsonwebtoken')

// chave secreta para a criação do JWT
const SECRET = 'm1c2n3c4'

// tempo para validar o token do jwt (segundos)
const EXPIRES = 600

// criação do jwt (retorna um TOKEN)
const createJWT = async function (payLoad){
    // faz a criação - gera token
        // payload - identificação do usuario autenticado
        // SECRET - chave secreta
        // expiresIn - tempo de experiração do token
    const token = jwt.sign({userID: payLoad}, SECRET, {expiresIn: EXPIRES})
    return token
}

// validação de autenticidade do jwt (recebe o token para validação)
// quando a rota é solicitada teremos que mandar ela no cabeçalho da requisição e a função irá valida-lo
const validadeJWT = async function (token){

    let status

    // err - erro
    // decode - token decodificado (é util para pegar mais informações do token)
    // valida a autenticidade do token
    jwt.verify(token, SECRET, async function(err, decode){

        if(err)
            status = false
        else 
            status = true

    })
    console.log(status)
    return status

}

module.exports = {
    createJWT,
    validadeJWT
}