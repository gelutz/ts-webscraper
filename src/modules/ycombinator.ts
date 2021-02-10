import axios from 'axios'
import cheerio from 'cheerio'

import { INew, ISite } from '../types'

class Ycombinator implements ISite {
    from: string = 'Ycombinator'
    url: string = 'https://news.ycombinator.com/'

    async fetch(): Promise<INew[]> {
        const AxiosInstance = axios.create()
        const news: INew[] = []

        const response = await AxiosInstance.get(this.url)

        const html = response.data
        const $ = cheerio.load(html)

        const rows: cheerio.Cheerio = $('table .itemlist > tbody > tr')

        rows.each((i, elem) => {
            if (i % 3 != 0) {
                return
            }

            // title and link
            const td = $(elem).find('td').find('.storylink')
            const title = $(td).text()

            if (!title) {
                return
            }

            const link = $(td).attr('href') ?? ''
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

export default new Ycombinator()
