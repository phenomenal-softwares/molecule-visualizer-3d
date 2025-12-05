Molecule Visualizer 3D

A fast, elegant 3D molecule viewer built with React, Three.js, and the PubChem API.
This application allows users to search for chemical compounds, view their 3D molecular structure in real-time, and explore essential metadata like molecular formula, weight, and IUPAC name.

It’s a lightweight, science-focused tool designed for students, researchers, and anyone curious about molecular chemistry.

🚀 Features
🔍 Smart Molecule Search

Search any known compound by name (e.g., “Water”, “Aspirin”, “Caffeine”).
The app fetches:
Molecular Formula
Molecular Weight
IUPAC Name
PubChem CID

🧬 Real-Time 3D Visualization

Fully interactive 3D viewer
Rotate, zoom, and inspect atoms
High-quality sphere + bond rendering
Automatic scene lighting

📦 50 Preloaded Molecules
A curated A–Z list of common molecular names for quick exploration.

🌈 Clean UI With Custom Brand Colors
Consistent global theme with:
Deep Blue (#002247)
Accent Aqua (#14c9cb)
Neutral Silvers for clarity
Soft shadows and polished component styling

| Category              | Technology                        |
| --------------------- | --------------------------------- |
| Frontend Framework    | **React 18**                      |
| 3D Engine             | **Three.js + @react-three/fiber** |
| Helpers / UI / Models | **@react-three/drei**             |
| Styling               | CSS Modules                       |
| API Source            | **PubChem REST API**              |
| Deployment            | Vercel                            |


📡 How It Works
1. User enters a molecule name
2. App sends a request to the PubChem API
3. Metadata + 3D structure come back
4. MoleculeViewer converts atoms + bonds into 3D shapes
5. MoleculeInfo displays human-readable chemical details

No backend.
No database.
Zero server maintenance.

📁 Environment Variables
None required.
The project is completely client-side and uses the public PubChem API.


📝 License
MIT License — free to use, modify, and build upon.

👤 Author
Abiodun — Phenomenal Softwares
Tech entrepreneur, software developer, and digital creator.