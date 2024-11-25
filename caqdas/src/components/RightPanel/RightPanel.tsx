import { useState } from 'react';
import { Button, Drawer, Label, Select } from 'flowbite-react';
import { ITag, IText } from '../../Interfaces';

const tags = [
  {
    label: 'Adventure',
    value: 'tagAdventure',
    color: '#1E40AF', // Azul
  },
  {
    label: 'Nature',
    value: 'tagNature',
    color: '#10B981', // Verde
  },
  {
    label: 'Mystery',
    value: 'tagMystery',
    color: '#6B21A8', // Púrpura
  },
  {
    label: 'Fantasy',
    value: 'tagFantasy',
    color: '#EC4899', // Rosa
  },
  {
    label: 'Forest',
    value: 'tagForest',
    color: '#14B8A6', // Verde azulado
  },
  {
    label: 'Journey',
    value: 'tagJourney',
    color: '#F59E0B', // Amarillo
  },
  {
    label: 'Discovery',
    value: 'tagDiscovery',
    color: '#FB923C', // Naranja
  },
  {
    label: 'Magic',
    value: 'tagMagic',
    color: '#6366F1', // Índigo
  },
  {
    label: 'Legends',
    value: 'tagLegends',
    color: '#EF4444', // Rojo
  },
  {
    label: 'Wisdom',
    value: 'tagWisdom',
    color: '#6B7280', // Gris
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
  currentText: string;
  setOpen: (open: boolean) => void;
  setHighlightedText: (highlightedText: string) => void;
  setTextRecords: (textRecords: IText[]) => void;
}

export const RightPanel = ({
  highlightedText,
  textRecords,
  open,
  currentText,
  setOpen,
  setHighlightedText,
  setTextRecords,
}: RightPanelProps) => {
  const [tag, setTag] = useState<string>(tags[0].value);
  const [stage, setStage] = useState('');

  const stages = ['To Do', 'In Progress', 'Review', 'Done'];

  const updateHighlightedText = (highlights: IText[]) => {
    let updatedText = highlightedText;

    highlights.forEach((highlight) => {
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
        `<span class="highlight" style="background-color: ${tagColor};">${highlight.text}<span class="tooltip">${labelText}<br>${formatDate(highlight.timestamp)}</span></span>`
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
