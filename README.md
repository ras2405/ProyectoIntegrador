# Proyecto CAQDAS

Una aplicación web para análisis cualitativo que permite a los investigadores etiquetar y analizar documentos de texto, con énfasis en mejorar la visualización y experiencia del usuario. [[1]](#ref1)

## Prerequisitos

Antes de comenzar de se debe tener instalado:

- [Node.js](https://nodejs.org/es/) (v18 o superior)
- [npm](https://www.npmjs.com/) (v9 o superior)

## Instalación y configuración

1. Clonar el repositorio

```bash
git clone https://github.com/ras2405/ProyectoIntegrador.git
```

2. Instalar las dependencias

```bash
cd ProyectoIntegrador/CAQDAS
npm install
```

3. Instalar extensiones requeridas de Visual Studio Code:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

5. Acceder a la aplicación en el navegador

```bash
http://localhost:5173/
```

## Estructura del proyecto

```
CAQDAS/
├── node_modules/
├── public/
│   ├── highlights.csv    # Datos precargados de etiquetas
│   └── vite.svg
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── components/      # Componentes de React
│   │   ├── DocContainer/
│   │   ├── Header/
│   │   └── RightPanel/
│   ├── constants/       # Constantes de la aplicación
│   │   ├── stages.ts    # Definiciones de etapas de investigación
│   │   └── tags.ts      # Definiciones de etiquetas
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── Interfaces.ts    # Interfaces de TypeScript
│   └── main.tsx
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package-lock.json
└── package.json
```

## Precarga de datos

Para precargar datos de etiquetas, se debe colocar un archivo CSV llamado `highlights.csv` en la carpeta `public`. El CSV debe seguir este formato:

```
text,type,user,projectName,timestamp,stage,tagAdventure,tagNature,tagMystery,tagFantasy,tagForest,tagJourney,tagDiscovery,tagMagic,tagLegends,tagWisdom
"Texto de ejemplo",highlighted,current_user,My Project,2024-12-03T19:55:35.864Z,dataAcquisition,0,0,0,0,0,0,0,0,1,0
```

## Agregar componentes de Flowbite

Para agregar componentes de Flowbite al proyecto:

1. Importar el componente desde flowbite-react:

```javascript
import { Button } from "flowbite-react";
```

2. Usar el componente en el archivo de React:

```javascript
<Button>Click me</Button>
```

## Agregar un nuevo componete de React

Para agregar un nuevo componente de React al proyecto:

1. Crear un archivo `.tsx` en la carpeta `src/components/NombreComponete`.

2. Definir el componente en el archivo `.tsx`:

```javascript
import React from "react";

export const NombreComponente = () => {
  return <div>Componente de ejemplo</div>;
};
```

3. Importar el componente en el componente padre en que se lo quiera usar:

```javascript
import { NombreComponente } from "./components/NombreComponente/NombreComponente";
```

4. Usar el componente en el archivo de React:

```javascript
<NombreComponente />
```

<a id="ref1">[1]</a> R. Arour and D. Aysa, "Propuesta de visualización de etiquetado en herramientas de metodológicas cualitativas", Universidad ORT Uruguay, Montevideo, Uruguay, 2024 Available: https://www.overleaf.com/read/mmjtczghbytc#06931f
