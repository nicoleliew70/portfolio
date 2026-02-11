import { useState } from 'react';
import { trackStoryGenerated } from '../utils/analytics';

const STORY_API_URL = 'https://nicole-story-api.nicole-story-api.workers.dev/';

const fallbackTemplates = [
  (n, p, o) => `One day, ${n} went to the ${p} to find a mysterious ${o}. Suddenly, the ${o} started dancing! Everyone at the ${p} was shocked.`,
  (n, p, o) => `${n} was the bravest hero in the ${p}. But ${n}'s only weakness was a giant ${o}.`,
  (n, p, o) => `"Don't touch the ${o}!" shouted ${n}. But it was too late. The ${p} was already filled with glitter.`,
  (n, p, o) => `Chef ${n} decided to bake a cake shaped like a ${o}. It tasted like ${p}!`,
  (n, p, o) => `It was a dark and stormy night at the ${p}. ${n} tripped over a ${o} and found a secret door.`,
  (n, p, o) => `Teacher Nicole asked ${n} to bring a ${o} to class. ${n} brought it to the ${p} instead!`,
  (n, p, o) => `The ${o} at the ${p} is magical. If ${n} touches it, it turns into gold.`,
  (n, p, o) => `Every time ${n} visits the ${p}, a wild ${o} appears and sings a song.`,
];

const StoryGenerator = ({ currentText }) => {
  const [storyInputs, setStoryInputs] = useState({ name: '', place: '', object: '' });
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStory = async () => {
    const { name, place, object } = storyInputs;
    if (!name || !place || !object) return;

    setIsGenerating(true);
    setGeneratedStory('');

    try {
      const response = await fetch(STORY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, place, object }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setGeneratedStory(data.story);
      trackStoryGenerated(data.source || 'ai');
    } catch (err) {
      console.warn('Story API unavailable, using fallback:', err.message);
      const template = fallbackTemplates[Math.floor(Math.random() * fallbackTemplates.length)];
      setGeneratedStory(template(name, place, object));
      trackStoryGenerated('template');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
        <p className="text-gray-600 font-medium text-lg">AI is writing your story...</p>
        <p className="text-gray-400 text-sm mt-2">Powered by Google Gemini ✨</p>
      </div>
    );
  }

  if (generatedStory) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-500 mb-4 uppercase">{currentText.story.result}</h3>
        <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl mb-6 shadow-sm">
          <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
            &ldquo;{generatedStory}&rdquo;
          </p>
        </div>
        <div className="bg-sky-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-sky-800 italic">{currentText.story.tip}</p>
        </div>
        <button
          onClick={() => { setGeneratedStory(''); setStoryInputs({ name: '', place: '', object: '' }); }}
          className="text-purple-600 font-bold hover:text-purple-800"
        >
          Create Another Story
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">{currentText.story.title}</h3>
      <p className="text-gray-500 text-center mb-8">{currentText.story.desc}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">{currentText.story.label1}</label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
            value={storyInputs.name}
            onChange={(e) => setStoryInputs({ ...storyInputs, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">{currentText.story.label2}</label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
            value={storyInputs.place}
            onChange={(e) => setStoryInputs({ ...storyInputs, place: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">{currentText.story.label3}</label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
            value={storyInputs.object}
            onChange={(e) => setStoryInputs({ ...storyInputs, object: e.target.value })}
          />
        </div>
        <button
          onClick={generateStory}
          disabled={!storyInputs.name || !storyInputs.place || !storyInputs.object}
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {currentText.story.btn}
        </button>
      </div>
    </>
  );
};

export default StoryGenerator;
