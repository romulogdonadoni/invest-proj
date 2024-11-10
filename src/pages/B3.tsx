import { useEffect, useState } from "react";
import { Table } from "../components/ui/Table";
import axios from "axios";
import * as cheerio from 'cheerio';

interface EmpresaData {
    empresa: string;
    ticker: string;
    pl: string;
    pvp: string;
    dy: string;
    roe: string;
}

export default function B3() {
    const [data, setData] = useState<EmpresaData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const headers = ["Empresa", "Ticker", "P/L", "P/VP", "DY", "ROE"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresasData: EmpresaData[] = [];
                setLoading(true);

                // Busca dados de todas as páginas até a 13
                for (let page = 1; page <= 13; page++) {
                    const response = await axios.get(`http://localhost:3001/api/acoes?page=${page}`);
                    const html = response.data;
                    const $ = cheerio.load(html);
                    
                    $('.actions-card').each((_, element) => {
                        // Extrai o nome e ticker da empresa
                        const tituloCompleto = $(element).find('.actions-title').text(); // "CEMIG - CMIG4"
                        const [empresa, ticker] = tituloCompleto.split(' - ');
                        
                        // Extrai os indicadores
                        const indicadores = $(element).find('.indicators div');
                        const pl = $(indicadores[0]).find('span').last().text().trim();
                        const pvp = $(indicadores[1]).find('span').last().text().trim();
                        const dy = $(indicadores[2]).find('span').last().text().trim();
                        const roe = $(indicadores[3]).find('span').last().text().trim();
                        
                        empresasData.push({
                            empresa,
                            ticker,
                            pl,
                            pvp,
                            dy,
                            roe
                        });
                    });
                }

                setData(empresasData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Função para calcular os dados da página atual
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // Função para calcular o número total de páginas
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center items-center">
                    <p>Carregando dados...</p>
                </div>
            ) : (
                <>
                    <Table headers={headers} data={getCurrentPageData()} />
                    
                    {/* Controles de paginação */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        
                        <span className="flex items-center">
                            Página {currentPage} de {totalPages}
                        </span>
                        
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}