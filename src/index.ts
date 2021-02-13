import { readFileSync, writeFileSync } from 'fs'

import { ISite, INew } from './types'
import api from './database/api'

// modules
import Ycombinator from './modules/ycombinator'
import CNN from './modules/cnn'
import { AxiosResponse } from 'axios'


const main = async () => {
    // array with sites to be scraped
    // cada site adicionado é um puta peso no processo
    // O(n²) ou tlvz O(n³)
    const sites: ISite[] = [
        Ycombinator,
        // CNN
    ]
    
    sites.forEach(async (site, i) => {

        const response: AxiosResponse<INew[]> = await api.get<INew[]>('news/latest')
        const oldNews = response.data

        const news: INew[] = await site.fetch()

        news.filter((item, index, array) => {
            // confere nas notícias salvas se já tem alguma das novas
            // == undefined é quando a notífica não foi salva ainda
            const oldTitles = oldNews.map((e) => e.title as string)

            if (oldTitles.indexOf(item.title) == -1) {
                return array[index]
            }
        })
        const data = JSON.stringify(news, null, '\t')
        
        // writeFileSync('./src/database/news.json', data)
        // sim, tem um post dentro de um forEach
        api.post('news', data).then(() => {
            alert('Pacote com notícias enviado:' + site.from)
        }).catch(() => {
            alert('Erro ao salvar notícia do:' + site.from)
        })
    })

    // fazer a função rodar novamente após x tempo
    //            k    sec  min 
    const time = 1000 * 60 * 15 // = 5 minutos
    setTimeout(main, time)
}

if (true) {
    main()
}
