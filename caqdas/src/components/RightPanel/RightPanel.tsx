import { useEffect, useState } from 'react';
import { Button, Drawer, Label, Select, Tabs } from 'flowbite-react';
import { IText, IChangeHistory } from '../../Interfaces';
import { tags } from '../../constants/tags';

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
  textRecords: IText[];
  currentText: string;
  setOpen: (open: boolean) => void;
  updateHighlightedText: (highlights: IText[]) => void;
  setTextRecords: React.Dispatch<React.SetStateAction<IText[]>>;
  setTagRecords: (tagRecords: ITag[]) => void;
}

export const RightPanel = ({
  textRecords,
  open,
  currentText,
  setOpen,
  setTextRecords,
  updateHighlightedText,
}: RightPanelProps) => {
  const [tag, setTag] = useState<string>(tags[0].value);
  const [stage, setStage] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<IText | null>(null);
  const [changeHistory, setChangeHistory] = useState<IChangeHistory[]>([]);

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
        tagAdventure: tag === 'tagAdventure' ? 1 : 0,
        tagNature: tag === 'tagNature' ? 1 : 0,
        tagMystery: tag === 'tagMystery' ? 1 : 0,
        tagFantasy: tag === 'tagFantasy' ? 1 : 0,
        tagForest: tag === 'tagForest' ? 1 : 0,
        tagJourney: tag === 'tagJourney' ? 1 : 0,
        tagDiscovery: tag === 'tagDiscovery' ? 1 : 0,
        tagMagic: tag === 'tagMagic' ? 1 : 0,
        tagLegends: tag === 'tagLegends' ? 1 : 0,
        tagWisdom: tag === 'tagWisdom' ? 1 : 0,
      };
        
      if (selectedRecord) {
        // Create change history entry
        const oldTag = selectedRecord.tag1
          ? 'tag1'
          : selectedRecord.tag2
            ? 'tag2'
            : 'No Tag';
        const newTag = tag || oldTag;

        const stageChanged = selectedRecord.stage !== stage;
        const tagChanged = oldTag !== newTag;

        if (stageChanged || tagChanged) {
          const changeEntry: IChangeHistory = {
            recordId: selectedRecord.text,
            timestamp: new Date().toISOString(),
            oldStage: selectedRecord.stage || 'To Do',
            newStage: stage,
            oldTag: oldTag,
            newTag: newTag,
            user: 'current_user',
          };
          setChangeHistory((prev) => [...prev, changeEntry]);
        }
      }

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
  };

  return (
    <>
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
                {changeHistory.map((change, index) => (
                  <div key={index} className="mb-2 p-2 border-b">
                    <p>Record: "{change.recordId}"</p>
                    <p>Time: {new Date(change.timestamp).toLocaleString()}</p>
                    <p>
                      Stage: {change.oldStage} → {change.newStage}
                    </p>
                    <p>
                      Tag: {change.oldTag} → {change.newTag}
                    </p>
                    <p>User: {change.user}</p>
                  </div>
                ))}
              </div>
            </Tabs.Item>
          </Tabs>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
