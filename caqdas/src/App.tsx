import { useState } from 'react'
import './App.css'

function App() {
  // const [selectedText, setSelectedText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';

    if (selectedText) {
      // setSelectedText(selectedText);
      const fullText = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore reiciendis tenetur rerum laudantium voluptate quo, ratione odio obcaecati adipisci iure minima excepturi perspiciatis sunt distinctio, itaque quia blanditiis at? Impedit.";

      const highlighted = fullText.replace(selectedText, `<span class="highlight">${selectedText}</span>`);
      setHighlightedText(highlighted);
    }
  };

  return (
    <>
      <div 
        onMouseUp={handleMouseUp} 
        dangerouslySetInnerHTML={{ __html: highlightedText || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore reiciendis tenetur rerum laudantium voluptate quo, ratione odio obcaecati adipisci iure minima excepturi perspiciatis sunt distinctio, itaque quia blanditiis at? Impedit." }} />
    </>
  )
}

export default App
