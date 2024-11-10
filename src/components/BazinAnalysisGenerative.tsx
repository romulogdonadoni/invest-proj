import { useState } from "react";
import { Button } from "./ui/Button";
import ReactMarkdown from "react-markdown";

interface BazinAnalysisGenerativeProps {
    prompt: string;
}

export default function BazinAnalysisGenerative({ prompt }: BazinAnalysisGenerativeProps) {

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const generateAnalysis = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://127.0.0.1:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama3.2',
                    prompt: prompt,
                    stream: false
                })
            });

            const data = await response.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Erro ao gerar análise:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                onClick={() => generateAnalysis()}
                variant="default"
                disabled={loading}
            >
                {loading ? 'Gerando...' : 'Gerar Análise'}
            </Button>

            {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded prose prose-slate max-w-none">
                    <ReactMarkdown>{response}</ReactMarkdown>
                </div>
            )}  
        </div>
    )
}