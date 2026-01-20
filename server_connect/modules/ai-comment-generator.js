/**
 * AI-Powered German Comment Generator (KommentarKI™)
 *
 * Generates authentic, passive-aggressive German code comments
 * for that true enterprise development experience.
 *
 * HINWEIS: Diese Kommentare wurden von einer KI generiert, die mehr
 * Erfahrung mit deutschem Unternehmenscode hat als die meisten Menschen.
 * Die Passiv-Aggressivität ist ein Feature, kein Bug. 🙃
 */

'use strict';

// Comment templates by aggression level
const COMMENTS = {
    FRIENDLY: [
        'HINWEIS: Dieser Code wurde sorgfältig geschrieben und gut dokumentiert. Viel Erfolg bei der Weiterentwicklung! 😊',
        'KOMMENTAR: Eine elegante Lösung für ein komplexes Problem. Gut gemacht!',
        'ANMERKUNG: Die folgende Funktion ist gut strukturiert und leicht verständlich.',
        'TIPP: Bei Fragen steht das Team gerne zur Verfügung.',
        'NOTIZ: Dieser Abschnitt wurde mit Sorgfalt und Liebe zum Detail implementiert.'
    ],

    NEUTRAL: [
        'HINWEIS: Dieser Code implementiert die Geschäftslogik wie spezifiziert.',
        'KOMMENTAR: Siehe Dokumentation für weitere Details.',
        'ANMERKUNG: Die Parameter sind in der Funktionssignatur beschrieben.',
        'NOTIZ: Änderungen erfordern entsprechende Tests.',
        'INFO: Dieser Code wurde am {{DATE}} zuletzt geändert.'
    ],

    PASSIVE_AGGRESSIVE: [
        'HINWEIS: Dieser Code wurde von jemandem geschrieben, der offensichtlich nie die Dokumentation gelesen hat. Ändern Sie nichts, es sei denn, Sie möchten die nächsten drei Sprints damit verbringen, es zu debuggen. Viel Spaß. 🙃',
        'KOMMENTAR: Falls Sie sich fragen, warum das so kompliziert ist: Ich auch. Der ursprüngliche Entwickler ist nicht mehr erreichbar. Viel Glück.',
        'WARNUNG: Dieser Code funktioniert. Fragen Sie nicht wie oder warum. Akzeptieren Sie es einfach wie den Montagmorgen im Büro.',
        'ACHTUNG: Die Variable unten hat keinen sinnvollen Namen, weil niemand mehr weiß, was sie macht. Sie zu umbenennen würde 47 andere Module zerstören.',
        'ANMERKUNG: Ja, das ist ein Workaround. Ja, es ist hässlich. Ja, es ist seit 2003 in Produktion. Nein, wir werden es nicht ändern.',
        'NOTIZ: Der letzte Entwickler, der diesen Code "verbessern" wollte, arbeitet jetzt in einer Bäckerei. Nur so als Info.',
        'HINWEIS: Wenn Sie das lesen, haben Sie wahrscheinlich einen Bug gefunden. Herzlichen Glückwunsch. Fügen Sie sich der langen Liste der Menschen hinzu, die diesen Code nicht verstehen.',
        'KOMMENTAR: Diese Methode macht genau das, was der Name vermuten lässt. Ha, nur Spaß. Sie macht etwas völlig anderes.',
        'TIPP: Bevor Sie diesen Code ändern, aktualisieren Sie bitte Ihren Lebenslauf. Vertrauen Sie mir.',
        'WARNUNG: Die folgende Logik wurde während einer Nachtschicht nach dem vierten Kaffee geschrieben. Entsprechend ist die Qualität.'
    ],

    FULL_GERMAN_DEVELOPER: [
        'HINWEIS: Dieser Code entspricht nicht den DIN-Normen für Softwareentwicklung, aber er funktioniert, was mehr ist als wir von der Spezifikation sagen können.',
        'KOMMENTAR: Die Anforderungen wurden dreimal geändert, während dieser Code geschrieben wurde. Das erklärt... vieles.',
        'WARNUNG: Ordnung muss sein, aber bei diesem Code haben wir eine Ausnahme gemacht. Die Deadline war wichtiger.',
        'ACHTUNG: Dieser Code wurde pünktlich geliefert. Dass er funktioniert, war ein Bonus.',
        'ANMERKUNG: Nach ISO 9001 müsste dieser Code dokumentiert sein. Nach unserer Deadline musste er nur existieren.',
        'NOTIZ: Der Architekt wollte das eleganter lösen. Der Kunde wollte es gestern. Raten Sie mal, wer gewonnen hat.',
        'HINWEIS: Dieser Code wurde von einem Team geschrieben, das unterschiedliche Meinungen über Einrückung hatte. Akzeptieren Sie die Vielfalt.',
        'KOMMENTAR: In einer perfekten Welt wäre dieser Code refactored. In dieser Welt haben wir Budgets und Zeitpläne.',
        'WARNUNG: Die Komplexität dieses Codes ist proportional zur Anzahl der Stakeholder-Meetings, die wir hatten.',
        'TIPP: Falls Sie in der Dokumentation nach Erklärungen suchen: Wir auch.'
    ],

    KLAUS_MODE: [
        'HINWEIS: Klaus hat das 1997 geschrieben. Klaus ist jetzt in Rente. Klaus hat keine E-Mail-Adresse. Klaus ist unerreichbar. Klaus hat gewonnen. 🏆',
        'KOMMENTAR: Das war Klausens Idee. Klaus sagte, es sei "vorläufig". Das war vor 27 Jahren. Es ist jetzt permanent.',
        'WARNUNG: Klausens Code. Klausens Regeln. Klausens Rache an allen, die nach ihm kamen.',
        'ACHTUNG: Klaus hat gesagt: "Das versteht eh keiner außer mir." Klaus hatte Recht. Klaus ist ein Prophet.',
        'ANMERKUNG: Dieser Code hat drei Generationen von Entwicklern überlebt. Er wird auch Sie überleben. Klaus sei Dank.',
        'NOTIZ: Klaus hat keine Kommentare geschrieben, weil er meinte, "der Code erklärt sich selbst". Klaus lag falsch. Klaus ist aber nicht mehr hier, um das zu korrigieren.',
        'HINWEIS: Jeder Versuch, Klausens Code zu verstehen, führt zu drei neuen Bugs und einer Krise. Fragen Sie nicht warum. Fragen Sie Klaus. Oh warte, Sie können nicht.',
        'KOMMENTAR: Klaus hat diese Variable "temp" genannt... im Jahr 1998. Sie ist immer noch "temp". Sie wird für immer "temp" bleiben. So ist es. So war es immer.',
        'WARNUNG: Die Schleife unten macht keinen Sinn. Sie hat nie Sinn gemacht. Klaus behauptete, sie sei "optimiert". Für was, hat er nie gesagt.',
        'TIPP: Wenn Sie verzweifelt sind, zünden Sie eine Kerze für Klaus an. Es wird nicht helfen, aber es fühlt sich angemessen an. 🕯️'
    ]
};

// Context-specific comment additions
const CONTEXT_ADDITIONS = {
    'BAPI': ' BAPIs sind wie normale Funktionen, nur mit mehr Meetings vorher.',
    'RFC': ' RFC steht für "Remote Function Call", aber auch für "Reason For Confusion".',
    'IDOC': ' IDOCs: Weil EDI nicht kompliziert genug war.',
    'transport': ' Transport Requests: Wie russisches Roulette, nur mit mehr Papierarbeit.',
    'debug': ' Debuggen in SAP ist wie Archäologie, nur ohne die Aufregung.',
    'production': ' Production-Code: Berühren Sie ihn und Sie berühren Ihre Kündigung.',
    'test': ' Dieser Test testet nichts Sinnvolles, aber er ist grün und das ist alles, was zählt.',
    'performance': ' Optimiert für maximale Verwirrung, nicht für Geschwindigkeit.',
    'security': ' Sicherheit durch Unverständlichkeit: Niemand kann hacken, was niemand versteht.',
    'migration': ' Migration: Wenn Sie dachten, es könnte nicht schlimmer werden.'
};

// Emoji sets by mood
const EMOJIS = {
    FRIENDLY: ['😊', '👍', '✨', '🌟', '💪'],
    NEUTRAL: ['📝', '📋', '🔧', '⚙️', '📌'],
    PASSIVE_AGGRESSIVE: ['🙃', '😅', '🤷', '💀', '🔥', '⚰️'],
    FULL_GERMAN_DEVELOPER: ['📊', '📈', '🏭', '⏰', '📁'],
    KLAUS_MODE: ['👴', '🕯️', '🏆', '🎭', '⚡', '🌪️']
};

/**
 * Generate a German comment
 * @param {string} aggressionLevel - The aggression level
 * @param {string} context - Optional context for the comment
 * @param {boolean} includeEmoji - Whether to include emoji
 */
function generate(aggressionLevel = 'PASSIVE_AGGRESSIVE', context = null, includeEmoji = true) {
    // Get comments for the specified level
    const levelComments = COMMENTS[aggressionLevel] || COMMENTS.PASSIVE_AGGRESSIVE;

    // Pick a random comment
    let comment = levelComments[Math.floor(Math.random() * levelComments.length)];

    // Replace date placeholder if present
    comment = comment.replace('{{DATE}}', new Date().toISOString().split('T')[0]);

    // Add context-specific addition if applicable
    if (context) {
        const contextLower = context.toLowerCase();
        for (const [key, addition] of Object.entries(CONTEXT_ADDITIONS)) {
            if (contextLower.includes(key.toLowerCase())) {
                comment += addition;
                break;
            }
        }
    }

    // Add emoji if requested
    if (includeEmoji) {
        const emojiSet = EMOJIS[aggressionLevel] || EMOJIS.PASSIVE_AGGRESSIVE;
        const emoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        if (!comment.includes(emoji)) {
            comment += ' ' + emoji;
        }
    }

    return comment;
}

/**
 * Generate a complete ABAP comment block
 */
function generateAbapBlock(aggressionLevel = 'PASSIVE_AGGRESSIVE', context = null) {
    const mainComment = generate(aggressionLevel, context, true);
    const lines = mainComment.match(/.{1,60}/g) || [mainComment];

    let block = '*&---------------------------------------------------------------------*\n';
    lines.forEach(line => {
        block += `*& ${line}\n`;
    });
    block += '*&---------------------------------------------------------------------*';

    return block;
}

/**
 * Generate multiple comments for documentation
 */
function generateDocumentation(aggressionLevel = 'PASSIVE_AGGRESSIVE', count = 5) {
    const docs = [];
    for (let i = 0; i < count; i++) {
        docs.push({
            index: i + 1,
            comment: generate(aggressionLevel, null, true),
            type: aggressionLevel
        });
    }
    return docs;
}

/**
 * Get available aggression levels
 */
function getAggressionLevels() {
    return Object.keys(COMMENTS).map(level => ({
        id: level,
        name: level.replace(/_/g, ' '),
        sampleComment: COMMENTS[level][0]
    }));
}

module.exports = {
    generate,
    generateAbapBlock,
    generateDocumentation,
    getAggressionLevels,
    COMMENTS,
    CONTEXT_ADDITIONS,
    EMOJIS
};
