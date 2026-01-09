const INFLUENCE_COOLDOWN_MINUTES = 15;
const TRUST_COOLDOWN_HOURS = 24;

export function canUpdateInfluence(lastUpdate) {
  if (!lastUpdate) return true;
  return Date.now() - new Date(lastUpdate).getTime() >
    INFLUENCE_COOLDOWN_MINUTES * 60 * 1000;
}

export function canUpdateTrust(lastUpdate) {
  if (!lastUpdate) return true;
  return Date.now() - new Date(lastUpdate).getTime() >
    TRUST_COOLDOWN_HOURS * 60 * 60 * 1000;
}
