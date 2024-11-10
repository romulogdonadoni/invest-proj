import { StockIndicators } from "../types/indicators"
import * as cheerio from 'cheerio'
import axios from 'axios'

export default async function webScrap(ticker: string): Promise<StockIndicators> {
    try {
        const response = await axios.get(`http://localhost:3001/proxy/${ticker}`)
        const html = response.data
        const $ = cheerio.load(html)
        
        const data: StockIndicators = {
            // Preço atual
            price: parseFloat(
                $('#cards-ticker ._card.cotacao .value')
                    .text()
                    .replace('R$ ', '')
                    .replace(',', '.')
            ),
            
            // Variação 12 meses
            priceVariation12m: parseFloat(
                $('#cards-ticker ._card.pl span')
                    .first()
                    .text()
                    .replace('%', '')
                    .replace(',', '.')
            ),
            
            // P/L
            pe: parseFloat(
                $('.cell:contains("P/L") .value span')
                    .first()
                    .text()
                    .replace(',', '.')
            ),
            
            // P/VP
            pbv: parseFloat(
                $('.cell:contains("P/VP") .value span')
                    .first()
                    .text()
                    .replace(',', '.')
            ),
            
            // Dividend Yield
            dividendYield: parseFloat(
                $('.cell:contains("DIVIDEND YIELD") .value span')
                    .first()
                    .text()
                    .replace('%', '')
                    .replace(',', '.')
            ),
            
            // Margem Líquida
            profitMargin: parseFloat(
                $('.cell:contains("MARGEM LÍQUIDA") .value span')
                    .first()
                    .text()
                    .replace('%', '')
                    .replace(',', '.')
            ),
            
            // ROE
            roe: parseFloat(
                $('.cell:contains("ROE") .value span')
                    .first()
                    .text()
                    .replace('%', '')
                    .replace(',', '.')
            ),
            
            // Dívida Líquida / Patrimônio
            debtToEquity: parseFloat(
                $('.cell:contains("DÍVIDA LÍQUIDA / PATRIMÔNIO") .value span')
                    .first()
                    .text()
                    .replace(',', '.')
            )
        }
        
        return data
        
    } catch (error) {
        console.error('Erro ao fazer web scraping:', error)
        throw error
    }
}