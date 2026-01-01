'use client';

import { useState } from 'react';
import { PenTool, Sparkles, Copy, RefreshCw, FileText, Mail, ShoppingBag, Instagram } from 'lucide-react';
import { Button } from '@/components/core/ui/button';
import { Card, CardContent } from '@/components/core/ui/card';

import ArticleWriterPage from './_components/ArticleWriterView';

// Mock Templates
const TEMPLATES = [
    { id: 'product_desc', name: 'Product Description', icon: ShoppingBag, desc: 'High-converting descriptions for your product page.' },
    { id: 'ad_caption', name: 'Facebook/IG Ad', icon: Instagram, desc: 'Punchy captions that stop the scroll.' },
    { id: 'email_subject', name: 'Email Subject Lines', icon: Mail, desc: 'Catchy subject lines to boost open rates.' },
    { id: 'blog_post', name: 'Blog Post Outline', icon: FileText, desc: 'SEO-optimized outlines for your content marketing.' },
    { id: 'article_writer', name: 'Full Article Writer', icon: PenTool, desc: 'Generate long-form SEO articles (Pro Mode).' },
];

export default function CopywriterPage() {
    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
    const [productName, setProductName] = useState('');
    const [productFeatures, setProductFeatures] = useState('');
    const [tone, setTone] = useState('Persuasive');
    const [generatedCopy, setGeneratedCopy] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            const newCopy = [
                "Introducing the " + productName + ": The ultimate solution for your needs. " + productFeatures + ". Don't miss out!",
                "Stop struggling with the old way. The " + productName + " is here to change the game. " + productFeatures + ". Shop now!",
                "Experience the difference with " + productName + ". Designed for those who demand the best. " + productFeatures + "."
            ];
            setGeneratedCopy(newCopy);
            setIsGenerating(false);
        }, 1500);
    };

    // Render Full Article Writer Mode
    if (selectedTemplate.id === 'article_writer') {
        return (
            <div className="space-y-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-medium">
                        <PenTool className="w-5 h-5" />
                        You are in Article Writer Mode
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTemplate(TEMPLATES[0])} className="dark:border-indigo-800 dark:text-indigo-300">
                        Exit to Standard Copywriter
                    </Button>
                </div>
                <ArticleWriterPage />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground flex items-center gap-2">
                    <PenTool className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    AI Copywriter
                </h1>
                <p className="text-gray-600 dark:text-muted-foreground">Generate high-converting marketing copy in seconds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Controls */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Template Selector */}
                    <Card className="dark:bg-card dark:border-border">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-semibold text-gray-900 dark:text-foreground">1. Choose a Template</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t)}
                                        className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all ${selectedTemplate.id === t.id
                                            ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800'
                                            : 'bg-white dark:bg-card border border-gray-100 dark:border-border hover:bg-gray-50 dark:hover:bg-muted text-gray-700 dark:text-foreground'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-md ${selectedTemplate.id === t.id ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-gray-100 dark:bg-muted'}`}>
                                            <t.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{t.name}</div>
                                            <div className="text-xs opacity-70 line-clamp-1">{t.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Input Form */}
                    <Card className="dark:bg-card dark:border-border">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-semibold text-gray-900 dark:text-foreground">2. Enter Details</h3>

                            <div>
                                <label className="text-xs font-medium text-gray-700 dark:text-muted-foreground mb-1 block">Product/Brand Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-muted dark:text-foreground"
                                    placeholder="e.g., Galaxy Rose Lamp"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-700 dark:text-muted-foreground mb-1 block">Key Features / Benefits</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-muted dark:text-foreground"
                                    placeholder="e.g., Long battery life, waterproof, easy to use..."
                                    value={productFeatures}
                                    onChange={(e) => setProductFeatures(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-700 dark:text-muted-foreground mb-1 block">Tone of Voice</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-border rounded-lg text-sm bg-white dark:bg-muted focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-foreground"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                >
                                    <option>Persuasive</option>
                                    <option>Friendly</option>
                                    <option>Professional</option>
                                    <option>Urgent</option>
                                    <option>Witty</option>
                                </select>
                            </div>

                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={handleGenerate}
                                disabled={isGenerating || !productName}
                            >
                                {isGenerating ? (
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4 mr-2" />
                                )}
                                {isGenerating ? 'Writing...' : 'Generate Copy'}
                            </Button>

                        </CardContent>
                    </Card>

                </div>

                {/* Right Column: Output */}
                <div className="lg:col-span-2">
                    <Card className="h-full min-h-[500px] bg-gray-50/50 dark:bg-muted/20 dark:border-border">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-gray-900 dark:text-foreground">Generated Results</h3>
                                <span className="text-xs text-gray-500 dark:text-muted-foreground">{generatedCopy.length} variations</span>
                            </div>

                            {generatedCopy.length === 0 ? (
                                <div className="h-64 flex flex-col items-center justify-center text-gray-400 dark:text-muted-foreground">
                                    <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                                    <p>Fill in the details and click Generate to see magic happen.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {generatedCopy.map((copy, idx) => (
                                        <div key={idx} className="bg-white dark:bg-card p-4 rounded-xl border border-gray-200 dark:border-border shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group relative">
                                            <p className="text-gray-800 dark:text-foreground leading-relaxed pr-8">{copy}</p>
                                            <button
                                                className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Copy to clipboard"
                                                onClick={() => navigator.clipboard.writeText(copy)}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
