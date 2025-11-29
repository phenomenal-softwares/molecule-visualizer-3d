export function parseMolecule(json) {
  if (!json || !json.PC_Compounds || !json.PC_Compounds[0]) return null;

  const compound = json.PC_Compounds[0];

  // -------------------------------
  // 1. Extract METADATA
  // -------------------------------

  const props = compound.props || [];

  const getProp = (urnLabel) => {
    const p = props.find(
      (x) =>
        x.urn &&
        (x.urn.label || "").toLowerCase() === urnLabel.toLowerCase()
    );
    if (!p) return null;
    return p.value?.sval || p.value?.fval || p.value?.ival || null;
  };

  const metadata = {
    name: compound?.props?.find(
      (p) => p.urn?.label === "IUPAC Name"
    )?.value?.sval || compound?.id?.id?.cid || "",
    molecularWeight: getProp("Molecular Weight"),
    cid: compound?.id?.id?.cid || null,
    properties: {},
  };

  // Also gather any additional text properties
  props.forEach((p) => {
    const key = p.urn?.label;
    if (!key) return;

    const val = p.value?.sval || p.value?.fval || p.value?.ival;
    if (val && !["Molecular Formula", "Molecular Weight", "IUPAC Name"].includes(key)) {
      metadata.properties[key] = val;
    }
  });

  // -------------------------------
  // 2. Extract STRUCTURE (atoms, bonds, coords)
  // -------------------------------

  let structure = null;

  try {
    const atoms = compound.atoms.element.map((el, index) => ({
      id: compound.atoms.aid[index],
      element: el,
    }));

    const bonds = compound.bonds.aid1.map((_, index) => ({
      from: compound.bonds.aid1[index],
      to: compound.bonds.aid2[index],
      order: compound.bonds.order[index],
    }));

    const coords = compound.coords?.[0]?.conformers?.[0];
    if (!coords) throw new Error("No 3D coords found");

    const positions = {
      x: coords.x,
      y: coords.y,
      z: coords.z,
    };

    structure = { atoms, bonds, positions };
  } catch (err) {
    console.warn("No 3D structure available for this compound.");
    console.log(err);
  }

  // -------------------------------
  // 3. Final return
  // -------------------------------
  return {
    metadata,
    structure,
  };
}
