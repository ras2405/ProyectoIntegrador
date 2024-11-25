import './App.css';
import { useState } from 'react';
import { DocContainer } from './components/DocContainer/DocContainer';
import { RightPanel } from './components/RightPanel/RightPanel';
import { ITag, IText } from './Interfaces';

function App() {
  const [open, setOpen] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const [textRecords, setTextRecords] = useState<IText[]>([]);
  const [tagRecords, setTagRecords] = useState<ITag[]>([]);
  const [currentText, setCurrentText] = useState('');

  return (
    <>
      <DocContainer
        highlightedText={highlightedText}
        textRecords={textRecords}
        setOpen={setOpen}
        setHighlightedText={setHighlightedText}
        setCurrentText={setCurrentText}
      />
      <RightPanel
        open={open}
        highlightedText={highlightedText}
        textRecords={textRecords}
        currentText={currentText}
        setOpen={setOpen}
        setHighlightedText={setHighlightedText}
        setTextRecords={setTextRecords}
      />
    </>
  );
}

export default App;
