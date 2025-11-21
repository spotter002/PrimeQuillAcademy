import React, { useState, useEffect } from 'react';
import { Calculator, FileText, Clock, Search, Zap, CheckCircle } from 'lucide-react';
import api from '../services/api';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('word-counter');
  const [tools, setTools] = useState([]);
  const [results, setResults] = useState({});

  // Word Counter State
  const [wordCounterText, setWordCounterText] = useState('');
  const [wordCounterResults, setWordCounterResults] = useState(null);

  // Price Calculator State
  const [priceForm, setPriceForm] = useState({
    pages: 1,
    academicLevel: 'undergraduate',
    deadline: 7,
    writerType: 'ESL'
  });
  const [priceResults, setPriceResults] = useState(null);

  // Words to Pages State
  const [wordsToPages, setWordsToPages] = useState({
    words: '',
    spacing: 'double',
    fontSize: 12
  });
  const [wordsToPageResults, setWordsToPageResults] = useState(null);

  // Thesis Generator State
  const [thesisForm, setThesisForm] = useState({
    topic: '',
    position: '',
    reasons: ['', '', '']
  });
  const [thesisResult, setThesisResult] = useState(null);

  // Reading Time State
  const [readingTimeText, setReadingTimeText] = useState('');
  const [readingTimeResult, setReadingTimeResult] = useState(null);

  const toolCategories = [
    {
      id: 'word-counter',
      name: 'Word Counter',
      icon: FileText,
      description: 'Count words, characters, and estimate reading time'
    },
    {
      id: 'price-calculator',
      name: 'Price Calculator',
      icon: Calculator,
      description: 'Calculate project pricing based on requirements'
    },
    {
      id: 'words-to-pages',
      name: 'Words to Pages',
      icon: FileText,
      description: 'Convert word count to page count'
    },
    {
      id: 'thesis-generator',
      name: 'Thesis Generator',
      icon: Zap,
      description: 'Generate thesis statements for academic papers'
    },
    {
      id: 'reading-time',
      name: 'Reading Time',
      icon: Clock,
      description: 'Calculate estimated reading time'
    }
  ];

  // Remove API dependency for tools

  const handleWordCount = () => {
    if (!wordCounterText.trim()) return;
    
    const text = wordCounterText.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    
    setWordCounterResults({
      words,
      characters,
      charactersNoSpaces,
      paragraphs,
      sentences,
      readingTime
    });
  };

  const handlePriceCalculation = () => {
    const basePrices = {
      high_school: { ESL: 800, ENL: 1200 },
      undergraduate: { ESL: 1000, ENL: 1500 },
      masters: { ESL: 1300, ENL: 1800 },
      phd: { ESL: 1600, ENL: 2200 },
      professional: { ESL: 1800, ENL: 2500 }
    };
    
    let pricePerPage = basePrices[priceForm.academicLevel][priceForm.writerType];
    
    // Deadline multiplier
    if (priceForm.deadline <= 6) pricePerPage *= 2.5;
    else if (priceForm.deadline <= 12) pricePerPage *= 2.0;
    else if (priceForm.deadline <= 24) pricePerPage *= 1.5;
    else if (priceForm.deadline <= 48) pricePerPage *= 1.3;
    else if (priceForm.deadline <= 72) pricePerPage *= 1.2;
    
    const totalPrice = Math.round(pricePerPage * priceForm.pages);
    
    setPriceResults({
      currency: 'KSh',
      pricePerPage: Math.round(pricePerPage),
      totalPrice,
      pages: priceForm.pages,
      academicLevel: priceForm.academicLevel,
      deadline: priceForm.deadline,
      writerType: priceForm.writerType
    });
  };

  const handleWordsToPages = () => {
    if (!wordsToPages.words) return;
    
    const words = parseInt(wordsToPages.words);
    let wordsPerPage;
    
    // Calculate words per page based on spacing and font size
    const baseWordsPerPage = wordsToPages.spacing === 'double' ? 250 : 500;
    const fontMultiplier = wordsToPages.fontSize === 10 ? 1.2 : 
                          wordsToPages.fontSize === 11 ? 1.1 : 
                          wordsToPages.fontSize === 12 ? 1.0 : 0.9;
    
    wordsPerPage = Math.round(baseWordsPerPage * fontMultiplier);
    const pages = Math.ceil(words / wordsPerPage);
    
    setWordsToPageResults({
      pages,
      words,
      spacing: wordsToPages.spacing,
      fontSize: wordsToPages.fontSize
    });
  };

  const handleThesisGeneration = () => {
    const validReasons = thesisForm.reasons.filter(r => r.trim());
    if (!thesisForm.topic || !thesisForm.position || validReasons.length < 2) return;
    
    const reasonsText = validReasons.length === 2 ? 
      `${validReasons[0]} and ${validReasons[1]}` :
      `${validReasons.slice(0, -1).join(', ')}, and ${validReasons[validReasons.length - 1]}`;
    
    const thesis = `${thesisForm.topic} ${thesisForm.position} because ${reasonsText}.`;
    
    setThesisResult({ thesis });
  };

  const handleReadingTime = () => {
    if (!readingTimeText.trim()) return;
    
    const text = readingTimeText.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const avgReadingSpeed = 200; // words per minute
    const readingTimeMinutes = Math.ceil(words / avgReadingSpeed);
    const readingTimeSeconds = Math.ceil((words / avgReadingSpeed) * 60);
    
    setReadingTimeResult({
      words,
      minutes: readingTimeMinutes,
      seconds: readingTimeSeconds,
      readingSpeed: avgReadingSpeed
    });
  };

  const renderWordCounter = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text
        </label>
        <textarea
          value={wordCounterText}
          onChange={(e) => setWordCounterText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      
      <button
        onClick={handleWordCount}
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Count Words
      </button>

      {wordCounterResults && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{wordCounterResults.words}</div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{wordCounterResults.characters}</div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{wordCounterResults.charactersNoSpaces}</div>
            <div className="text-sm text-gray-600">Characters (no spaces)</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{wordCounterResults.paragraphs}</div>
            <div className="text-sm text-gray-600">Paragraphs</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{wordCounterResults.sentences}</div>
            <div className="text-sm text-gray-600">Sentences</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{wordCounterResults.readingTime}</div>
            <div className="text-sm text-gray-600">Min read</div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPriceCalculator = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Pages
          </label>
          <input
            type="number"
            min="1"
            value={priceForm.pages}
            onChange={(e) => setPriceForm(prev => ({ ...prev, pages: parseInt(e.target.value) || 1 }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Level
          </label>
          <select
            value={priceForm.academicLevel}
            onChange={(e) => setPriceForm(prev => ({ ...prev, academicLevel: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="high_school">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deadline (hours)
          </label>
          <input
            type="number"
            min="1"
            value={priceForm.deadline}
            onChange={(e) => setPriceForm(prev => ({ ...prev, deadline: parseInt(e.target.value) || 1 }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Writer Type
          </label>
          <select
            value={priceForm.writerType}
            onChange={(e) => setPriceForm(prev => ({ ...prev, writerType: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="ESL">ESL Writer</option>
            <option value="ENL">Native English Writer</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={handlePriceCalculation}
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Calculate Price
      </button>

      {priceResults && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">
              {priceResults.currency} {priceResults.totalPrice.toLocaleString()}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {priceResults.currency} {priceResults.pricePerPage.toLocaleString()} per page
            </div>
            <div className="text-sm text-gray-500">
              {priceResults.pages} pages • {priceResults.academicLevel} • {priceResults.deadline}h deadline • {priceResults.writerType}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderWordsToPages = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Word Count
          </label>
          <input
            type="number"
            min="1"
            value={wordsToPages.words}
            onChange={(e) => setWordsToPages(prev => ({ ...prev, words: e.target.value }))}
            placeholder="Enter word count"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Line Spacing
          </label>
          <select
            value={wordsToPages.spacing}
            onChange={(e) => setWordsToPages(prev => ({ ...prev, spacing: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="single">Single Spaced</option>
            <option value="double">Double Spaced</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={wordsToPages.fontSize}
            onChange={(e) => setWordsToPages(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value={10}>10pt</option>
            <option value={11}>11pt</option>
            <option value={12}>12pt</option>
            <option value={14}>14pt</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={handleWordsToPages}
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Convert to Pages
      </button>

      {wordsToPageResults && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mt-6 text-center">
          <div className="text-3xl font-bold text-teal-600 mb-2">
            {wordsToPageResults.pages} Pages
          </div>
          <div className="text-gray-600">
            {wordsToPageResults.words} words • {wordsToPageResults.spacing} spaced • {wordsToPageResults.fontSize}pt font
          </div>
        </div>
      )}
    </div>
  );

  const renderReadingTime = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text
        </label>
        <textarea
          value={readingTimeText}
          onChange={(e) => setReadingTimeText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      
      <button
        onClick={handleReadingTime}
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Calculate Reading Time
      </button>

      {readingTimeResult && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">
              {readingTimeResult.minutes} minute{readingTimeResult.minutes !== 1 ? 's' : ''}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              {readingTimeResult.seconds} seconds
            </div>
            <div className="text-sm text-gray-500">
              {readingTimeResult.words} words • {readingTimeResult.readingSpeed} words per minute average
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderThesisGenerator = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topic
        </label>
        <input
          type="text"
          value={thesisForm.topic}
          onChange={(e) => setThesisForm(prev => ({ ...prev, topic: e.target.value }))}
          placeholder="e.g., Social media"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Position
        </label>
        <input
          type="text"
          value={thesisForm.position}
          onChange={(e) => setThesisForm(prev => ({ ...prev, position: e.target.value }))}
          placeholder="e.g., negatively affects teenagers"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Supporting Reasons (at least 2)
        </label>
        {thesisForm.reasons.map((reason, index) => (
          <input
            key={index}
            type="text"
            value={reason}
            onChange={(e) => {
              const newReasons = [...thesisForm.reasons];
              newReasons[index] = e.target.value;
              setThesisForm(prev => ({ ...prev, reasons: newReasons }));
            }}
            placeholder={`Reason ${index + 1}`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
          />
        ))}
      </div>
      
      <button
        onClick={handleThesisGeneration}
        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
      >
        Generate Thesis Statement
      </button>

      {thesisResult && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Generated Thesis Statement:</h3>
          <p className="text-gray-800 italic text-lg leading-relaxed">
            "{thesisResult.thesis}"
          </p>
        </div>
      )}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'word-counter':
        return renderWordCounter();
      case 'price-calculator':
        return renderPriceCalculator();
      case 'words-to-pages':
        return renderWordsToPages();
      case 'thesis-generator':
        return renderThesisGenerator();
      case 'reading-time':
        return renderReadingTime();
      default:
        return renderWordCounter();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Tools & Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional tools to help you with writing, calculations, and project planning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tool Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="font-semibold text-gray-900 mb-4">Available Tools</h2>
              <nav className="space-y-2">
                {toolCategories.map(tool => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTab(tool.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeTab === tool.id
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-gray-500">{tool.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tool Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {toolCategories.find(t => t.id === activeTab)?.name}
                </h2>
                <p className="text-gray-600">
                  {toolCategories.find(t => t.id === activeTab)?.description}
                </p>
              </div>
              
              {renderActiveTab()}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Tools?</h2>
            <p className="text-gray-600">Professional-grade tools designed for accuracy and ease of use</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600">Get accurate calculations and analysis in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600">All tools are completely free to use with no limits</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Grade</h3>
              <p className="text-gray-600">Built for professionals and students alike</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;