import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

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
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="right"
        id="drawer"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            margin: 4,
          }}
        >
          {/* Select para Etiqueta */}
          <FormControl fullWidth>
            <InputLabel id="etiqueta-label">Etiqueta</InputLabel>
            <Select
              labelId="etiqueta-label"
              value={etiqueta}
              label="Etiqueta"
              onChange={(e) => setEtiqueta(e.target.value)}
            >
              {etiquetas.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            {/* Select para Etapa */}
            <FormControl
              fullWidth
              sx={{
                mt: 2,
              }}
            >
              <InputLabel id="etapa-label">Etapa</InputLabel>
              <Select
                labelId="etapa-label"
                value={etapa}
                label="Etapa"
                onChange={(e) => setEtapa(e.target.value)}
              >
                {etapas.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
          {/* Botón de Submit */}
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
          >
            Cancelar
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
