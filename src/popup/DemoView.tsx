import { AlertCircle, Download, Chrome } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DemoView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-[500px] space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-full bg-gradient-primary shadow-glow">
            <Chrome className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Explainer Pro</h1>
          <p className="text-lg text-muted-foreground">
            Chrome Extension for AI-Powered Text Explanations
          </p>
        </div>

        <div className="p-6 bg-gradient-glass rounded-2xl shadow-elegant space-y-4">
          <Alert className="border-primary/50 bg-primary/5">
            <Chrome className="w-4 h-4 text-primary" />
            <AlertTitle className="text-base font-semibold">You&apos;re Viewing a Preview</AlertTitle>
            <AlertDescription className="text-sm">
              This is a Chrome extension that only works when installed in Chrome. Follow the steps below to build and install it.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Installation Steps
              </CardTitle>
              <CardDescription>
                Follow these steps to build and install the extension in Chrome
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ol className="text-sm space-y-3 list-decimal list-inside space-y-2">
                <li className="pl-2">
                  <strong className="font-semibold">Install dependencies:</strong><br />
                  <code className="px-2 py-1 rounded bg-muted font-mono text-xs ml-6 mt-1 inline-block">npm install</code>
                </li>
                <li className="pl-2">
                  <strong className="font-semibold">Build the extension:</strong><br />
                  <code className="px-2 py-1 rounded bg-muted font-mono text-xs ml-6 mt-1 inline-block">npm run build</code>
                </li>
                <li className="pl-2">
                  <strong className="font-semibold">Open Chrome Extensions:</strong><br />
                  <span className="ml-6 text-muted-foreground">Navigate to <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">chrome://extensions/</code></span>
                </li>
                <li className="pl-2">
                  <strong className="font-semibold">Enable Developer mode</strong><br />
                  <span className="ml-6 text-muted-foreground">Toggle the switch in the top right corner</span>
                </li>
                <li className="pl-2">
                  <strong className="font-semibold">Load the extension:</strong><br />
                  <span className="ml-6 text-muted-foreground">Click "Load unpacked" and select the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">dist</code> folder</span>
                </li>
                <li className="pl-2">
                  <strong className="font-semibold">Get your API key:</strong><br />
                  <span className="ml-6 text-muted-foreground">Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Google AI Studio</a> to create a Gemini API key</span>
                </li>
                <li className="pl-2">
                  <strong className="font-semibold">Configure the extension:</strong><br />
                  <span className="ml-6 text-muted-foreground">Click the extension icon and enter your API key</span>
                </li>
              </ol>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">How to Use After Installation</h4>
                <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
                  <li className="pl-2">Select any text on a webpage</li>
                  <li className="pl-2">Right-click and choose &quot;Explain with AI&quot;</li>
                  <li className="pl-2">A floating chat window opens with AI explanation</li>
                  <li className="pl-2">Ask follow-up questions in the chat</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-sm">
              <strong className="font-semibold">Note:</strong> Chrome Extension APIs are not available in this preview. The extension will only work when properly built and installed in Chrome.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
