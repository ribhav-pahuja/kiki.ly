const { URLs } = require('../../models');
const { int2radix64, radix642int } = require('../services/radix64-service');

async function createRandomShortCode(link) {

    const genCode = parseInt(Math.random() * 999999999999)
    const exists = await URLs.findOne({
        where: {
            id: genCode
        }
    })

    if (exists) {
        createRandomShortCode(link)
    }

    try {
        await URLs.create({
            id: genCode,
            code: int2radix64(genCode),
            link: link
        })
    } catch (Exception e) {
//
    }



}

async function createCustomShortCode(code, link) {
    // TODO: validation code
    if(code.length>7){
        throw new Error('custom code provided should be smaller than 7 characters');
    }
    const id = radix642int(code)
    if(Number.isNaN(id)){
        throw new Error('Invalid custom shortcode. Shortcode can only contain a-z,A-Z,0-9,_,-')
    }

    const exists = await URLs.findOne({
        where: {
            id: id
        }
    });
    if (exists) {
        throw new Error('This shortcode [' + code + '] already exits')
    }
    return await URLs.create({
        id: id,
        code: code,
        link: link
    });
}

async function findLongUrl(code) {
    const id = radix642int(code)
    return await URLs.findOne({
        where: {
            id: id
        }
    });

}

async function getAllEntries(){
    return await URLs.findAll({
        attributes: ['link','code']
    });
}

module.exports = {
    createCustomShortCode,
    createRandomShortCode,
    findLongUrl,
    getAllEntries
};