import { useState, useEffect } from 'react';
import { Key, Save, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DemoView from './DemoView';

export default function Popup() {
  // Check if running in Chrome Extension context
  const isExtension = typeof chrome !== 'undefined' && chrome.storage;

  // Show demo view if not in extension context
  if (!isExtension) {
    return <DemoView />;
  }
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load existing API key
    // Check if chrome extension APIs are available
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['geminiApiKey'], (result) => {
        if (result.geminiApiKey && typeof result.geminiApiKey === 'string') {
          setSavedKey('••••••••••••' + result.geminiApiKey.slice(-4));
        }
      });
    }
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setStatus('error');
      setMessage('Please enter an API key');
      return;
    }

    // Check if chrome extension APIs are available
    if (typeof chrome === 'undefined' || !chrome.storage) {
      setStatus('error');
      setMessage('Chrome Extension APIs not available. Please install as extension.');
      return;
    }

    try {
      await chrome.storage.local.set({ geminiApiKey: apiKey.trim() });
      setStatus('success');
      setMessage('API key saved successfully!');
      setSavedKey('••••••••••••' + apiKey.slice(-4));
      setApiKey('');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to save API key');
    }
  };

  return (
    <div className="w-[400px] p-6 bg-gradient-glass">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Explainer Pro</h1>
            <p className="text-xs text-muted-foreground">Configure your Gemini API</p>
          </div>
        </div>

        {/* API Key Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Key
            </CardTitle>
            <CardDescription>
              Enter your Google Gemini API key to start using AI explanations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Gemini API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
              {savedKey && (
                <p className="text-xs text-muted-foreground">
                  Current key: {savedKey}
                </p>
              )}
            </div>

            <Button 
              onClick={handleSave} 
              className="w-full"
              disabled={!apiKey.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              Save API Key
            </Button>

            {status === 'success' && (
              <Alert className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm">How to get an API key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <ol className="list-decimal list-inside space-y-1.5 ml-1">
              <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
              <li>Sign in with your Google account</li>
              <li>Click "Create API Key"</li>
              <li>Copy and paste the key above</li>
            </ol>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <div className="space-y-2 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground">How to use</h3>
          <ol className="text-xs text-muted-foreground space-y-1.5 ml-1 list-decimal list-inside">
            <li>Select any text on a webpage</li>
            <li>Right-click and choose "Explain with AI"</li>
            <li>Chat with AI to understand the content</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
