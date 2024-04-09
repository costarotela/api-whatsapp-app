import { createBot, createFlow, MemoryDB, createProvider, addKeyword} from '@bot-whatsapp/bot'
import {BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'
import * as dotenv from 'dotenv'
dotenv.config()

const flowBienvenida = addKeyword('hola').addAnswer('buenas bienvenido')

const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx(async (bot, req,res) => {
        //const phone = req.body.phone
        const body = req.body
        const message = body.message
        const mediaURL = body.mediaURL
        console.log(message)
        console.log(mediaURL)
        await bot.sendMessage('3425291558',mediaURL, {
            media: mediaURL
        })
        res.end('esto es del server de polka')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB,
        provider
    })
}

main()