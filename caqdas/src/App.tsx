import './App.css'

function App() {

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';
    
    if (selectedText) {
      console.log(selectedText);
    }
  };

  return (
    <>
      <div onMouseUp={handleMouseUp}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore reiciendis tenetur rerum laudantium voluptate quo, ratione odio obcaecati adipisci iure minima excepturi perspiciatis sunt distinctio, itaque quia blanditiis at? Impedit.
      </div>
    </>
  )
}

export default App
