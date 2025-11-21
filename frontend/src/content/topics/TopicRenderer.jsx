// Topic Renderer Component
import React from 'react';
import { Book, Terminal, Copy, Check, Rocket, Lightbulb, Target, Code } from 'lucide-react';

export const TopicRenderer = ({ topic, CodeBlock, InterviewTip, copiedCode, copyCode }) => {
  if (!topic || !topic.sections) return null;

  return (
    <div className="space-y-10">
      {/* Topic Header */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <Rocket className="w-10 h-10 text-blue-400" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {topic.title}
          </span>
        </h1>
        <p className="text-slate-300 text-lg">{topic.subtitle}</p>
      </div>

      {/* Render Sections */}
      {topic.sections.map((section, idx) => (
        <div key={idx} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
          {renderSection(section, idx, { CodeBlock, InterviewTip, copiedCode, copyCode })}
        </div>
      ))}
    </div>
  );
};

function renderSection(section, idx, { CodeBlock, InterviewTip, copiedCode, copyCode }) {
  const sectionNumber = idx + 1;
  const colors = ['blue', 'purple', 'green', 'orange', 'red', 'cyan'];
  const color = colors[idx % colors.length];

  switch (section.type) {
    case 'definition':
      return (
        <>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 bg-${color}-500 text-white rounded-full flex items-center justify-center text-lg font-bold`}>
              {sectionNumber}
            </span>
            <span className={`text-${color}-400`}>{section.title}</span>
          </h2>
          <div className="space-y-6">
            <div className="bg-slate-700/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                <Book className="w-5 h-5" />
                English:
              </h3>
              <p className="text-slate-200 leading-relaxed mb-4">{section.content.english}</p>
              {section.content.keyPoints && (
                <ul className="list-disc list-inside ml-4 space-y-1 text-slate-300">
                  {section.content.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
            {section.content.hinglish && (
              <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Hinglish:
                </h3>
                <p className="text-slate-200 leading-relaxed">{section.content.hinglish}</p>
              </div>
            )}
          </div>
        </>
      );

    case 'syntax':
      return (
        <>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 bg-${color}-500 text-white rounded-full flex items-center justify-center`}>
              {sectionNumber}
            </span>
            <span className={`text-${color}-400`}>{section.title}</span>
          </h2>
          <CodeBlock
            language={section.code.language}
            title={section.code.title}
            code={section.code.content}
          />
          {section.explanation?.parameters && (
            <div className="mt-4 bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-white font-bold mb-2">Parameters:</h4>
              <ul className="text-slate-300 space-y-1 text-sm">
                {section.explanation.parameters.map((param, i) => (
                  <li key={i}>
                    <code>{param.name}</code> → {param.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      );

    case 'examples':
      return (
        <>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 bg-${color}-500 text-white rounded-full flex items-center justify-center`}>
              {sectionNumber}
            </span>
            <span className={`text-${color}-400`}>{section.title}</span>
          </h2>
          <div className="space-y-6">
            {section.examples.map((example, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">{example.title}</h3>
                <CodeBlock language="javascript" title={example.title} code={example.code} />
                {example.note && (
                  <div className="mt-2 text-slate-400 text-sm italic">Note: {example.note}</div>
                )}
                {example.explanation && (
                  <div className="mt-2 text-slate-300 text-sm">{example.explanation}</div>
                )}
              </div>
            ))}
          </div>
        </>
      );

    case 'realworld':
      return renderSection({ ...section, type: 'examples' }, idx, { CodeBlock, InterviewTip, copiedCode, copyCode });

    case 'pitfalls':
      return (
        <>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
              {sectionNumber}
            </span>
            <span className="text-red-400">{section.title}</span>
          </h2>
          <div className="space-y-6">
            {section.pitfalls.map((pitfall, i) => (
              <div key={i} className="bg-red-900/20 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-lg font-bold text-red-300 mb-3">❌ {pitfall.title}</h3>
                <CodeBlock language="javascript" title="Wrong" code={pitfall.wrong} />
                <p className="mt-2 text-slate-400 text-sm">Reason: {pitfall.reason}</p>
                <div className="mt-4">
                  <h4 className="text-green-300 font-bold mb-2">✅ Solution:</h4>
                  <CodeBlock language="javascript" title="Correct" code={pitfall.correct} />
                  <p className="mt-2 text-green-400 text-sm">{pitfall.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'interview':
      return (
        <>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
              {sectionNumber}
            </span>
            <span className="text-purple-400">{section.title}</span>
          </h2>
          <InterviewTip>
            <div className="space-y-2">
              <p><strong>Key Interview Points:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                {section.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </InterviewTip>
        </>
      );

    default:
      return null;
  }
}

export default TopicRenderer;
