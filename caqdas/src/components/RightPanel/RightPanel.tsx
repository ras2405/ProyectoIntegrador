import { useState } from 'react';
import { Button, Drawer, Label, Select } from 'flowbite-react';

export const RightPanel = () => {
  const [open, setOpen] = useState(false);

  const [etiqueta, setEtiqueta] = useState('');
  const [etapa, setEtapa] = useState('');

  const etiquetas = ['Bug', 'Mejora', 'Tarea', 'Feature'];
  const etapas = ['To Do', 'In Progress', 'Review', 'Done'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Etiqueta:', etiqueta);
    console.log('Etapa:', etapa);
    alert(`Formulario enviado con: \nEtiqueta: ${etiqueta} \nEtapa: ${etapa}`);
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
            <Label htmlFor="etiqueta" value="Etiqueta" />
            <Select
              id="etiqueta"
              onChange={(e) => setEtiqueta(e.target.value)}
              required
            >
              {etiquetas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>

            <Label htmlFor="etapa" value="Etapa" />
            <Select
              id="etapa"
              onChange={(e) => setEtapa(e.target.value)}
              required
            >
              {etapas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>

            <Button type="submit">Enviar</Button>
            <Button onClick={() => setOpen(false)} outline>
              Cancelar
            </Button>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
};
