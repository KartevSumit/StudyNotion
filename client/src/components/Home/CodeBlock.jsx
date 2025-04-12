import React, { useState, useEffect } from 'react';

const codeLines = [
  { segments: [{ text: '<!DOCTYPE html>', yellow: true }] },
  { segments: [{ text: "<html lang='en'>" }] },
  { segments: [{ text: '<head><title>Example' }] },
  {
    segments: [
      { text: '</title><link' },
      { text: ' rel="stylesheet" href="styles.css" ', highlighted: true },
      { text: '>' },
    ],
  },
  { segments: [{ text: '</head>' }] },
  { segments: [{ text: '<body>' }] },
  {
    segments: [
      { text: '<h1><a' },
      { text: ' href="/" ', highlighted: true },
      { text: '>Header</a>' },
    ],
  },
  { segments: [{ text: '</h1>' }] },
  {
    segments: [
      { text: '<nav><a' },
      { text: ' href="one/" ', highlighted: true },
      { text: '>One</a><a' },
      { text: ' href="two/" ', highlighted: true },
      { text: '>Two</a>' },
    ],
  },
  {
    segments: [
      { text: '<a' },
      { text: ' href="three/" ', highlighted: true },
      { text: '>Three</a>' },
    ],
  },
  { segments: [{ text: '</nav>' }] },
];

// Build the full text with segments properly marked
function buildFullTextWithSegments() {
  return codeLines.map((line) => {
    return line.segments.map((segment) => ({
      text: segment.text,
      yellow: segment.yellow,
      highlighted: segment.highlighted,
    }));
  });
}

export default function CodeBlock({
  Shadow,
  cursorAnimationClass = 'animate-pulse',
}) {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const fullTextWithSegments = buildFullTextWithSegments();

  useEffect(() => {
    setDisplayedText(codeLines.map(() => []));
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentLineIndex >= fullTextWithSegments.length) {
        setTimeout(() => {
          setDisplayedText(codeLines.map(() => []));
          setCurrentLineIndex(0);
          setCurrentSegmentIndex(0);
          setCurrentCharIndex(0);
        }, 10000);
        clearInterval(typingInterval);
        return;
      }

      const currentLine = fullTextWithSegments[currentLineIndex];

      if (currentSegmentIndex >= currentLine.length) {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentSegmentIndex(0);
        setCurrentCharIndex(0);
        return;
      }

      const currentSegment = currentLine[currentSegmentIndex];

      if (currentCharIndex >= currentSegment.text.length) {
        setCurrentSegmentIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        return;
      }

      setDisplayedText((prev) => {
        const newText = [...prev];

        // Ensure the segment exists
        if (!newText[currentLineIndex][currentSegmentIndex]) {
          newText[currentLineIndex][currentSegmentIndex] = {
            text: '',
            yellow: currentSegment.yellow,
            highlighted: currentSegment.highlighted,
          };
        }

        newText[currentLineIndex][currentSegmentIndex].text +=
          currentSegment.text[currentCharIndex];

        return newText;
      });

      setCurrentCharIndex((prev) => prev + 1);
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [currentLineIndex, currentSegmentIndex, currentCharIndex]);

  const renderCode = () => {
    return displayedText.map((line, lineIndex) => {
      return (
        <div key={lineIndex} className="h-6 flex items-center">
          {line && line.length > 0 ? (
            line.map((segment, segmentIndex) => {
              const className = segment.yellow
                ? 'text-yellow-300'
                : segment.highlighted
                ? 'text-pink-400'
                : '';

              return (
                <span key={segmentIndex} className={className}>
                  {segment.text}
                </span>
              );
            })
          ) : (
            <span>&nbsp;</span>
          )}
          {lineIndex === currentLineIndex &&
            showCursor &&
            currentLineIndex < displayedText.length && (
              <span className={cursorAnimationClass}>|</span>
            )}
        </div>
      );
    });
  };

  return (
    <div className="relative lg:w-[37%] flex py-4 px-2 lg:px-0 ">
      <div
        className={`w-[350px] h-[300px] rounded-full absolute z-0 opacity-30 -top-5 -left-5 blur-2xl ${Shadow}`}
      />

      <div className="w-full h-full bg-richblack-800 border-richblack-400 absolute z-10 bottom-0 opacity-50 right-0 border-2" />

      {/* Line numbers */}
      <div className="w-[8%] flex flex-col font-semibold text-richblack-200 items-center z-20 pt-[2px]">
        {codeLines.map((_, i) => (
          <div key={i} className="h-6 flex items-center">
            {i + 1}
          </div>
        ))}
      </div>

      <div className="w-max overflow-x-auto text-richblack-5 font-semibold z-20 flex-1 whitespace-nowrap">
        {renderCode()}
      </div>
    </div>
  );
}
