
export interface KinData {
  kinNumber: number;
  sealName: string;
  toneName: string;
  sealIndex: number;
  toneIndex: number;
  color: string;
}

export interface OracleRevelation {
  identityPhrase: string; // La validación (Quién eres)
  mysteryHook: string;    // El gancho de venta (La sombra/El deseo)
}

export interface ReadingResult {
  kin: KinData;
  revelation: OracleRevelation;
  userName: string;
}
