import './App.css';
import { useState } from 'react';
import { DocContainer } from './components/DocContainer/DocContainer';
import { RightPanel } from './components/RightPanel/RightPanel';
import { Header } from './components/Header/Header';
import { IText } from './Interfaces';
import { tags } from './constants/tags';

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

function App() {
  const [open, setOpen] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const [textRecords, setTextRecords] = useState<IText[]>([]);
  const [currentText, setCurrentText] = useState('');

  const updateHighlightedText = (highlights: IText[]) => {
    let updatedText = highlightedText;

    highlights.forEach((highlight, index) => {
      const matchingTags = Object.entries(highlight)
        .filter(([key, value]) => key.startsWith('tag') && value === 1)
        .map(([key]) => {
          const tag = tags.find((t) => t.value === key);
          return tag;
        })
        .filter((tag) => tag);

      const labelText = matchingTags.map((tag) => tag?.label).join(', ');
      const tagColor =
        matchingTags.length > 0 ? matchingTags[0]?.color : '#FFFFFF';

      const escapedText = highlight.text.replace(
        /[-\/\\^$.*+?()[\]{}|~]/g,
        '\\$&'
      );
      updatedText = updatedText.replace(
        new RegExp(escapedText, 'g'),
        `<span class="highlight" data-id="${index}" style="background-color: ${tagColor}; cursor: pointer;">${highlight.text}<span class="tooltip">${labelText}<br>${formatDate(highlight.timestamp)}</span></span>`
      );
    });

    setHighlightedText(updatedText);
  };

  return (
    <>
      <Header
        textRecords={textRecords}
        setTextRecords={setTextRecords}
        updateHighlightedText={updateHighlightedText}
      />
      <DocContainer
        highlightedText={highlightedText}
        setOpen={setOpen}
        setHighlightedText={setHighlightedText}
        setCurrentText={setCurrentText}
        textRecords={textRecords}
      />
      <RightPanel
        open={open}
        textRecords={textRecords}
        currentText={currentText}
        setOpen={setOpen}
        setTextRecords={setTextRecords}
        updateHighlightedText={updateHighlightedText}
      />
    </>
  );
}

export default App;
