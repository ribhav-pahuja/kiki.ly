const {Router} = require('express')
const { getAllEntries } = require('../services/url-service')

const route = Router()

/** 
 * GET /api/admin
 * 
 * params:
 * 
 * returns: all urls and their codes
*/
route.get('/', async (req,res)=>{
    const allLinksWithShortcodes = await getAllEntries();
    return res.json(allLinksWithShortcodes);
})

module.exports = route;