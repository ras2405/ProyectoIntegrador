import { useState } from 'react';
import { Button, Drawer, Label, Select } from 'flowbite-react';

export const RightPanel = () => {
  const [open, setOpen] = useState(false);

  const [tag, setTag] = useState('');
  const [stage, setStage] = useState('');

  const tags = ['Bug', 'Mejora', 'Tarea', 'Feature'];
  const stages = ['To Do', 'In Progress', 'Review', 'Done'];

  /**
   * Handle the form submission.
   * @param e React.FormEvent<HTMLFormElement>
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Etiqueta:', tag);
    console.log('Etapa:', stage);
    alert(`Formulario enviado con: \nEtiqueta: ${tag} \nEtapa: ${stage}`);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>

      <Drawer open={open} onClose={() => setOpen(false)} position="right">
        <Drawer.Items>
          <form
            onSubmit={handleSubmit}
            className="flex max-w-md flex-col gap-4"
          >
            <Label htmlFor="tag" value="Tag" />
            <Select id="tag" onChange={(e) => setTag(e.target.value)} required>
              {tags.map((item) => (
                <option key={item}>{item}</option>
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
