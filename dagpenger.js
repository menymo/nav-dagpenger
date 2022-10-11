// Grunnbeløp for 2022, må endres 1. mai hvert år
const grunnbelop = 111477.0

/**
 * Kalkuler satser for dagpenger basert på siste 1 eller 3 års inntekt
 * Siste 3 års inntekt skal være i parametrene i synkende rekkefølge
 * @example
 * kalkulerDagpenger([500000, 450000, 400000])
 * @param inntekter Array med 3 numeriske verdier, inntekt per år i synkende rekkefølge
 * @returns {number} Dagsats for dagpenger rundet opp til nærmeste hele krone, 0 dersom søker ikke har rett til dagpenger
 */
function kalkulerDagpenger(inntekter) {
    // Returner 0 om inntektene ikke gir rett til dagpenger
    if (!kalkulerRettTilDagpenger(inntekter)) {
        return 0
    }

    // Total og gjennomsnittlig årsinntekt regnet fra de 3 siste kalenderårene
    const totalInntekt = inntekter[0] + inntekter[1] + inntekter[2]
    const gjennomsnittligInntekt = totalInntekt / 3

    // Dagpengegrunnlaget kan ikke overstige 6G, både på siste årsinntekt og gjennomsnittlig årsinntekt
    if (gjennomsnittligInntekt > 6 * grunnbelop || inntekter[0] > 6 * grunnbelop) {
        return Math.ceil((6 * grunnbelop) / 260)
    }

    // Om siste års inntekt er høyere enn gjennomsnittsinntekt de siste 3 årene, regn dagpenger basert på kun det siste året
    if (inntekter[0] > gjennomsnittligInntekt) {
        // Om grunnlag for dagpenger er mindre enn 6G, så er satsen siste års inntekt delt på 260 dager
        return Math.ceil(inntekter[0] / 260)
    }

    // Om siste års inntekt er lavere enn gjennomsnittsinntekt siste 3 år, regn dagpenger basert på gjennomsnittlig årsinntekt.
    // Gjennomsnittlig årsinntekt delt på 260 dager
    return Math.ceil(gjennomsnittligInntekt / 260)
}

/**
 * Kalkuler retten til dagpenger basert på siste 1 eller 3 års inntekt
 * Parametret skal være en array med inntekter i synkende rekkefølge basert på år, kun 3 verdier
 * @param inntekter Array med 3 numeriske verdier, inntekt per år i synkende rekkefølge
 * @returns {boolean} Har søker rett til dagpenger?
 */
function kalkulerRettTilDagpenger(inntekter) {
    // Inntekt på 1.5G det siste kalenderåret skal gi rett til dagpenger
    if (inntekter[0] > 1.5 * grunnbelop) {
        return true
    }

    // Inntekt på 3G de siste 3 kalenderårene skal gi rett til dagpenger
    if (inntekter[0] + inntekter[1] + inntekter[2] > 3 * grunnbelop) {
        return true
    }

    // Fallback dersom ingen av disse reglene er oppfylt
    return false
}

console.log(kalkulerDagpenger([500000, 450000, 400000]))

module.exports = kalkulerDagpenger
