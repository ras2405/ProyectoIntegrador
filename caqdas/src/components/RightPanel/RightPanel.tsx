import { useEffect, useState } from 'react';
import { Button, Drawer, Label, Select, Tabs } from 'flowbite-react';
import { IText, IChangeHistory } from '../../Interfaces';
import { tags } from '../../constants/tags';
import { stages } from '../../constants/stages';

interface RightPanelProps {
  open: boolean;
  textRecords: IText[];
  currentText: string;
  setOpen: (open: boolean) => void;
  updateHighlightedText: (highlights: IText[]) => void;
  setTextRecords: React.Dispatch<React.SetStateAction<IText[]>>;
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

      const tagColumns = [
        'tagAdventure',
        'tagNature',
        'tagMystery',
        'tagFantasy',
        'tagForest',
        'tagJourney',
        'tagDiscovery',
        'tagMagic',
        'tagLegends',
        'tagWisdom',
      ];

      const selectedTag =
        tagColumns.find(
          (tagCol) => currentRecord[tagCol as keyof IText] === 1
        ) || tags[0].value;
      setTag(selectedTag);
      setStage(currentRecord.stage || stages[0].value);
    } else {
      setSelectedRecord(null);
      setTag(tags[0].value); // Valores predeterminados si no hay registro
      setStage(stages[0].value);
    }
  }, [currentText, textRecords]);

  const getDisplayTag = (tagKey: string) => {
    const displayMap: { [key: string]: string } = {
      tagAdventure: 'Adventure',
      tagNature: 'Nature',
      tagMystery: 'Mystery',
      tagFantasy: 'Fantasy',
      tagForest: 'Forest',
      tagJourney: 'Journey',
      tagDiscovery: 'Discovery',
      tagMagic: 'Magic',
      tagLegends: 'Legends',
      tagWisdom: 'Wisdom',
    };
    return displayMap[tagKey] || tagKey;
  };

  /**
   * Handle the form submission.
   * @param e React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentText) {
      const tagColumns = {
        tagAdventure: 0,
        tagNature: 0,
        tagMystery: 0,
        tagFantasy: 0,
        tagForest: 0,
        tagJourney: 0,
        tagDiscovery: 0,
        tagMagic: 0,
        tagLegends: 0,
        tagWisdom: 0,
      };

      tagColumns[tag as keyof typeof tagColumns] = 1;

      const newTextRecord: IText = {
        text: currentText,
        type: 'highlighted',
        user: 'current_user',
        projectName: 'My Project',
        timestamp: new Date().toISOString(),
        stage: stage,
        ...tagColumns,
      };

      if (selectedRecord) {
        const tagColumns = [
          'tagAdventure',
          'tagNature',
          'tagMystery',
          'tagFantasy',
          'tagForest',
          'tagJourney',
          'tagDiscovery',
          'tagMagic',
          'tagLegends',
          'tagWisdom',
        ];

        const oldTag =
          tagColumns.find(
            (tagCol) => selectedRecord[tagCol as keyof IText] === 1
          ) || tags[0].value;
        const newTag = tag || oldTag;

        const stageChanged = selectedRecord.stage !== stage;
        const tagChanged = oldTag !== newTag;

        if (stageChanged || tagChanged) {
          const changeEntry: IChangeHistory = {
            recordId: selectedRecord.text,
            timestamp: new Date().toISOString(),
            oldStage: selectedRecord.stage || stages[0].value,
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
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
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
            <Tabs.Item title="All Tags History">
              <div className="p-4 text-gray-500">
                {changeHistory.map((change, index) => (
                  <div key={index} className="mb-2 p-2 border-b">
                    <p>Record: "{change.recordId}"</p>
                    <p>Time: {new Date(change.timestamp).toLocaleString()}</p>
                    <p>
                      Stage: {change.oldStage} → {change.newStage}
                    </p>
                    <p>
                      Tag: {getDisplayTag(change.oldTag)} →{' '}
                      {getDisplayTag(change.newTag)}
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
