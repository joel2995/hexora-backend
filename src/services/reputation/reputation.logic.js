export function calculateReputation(metrics) {
  const {
    recentStakeVolume,
    stakeGrowthRate,
    newHolders,
    holderRetention,
    accountAgeDays,
    volatility
  } = metrics;

  let influenceScore =
    recentStakeVolume * 0.3 +
    stakeGrowthRate * 0.25 +
    newHolders * 0.25 +
    (1 - volatility) * 20;

  influenceScore = Math.min(100, Math.max(0, influenceScore));

  let trustScore =
    accountAgeDays * 0.2 +
    holderRetention * 40 +
    (1 - volatility) * 25 +
    recentStakeVolume * 0.15;

  trustScore = Math.min(100, Math.max(0, trustScore));

  return {
    influenceScore: Math.round(influenceScore),
    trustScore: Math.round(trustScore)
  };
}
