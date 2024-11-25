import { useState } from 'react';
import { Button, Drawer, Label, Select } from 'flowbite-react';
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

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

interface RightPanelProps {
  open: boolean;
  highlightedText: string;
  textRecords: IText[];
  tagRecords: ITag[];
  currentText: string;
  setOpen: (open: boolean) => void;
  setHighlightedText: (highlightedText: string) => void;
  setTextRecords: (textRecords: IText[]) => void;
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
  const [tag, setTag] = useState<string>(tags[0].value);
  const [stage, setStage] = useState('');

  const stages = ['To Do', 'In Progress', 'Review', 'Done'];

  const updateHighlightedText = (highlights: IText[]) => {
    let updatedText = highlightedText;

    highlights.forEach((highlight) => {
      const matchingLabels = Object.entries(highlight)
        .filter(([key, value]) => key.startsWith('tag') && value === 1)
        .map(([key]) => {
          const tag = tags.find((t) => t.value === key);
          return tag?.label;
        })
        .filter((label) => label);

      const labelText = matchingLabels.join(', ');

      const escapedText = highlight.text.replace(
        /[-\/\\^$.*+?()[\]{}|~]/g,
        '\\$&'
      );
      updatedText = updatedText.replace(
        new RegExp(escapedText, 'g'),
        `<span class="highlight">${highlight.text}<span class="tooltip">${labelText}<br>${formatDate(highlight.timestamp)}</span></span>`
      );
    });

    setHighlightedText(updatedText);
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
        stage: 'draft',
        tag1: tag === 'tag1' ? 1 : 0,
        tag2: tag === 'tag2' ? 1 : 0,
      };

      const newTagRecord: ITag = {
        tag: 'default_tag',
        // color: "yellow"
      };

      setTextRecords([...textRecords, newTextRecord]);
      setTagRecords([...tagRecords, newTagRecord]);
      updateHighlightedText([...textRecords, newTextRecord]); // Actualiza con todos los resaltados
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
