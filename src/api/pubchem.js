// Step 1: Resolve a name to CID if needed
export async function resolveCID(name) {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/cids/JSON`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("CID lookup failed");

    const json = await response.json();
    const cid = json.IdentifierList?.CID?.[0] || null;
    if (!cid) throw new Error("No CID found for given name");
    return cid;
  } catch (err) {
    console.error("CID resolution error:", err);
    return null;
  }
}

// Step 2: Fetch metadata (formula, weight, IUPAC, SMILES, etc.) by CID
export async function fetchMetadata(cid) {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/` +
                `MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES,InChI,InChIKey/JSON`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Metadata not found");

    const json = await response.json();
    const props = json.PropertyTable?.Properties?.[0] || null;
    return props;
  } catch (err) {
    console.error("PubChem metadata error:", err);
    return null;
  }
}

// Step 3: Fetch 3D structure / coordinates by CID
export async function fetch3D(cid) {
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/JSON?record_type=3d`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("3D structure not found");

    const json = await response.json();
    return json;
  } catch (err) {
    console.error("PubChem 3D fetch error:", err);
    return null;
  }
}

// Step 4: Unified fetcher: gets both metadata + 3D structure
export async function fetchFullMolecule(query) {
  // If query is a number, assume it's a CID; otherwise resolve name → CID
  const cid = isNaN(query) ? await resolveCID(query) : query;
  if (!cid) {
    console.error(`Unable to resolve CID for query: ${query}`);
    return null;
  }

  const [metadata, structure] = await Promise.all([
    fetchMetadata(cid),
    fetch3D(cid)
  ]);

  if (!metadata && !structure) {
    console.error(`No data found for CID: ${cid}`);
    return null;
  }

  return { cid, metadata, structure };
}
