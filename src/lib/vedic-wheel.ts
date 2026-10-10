export const rashis = [
  ["मेष", "Mesha", "♈", "Ram"],
  ["वृषभ", "Vrishabha", "♉", "Bull"],
  ["मिथुन", "Mithuna", "♊", "Twins"],
  ["कर्क", "Karka", "♋", "Crab"],
  ["सिंह", "Simha", "♌", "Lion"],
  ["कन्या", "Kanya", "♍", "Maiden"],
  ["तुला", "Tula", "♎", "Scales"],
  ["वृश्चिक", "Vrishchika", "♏", "Scorpion"],
  ["धनु", "Dhanu", "♐", "Archer"],
  ["मकर", "Makara", "♑", "Makara"],
  ["कुम्भ", "Kumbha", "♒", "Water bearer"],
  ["मीन", "Meena", "♓", "Fish"],
] as const;

// The shortest signed arc keeps dragging continuous across the atan2 seam.
export function angularDelta(previous: number, current: number) {
  return ((current - previous + 540) % 360) - 180;
}