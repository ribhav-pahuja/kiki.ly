const {Router} = require('express')
const {
    createCustomShortCode,
    createRandomShortCode,
    findLongUrl
} = require('../services/url-service')

const route = Router()

/**
 * POST /api/links
 * 
 * BODY
 *      link: http//xxxx.xxxx/xxxx/xxxx
 *      optional
 *      code: xxxx
 * creates shortcode and returns short url
 */
route.post('/', async (req,res)=>{
    const link = req.body.link;
    const code = req.body.code;
    //TODO: validate link must exists

    if(!link){
        return res.status(400).json({error: "no link in request body"});
    }

    if(!code){
        const url = await createRandomShortCode(link);
        return res.json(url);
    }
    try{
        const url = await createCustomShortCode(code,link);
        return res.json(url);

    }catch(e){
        return res.status(400).json({error: e.message});
    }

});

/** 
 * GET /api/links/xxxx
 * Response
 *  link: 
 * 
*/
route.get('/:code', async (req,res)=>{
    const code = req.params.code;
    //TODO: validate code is available
    if(!code){
        return res.status(400).json({error: "no code in query params"});
    }
    const url = await findLongUrl(code);

    if(url){
        return res.json(url);
    }else{
        return res.status(400).json({error:'does not exist'});
    }

});

module.exports = route;