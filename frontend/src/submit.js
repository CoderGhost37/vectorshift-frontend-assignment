// submit.js

import { useState } from 'react';
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { useStore } from './store';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <Button
                onClick={handleSubmit}
                size="lg"
                className="min-w-[200px]"
                disabled={loading}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Analyzing...' : 'Submit Pipeline'}
            </Button>

            {result && (
                <Alert className="max-w-md">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Pipeline Analysis Complete</AlertTitle>
                    <AlertDescription className="mt-2 space-y-1">
                        <div className="flex justify-between">
                            <span className="font-medium">Number of Nodes:</span>
                            <span>{result.num_nodes}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Number of Edges:</span>
                            <span>{result.num_edges}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Is DAG:</span>
                            <span className={result.is_dag ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {result.is_dag ? 'Yes ✓' : 'No (Contains Cycles) ✗'}
                            </span>
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive" className="max-w-md">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}. Make sure the backend server is running on port 8000.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
