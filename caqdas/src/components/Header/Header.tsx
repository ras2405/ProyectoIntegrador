import { Button } from 'flowbite-react';

import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { IText } from '../../Interfaces';

interface HeaderProps {
  textRecords: IText[];
  setTextRecords: (textRecords: IText[]) => void;
  updateHighlightedText: (highlights: IText[]) => void;
}

export const Header = ({
  textRecords,
  setTextRecords,
  updateHighlightedText,
}: HeaderProps) => {
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
      const response = await fetch('/highlights.csv'); // Asegúrate de que el archivo esté en la carpeta public
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

  return (
    <div style={{ backgroundColor: '#171717' }} className="p-4">
      <div className="flex flex-row space-x-4">
        <Button onClick={downloadTextRecordsCSV}>Download Highlights</Button>
        <Button onClick={loadHighlightsFromCSV}>Load Highlights</Button>
      </div>
    </div>
  );
};
