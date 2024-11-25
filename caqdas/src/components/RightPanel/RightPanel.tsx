import { useEffect, useState } from 'react';
import { Button, Drawer, Label, Select, Tabs } from 'flowbite-react';
import { ITag, IText } from '../../Interfaces';

const tags = [
  {
    label: 'Tag 1',
    value: 'tag1',
  },
  {
    label: 'Tag 2',
    value: 'tag2',
  },
];

interface RightPanelProps {
  open: boolean;
  highlightedText: string;
  textRecords: IText[];
  tagRecords: ITag[];
  currentText: string;
  setOpen: (open: boolean) => void;
  setHighlightedText: (highlightedText: string) => void;
  setTextRecords: React.Dispatch<React.SetStateAction<IText[]>>;
  setTagRecords: (tagRecords: ITag[]) => void;
}

export const RightPanel = ({
  highlightedText,
  textRecords,
  tagRecords,
  open,
  currentText,
  setOpen,
  setHighlightedText,
  setTextRecords,
  setTagRecords,
}: RightPanelProps) => {
  const [tag, setTag] = useState('');
  const [stage, setStage] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<IText | null>(null);

  useEffect(() => {
    const currentRecord = textRecords.find(
      (record) => record.text === currentText
    );
    if (currentRecord) {
      setSelectedRecord(currentRecord);
      // Determine tag based on tag1 and tag2 columns
      const selectedTag = currentRecord.tag1
        ? 'tag1'
        : currentRecord.tag2
          ? 'tag2'
          : '';
      setTag(selectedTag);
      setStage(currentRecord.stage || 'To Do');
    } else {
      setSelectedRecord(null);
      setTag(''); // Valores predeterminados si no hay registro
      setStage('To Do');
    }
  }, [currentText, textRecords]);

  const stages = ['To Do', 'In Progress', 'Review', 'Done'];

  const updateHighlightedText = (highlights: IText[]) => {
    let updatedText = highlightedText;

    highlights.forEach((highlight, index) => {
      const escapedText = highlight.text.replace(
        /[-\/\\^$.*+?()[\]{}|~]/g,
        '\\$&'
      ); // Escapar caracteres especiales
      updatedText = updatedText.replace(
        new RegExp(escapedText, 'g'),
        `<span class="highlight" data-id="${index}" style="background-color: red; cursor: pointer;">${highlight.text}</span>`
      );
    });

    setHighlightedText(updatedText);
    console.log('Texto actualizado con spans:', highlightedText);
  };

  /**
   * Handle the form submission.
   * @param e React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentText) {
      const newTextRecord: IText = {
        text: currentText,
        type: 'highlighted',
        user: 'current_user',
        projectName: 'My Project',
        timestamp: new Date().toISOString(),
        stage: stage,
        tag1: tag === 'tag1' ? 1 : 0,
        tag2: tag === 'tag2' ? 1 : 0,
      };

      // const newTagRecord: ITag = {
      //   tag: 'default_tag',
      //   // color: "yellow"
      // };

      // setTagRecords([...tagRecords, newTagRecord]);
      setTextRecords((prev) =>
        prev.some((record) => record.text === currentText)
          ? prev.map((record) =>
              record.text === currentText ? newTextRecord : record
            )
          : [...prev, newTextRecord]
      );
      updateHighlightedText([...textRecords, newTextRecord]);
      setOpen(false);
    }
    setOpen(false);
  };

  return (
    <>
      {/* <Button onClick={() => setOpen(true)}>Open drawer</Button> */}

      <Drawer open={open} onClose={() => setOpen(false)} position="right">
        <Drawer.Items>
          <Tabs aria-label="Pills" variant="pills">
            {/* Tab 1: Formulario */}
            <Tabs.Item active title="Tag Options">
              <form
                onSubmit={handleSubmit}
                className="flex max-w-md flex-col gap-4"
              >
                <Label htmlFor="tag" value="Tag" />
                <Select
                  id="tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                >
                  {tags.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>

                <Label htmlFor="stage" value="Stage" />
                <Select
                  id="stage"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  required
                >
                  {stages.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>

                <div className="flex justify-between gap-4">
                  <Button type="submit">Send</Button>
                  <Button onClick={() => setOpen(false)} outline>
                    Cancel
                  </Button>
                </div>
              </form>
            </Tabs.Item>

            {/* Tab 2: Historial */}
            <Tabs.Item title="Tag History">
              <div className="p-4 text-gray-500">
                <p>Hola</p>
              </div>
            </Tabs.Item>
          </Tabs>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
