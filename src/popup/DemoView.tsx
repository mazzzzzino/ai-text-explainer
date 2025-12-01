import { AlertCircle, Download, Chrome } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DemoView() {
  return (
    <div className="w-[400px] p-6 bg-gradient-glass space-y-4">
      <Alert className="border-primary/50 bg-primary/5">
        <Chrome className="w-4 h-4 text-primary" />
        <AlertTitle>Preview Mode</AlertTitle>
        <AlertDescription>
          You're viewing the extension popup in preview mode. To use this extension, you need to build and install it in Chrome.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Installation Steps
          </CardTitle>
          <CardDescription>
            Follow these steps to install the extension
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Run <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">npm install</code></li>
            <li>Run <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">npm run build</code></li>
            <li>Open Chrome and go to <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">chrome://extensions/</code></li>
            <li>Enable "Developer mode" (toggle in top right)</li>
            <li>Click "Load unpacked" and select the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">dist</code> folder</li>
            <li>Get your Gemini API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
            <li>Click the extension icon and enter your API key</li>
          </ol>

          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-semibold mb-2">How to Use</h4>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-muted-foreground">
              <li>Select any text on a webpage</li>
              <li>Right-click and choose "Explain with AI"</li>
              <li>Chat with AI about the selected content</li>
            </ul>
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => window.open('https://github.com/yourusername/ai-explainer-pro', '_blank')}
          >
            View Documentation
          </Button>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertDescription className="text-xs">
          Chrome Extension APIs are not available in this preview environment. The extension will work once installed in Chrome.
        </AlertDescription>
      </Alert>
    </div>
  );
}
