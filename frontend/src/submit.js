// submit.js

import { Button } from './components/ui/button';

export const SubmitButton = () => {

    return (
        <div className="flex items-center justify-center p-4">
            <Button type="submit" size="lg" className="min-w-[200px]">
                Submit Pipeline
            </Button>
        </div>
    );
}
