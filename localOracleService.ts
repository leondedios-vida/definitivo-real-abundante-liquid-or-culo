
import { KinData, OracleRevelation } from "../types";
import { getStaticRevelation } from "../data/staticOracle";

export const getOracleRevelation = async (kin: KinData, userName: string): Promise<OracleRevelation> => {
  // Simulamos un tiempo de espera para mantener la solemnidad y el "peso" del cálculo
  // aunque el cálculo local es instantáneo.
  await new Promise(resolve => setTimeout(resolve, 1800));

  const revelationData = getStaticRevelation(kin.sealIndex, kin.toneIndex);

  // Personalización ligera basada en el nombre para mantener la conexión humana
  // Si el nombre es corto, lo integramos al principio de la identidad a veces, o simplemente devolvemos la frase pura.
  // Para mantenerlo "sobrio", devolvemos la frase arquetípica pura, que es más potente.
  
  return {
    identityPhrase: revelationData.identityPhrase,
    mysteryHook: revelationData.mysteryHook
  };
};
