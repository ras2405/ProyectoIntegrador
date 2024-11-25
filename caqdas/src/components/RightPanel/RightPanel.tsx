import { useState } from 'react';
import { Button, Drawer, Label, Select } from 'flowbite-react';
import { IText } from '../../Interfaces';
import { tags } from '../../constants/tags';

interface RightPanelProps {
  open: boolean;
  textRecords: IText[];
  currentText: string;
  setOpen: (open: boolean) => void;
  setTextRecords: (textRecords: IText[]) => void;
  updateHighlightedText: (highlights: IText[]) => void;
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

  const stages = ['To Do', 'In Progress', 'Review', 'Done'];

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
        stage: 'draft',
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

      setTextRecords([...textRecords, newTextRecord]);
      updateHighlightedText([...textRecords, newTextRecord]);
      setOpen(false);
    }
  };

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} position="right">
        <Drawer.Items>
          <form
            onSubmit={handleSubmit}
            className="flex max-w-md flex-col gap-4"
          >
            <Label htmlFor="tag" value="Tag" />
            <Select id="tag" onChange={(e) => setTag(e.target.value)} required>
              {tags.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>

            <Label htmlFor="stage" value="Stage" />
            <Select
              id="stage"
              onChange={(e) => setStage(e.target.value)}
              required
            >
              {stages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>

            <Button type="submit">Send</Button>
            <Button onClick={() => setOpen(false)} outline>
              Cancel
            </Button>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
