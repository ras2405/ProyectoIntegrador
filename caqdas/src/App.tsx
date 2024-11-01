import { useState } from 'react'
import './App.css'
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { ITag, IText } from './Interfaces';

const text = "In a quiet village surrounded by mountains and lush forests, " +
"lived a young man named Teo, whose heart always longed for adventure. " +
"Teo worked as a carpenter in his grandfather’s workshop, but his thoughts constantly " +
"wandered to stories of hidden treasures and magical creatures said to dwell in the deepest corners of the woods. " +
"One autumn afternoon, as the wind played with golden leaves, " +
"Teo decided it was time to discover for himself whether those old legends were true.\n\n" +
  
"With a light backpack and a hand-drawn map, Teo ventured into the forest. The air was filled with the scent of pine, " +
"and the gentle murmur of a nearby stream guided his way. He walked for hours until the sun began to slip behind the mountains, " +
"and that was when he heard a strange, almost musical whisper. Following the sound, " +
"he found a clearing where an old man with a white beard and eyes as bright as stars sat on a moss-covered stone. " +
"The old man smiled at him, as if he had been expecting Teo, and said, 'Teo, I know you seek adventure, " +
"but the greatest rewards are not always gold and jewels.'\n\n" +

"Curious, Teo sat down to listen. The old man told him that the forest held secrets far more precious than any treasure, " +
"and that only those who could listen with their hearts would understand them. " +
"As they talked, Teo felt a change in the air, as if the entire forest was breathing in harmony. " +
"It was then that the old man showed him a stream where fish swam in perfect circles, " +
"creating shimmering reflections that looked like crystal dancers. " +
"'This is the true treasure, the magic of the simple things,' " +
"the old man whispered before fading away like mist in the last ray of sunlight.\n\n" +

"Teo returned to the village with a calm smile. He no longer dreamed of distant adventures, " +
"for he now understood that the world’s wonders were there, in every corner of the forest he had learned to see with new eyes. " +
"And so, every evening, he returned to the clearing to remember that life was full of secrets waiting to be discovered, " +
"as long as one knew how to truly see them.";


function App() {
  const [highlightedText, setHighlightedText] = useState('');
  const [textRecords, setTextRecords] = useState<IText[]>([]);
  const [tagRecords, setTagRecords] = useState<ITag[]>([]);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';

    if (selectedText) {
      const fullText = text;

      const highlighted = fullText.replace(selectedText, `<span class="highlight">${selectedText}</span>`);
      setHighlightedText(highlighted);

      const newTextRecord : IText = {
        text: selectedText,
        type: "highlighted",
        user: "current_user",
        projectName: "My Project",
        timestamp: new Date().toISOString(),
        stage: "draft",
        tag: "default_tag"
      };

      const newTagRecord : ITag = {
        tag: "default_tag",
        // color: "yellow"
      };

      setTextRecords([...textRecords, newTextRecord]);
      setTagRecords([...tagRecords, newTagRecord]);
    }
  };

  const downloadTextRecordsCSV = () => {
    if (textRecords.length > 0) {
      const csv = Papa.unparse(textRecords);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'text_records.csv');
    }
  };

  const downloadTagRecordsCSV = () => {
    if (tagRecords.length > 0) {
      const csv = Papa.unparse(tagRecords);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'tag_records.csv');
    }
  };

  return (
    <>
      <div 
        onMouseUp={handleMouseUp} 
        dangerouslySetInnerHTML={{ __html: highlightedText || text }}
      />
      <button onClick={downloadTextRecordsCSV}>Download Text Records CSV</button>
      <button onClick={downloadTagRecordsCSV}>Download Tag Records CSV</button>
    </>
  )
}

export default App
