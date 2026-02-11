
import { SEALS, TONES, SEAL_COLORS } from '../constants';
import { KinData } from '../types';

/**
 * Calculates the Kin for a given birthdate using the Dreamspell correlation.
 * In Dreamspell, February 29th is NOT counted in the Tzolkin cycle.
 */
export const calculateKin = (birthdate: string): KinData => {
  const targetDate = new Date(birthdate + 'T12:00:00Z');
  
  // Reference: July 26, 2023 is Kin 174 (Wizard 5)
  const refDate = new Date('2023-07-26T12:00:00Z');
  const refKin = 174;

  const countDaysExcludingLeap = (start: Date, end: Date): number => {
    let days = 0;
    const current = new Date(start);
    const step = start < end ? 1 : -1;

    // Iterate day by day
    while (current.toISOString().split('T')[0] !== end.toISOString().split('T')[0]) {
      const isFeb29 = current.getUTCMonth() === 1 && current.getUTCDate() === 29;
      if (!isFeb29) {
        days += step;
      }
      current.setUTCDate(current.getUTCDate() + step);
    }
    return days;
  };

  const diffDays = countDaysExcludingLeap(refDate, targetDate);
  
  let kin = (refKin + diffDays) % 260;
  while (kin <= 0) kin += 260;

  // Seal is (Kin - 1) % 20
  const sealIndex = (kin - 1) % 20;
  // Tone is (Kin - 1) % 13
  const toneIndex = (kin - 1) % 13;
  // Color sequence: Red, White, Blue, Yellow (starting from Dragon=Red)
  const colorIndex = sealIndex % 4;

  return {
    kinNumber: kin,
    sealName: SEALS[sealIndex],
    toneName: TONES[toneIndex],
    sealIndex,
    toneIndex,
    color: SEAL_COLORS[colorIndex]
  };
};
