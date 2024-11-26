import { Button } from 'flowbite-react';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { IText } from '../../Interfaces';
import { Select } from 'flowbite-react';
import { stages } from '../../constants/stages';

interface HeaderProps {
  textRecords: IText[];
  setTextRecords: (textRecords: IText[]) => void;
  updateHighlightedText: (highlights: IText[], selectedStage?: string) => void;
}

export const Header = ({
  textRecords,
  setTextRecords,
  updateHighlightedText,
}: HeaderProps) => {
  const [stage, setStage] = useState('');
  /**
   * Download the text records as a CSV file.
   */
  const downloadTextRecordsCSV = () => {
    if (textRecords.length > 0) {
      const csv = Papa.unparse(textRecords);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'highlights.csv');
    }
  };

  const loadHighlightsFromCSV = async () => {
    try {
      const response = await fetch('/highlights.csv');
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const newHighlights = results.data.map((row: any) => ({
            text: row.text,
            type: row.type,
            user: row.user,
            projectName: row.projectName,
            timestamp: row.timestamp,
            stage: row.stage,
            tagAdventure: row.tagAdventure,
            tagNature: row.tagNature,
            tagMystery: row.tagMystery,
            tagFantasy: row.tagFantasy,
            tagForest: row.tagForest,
            tagJourney: row.tagJourney,
            tagDiscovery: row.tagDiscovery,
            tagMagic: row.tagMagic,
            tagLegends: row.tagLegends,
            tagWisdom: row.tagWisdom,
          }));
          setTextRecords(newHighlights);
          updateHighlightedText(newHighlights);
        },
      });
    } catch (error) {
      console.error('Error loading highlights:', error);
    }
  };

  const handleStageChange = (stage: string) => {
    setStage(stage);
    updateHighlightedText(textRecords, stage);
  };

  return (
    <div style={{ backgroundColor: '#171717' }} className="p-4">
      <div className="flex flex-row justify-between">
        <Select
          id="stage"
          value={stage}
          onChange={(e) => handleStageChange(e.target.value)}
          required
        >
          <option value="">All</option>
          {stages.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <div className="flex flex-row space-x-4">
          <Button onClick={downloadTextRecordsCSV}>Download Highlights</Button>
          <Button onClick={loadHighlightsFromCSV}>Load Highlights</Button>
        </div>
      </div>
    </div>
  );
};
