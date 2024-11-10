interface TableProps {
    headers: string[];
    data: Record<string, any>[];
}

export function Table({ headers, data }: TableProps) {
    return (
        <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        {headers.map((header, index) => (
                            <th 
                                key={index} 
                                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                            {Object.values(row).map((cell, cellIndex) => (
                                <td 
                                    key={cellIndex} 
                                    className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}