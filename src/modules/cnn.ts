import axios from 'axios'
import cheerio from 'cheerio'

import { INew, ISite } from '../types'


class Reddit implements ISite {
    from: string = 'CNN'
    url: string = 'https://edition.cnn.com/'

    async fetch(): Promise<INew[]> {
        const AxiosInstance = axios.create()
        const news: INew[] = []

        console.log('oi');
        const response = await AxiosInstance.get(this.url)

        const html = response.data
        const $ = cheerio.load(html)

        const articles: cheerio.Cheerio = $('article .cd .cd--card')
        
        articles.each((i, elem) => {

            const title = $(elem).find('#cd__headline-text').text()
            const link  = $(elem).find('#cd__headline-text').parent().attr('href') as string

            news.push({
                title,
                link,
                from: this.from,
                date: new Date()

            })
        })
        
        return news
    }
    
}


export default new Reddit()