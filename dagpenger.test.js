const kalkulerDagpenger = require('./dagpenger');

test('Kalkuler dagpenger (fra oppgave i epost)', () => {
    expect(kalkulerDagpenger([500000, 450000, 400000])).toBe(1924);
});

test('Kalkuler dagpenger (gjennomsnittlig inntekt siste 3 år over 3G men under 6G)', () => {
    expect(kalkulerDagpenger([10000, 250000, 175000])).toBe(558);
});

// Maks sats for dagpenger er 2573NOK - (6 * grunnbeløp / 260)

test('Kalkuler dagpenger (inntekt siste år over 6G)', () => {
    expect(kalkulerDagpenger([700000, 450000, 360000])).toBe(2573);
});

test('Kalkuler dagpenger (gjennomsnittlig inntekt siste 3 år over 6G)', () => {
    expect(kalkulerDagpenger([650000, 700000, 700000])).toBe(2573);
});

// Dersom søker ikke har rett på dagpenger, så returneres 0NOK

test('Kalkuler dagpenger (ikke rett til dagpenger)', () => {
    expect(kalkulerDagpenger([50000, 35000, 9000])).toBe(0);
});
