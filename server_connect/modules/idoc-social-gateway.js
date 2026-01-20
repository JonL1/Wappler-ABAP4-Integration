/**
 * IDOC Social Gateway
 *
 * Stream your SAP IDOCs directly to social media platforms.
 * Because your Material Master changes deserve an audience.
 *
 * HINWEIS: Niemand hat nach diesem Feature gefragt. Wir haben es trotzdem gebaut.
 * Das ist Innovation. Das ist Disruption. Das ist unser Lebenslauf. 🚀
 */

'use strict';

// Supported social platforms
const PLATFORMS = {
    tiktok: {
        name: 'TikTok',
        icon: '📱',
        maxDuration: 180,
        defaultHashtags: ['#SAPLife', '#DigitalTransformation', '#ABAP4Ever'],
        filters: ['SYNERGY_SPARKLE', 'ENTERPRISE_BLUR', 'CONSULTANT_GLOW', 'LEGACY_SEPIA', 'AGILE_RAINBOW'],
        music: [
            { id: 'corporate_beats_vol3', title: 'Corporate Beats Vol. 3' },
            { id: 'synergy_symphony', title: 'Synergy Symphony' },
            { id: 'abap_anthem', title: 'The ABAP Anthem' },
            { id: 'sap_note_0001', title: 'SAP Note 0001 (The Original)' },
            { id: 'dialup_nostalgia', title: 'Sound of Dial-up Modem' }
        ]
    },
    instagram: {
        name: 'Instagram Reels',
        icon: '📸',
        maxDuration: 90,
        defaultHashtags: ['#SAPLife', '#EnterpriseLife', '#CodingLife']
    },
    linkedin: {
        name: 'LinkedIn',
        icon: '💼',
        defaultHashtags: ['#DigitalTransformation', '#Enterprise', '#SAP', '#ThoughtLeadership'],
        features: {
            thoughtLeadership: true,
            buzzwordInjection: 'MAXIMUM',
            humbleBrag: true
        }
    },
    twitter: {
        name: 'X (formerly Twitter, formerly useful)',
        icon: '🐦',
        maxLength: 280,
        defaultHashtags: ['#SAP', '#Tech']
    },
    fax: {
        name: 'Fax Machine',
        icon: '📠',
        baudRate: 9600,
        description: 'For enterprises not ready to let go'
    }
};

// IDOC to social media content templates
const CONTENT_TEMPLATES = {
    MATMAS05: {
        title: 'Material Master Update',
        template: '🏭 New Material Alert! Just created/updated material {{MATNR}} in SAP. {{MAKTX}} is now live! #MaterialMaster #SAPLife',
        viralPotential: 'LOW',
        engagementFactor: 0.001
    },
    DEBMAS07: {
        title: 'Customer Master Update',
        template: '🤝 Customer Update! {{KUNNR}} - {{NAME1}} data refreshed in the system. Building those relationships! #CustomerFirst',
        viralPotential: 'VERY_LOW',
        engagementFactor: 0.0001
    },
    CREMAS05: {
        title: 'Vendor Master Update',
        template: '📦 Supply Chain Alert! Vendor {{LIFNR}} updated. Procurement excellence in action! #SupplyChain',
        viralPotential: 'NONE',
        engagementFactor: 0.00001
    },
    ORDERS05: {
        title: 'Purchase Order',
        template: '💸 PO Created! Just dropped {{BSTNR}} for some enterprise goods. Business is booming! #Procurement',
        viralPotential: 'ACCIDENTAL_MEME_POTENTIAL',
        engagementFactor: 0.1
    },
    INVOIC02: {
        title: 'Invoice',
        template: '💰 Invoice Time! Processing invoice {{BELNR}}. Money moves! #Finance #Invoicing',
        viralPotential: 'FINANCE_TWITTER_ONLY',
        engagementFactor: 0.05
    },
    HRMD_A07: {
        title: 'HR Master Data',
        template: '👤 Team Update! HR data synchronized. Our people are our greatest asset! #HR #PeopleFirst',
        viralPotential: 'LINKEDIN_GOLD',
        engagementFactor: 0.3
    }
};

/**
 * Process IDOC and stream to social media
 * WARNUNG: Diese Funktion postet tatsächlich nicht auf TikTok.
 * Aber sie schreibt "SUCCESS" in die Logs und das reicht für das Management.
 */
async function processWithSocialStream(params) {
    const idocType = params.idoc_type;
    const data = params.data;

    console.log('📨 Processing IDOC:', idocType);
    console.log('   Social streaming: ' + (params.tiktok_stream ? 'ENABLED' : 'DISABLED'));

    // Generate IDOC processing result
    const idocResult = {
        success: true,
        idocType: idocType,
        idocNumber: 'IDOC-' + Date.now(),
        status: 'PROCESSED',
        segments: generateFakeSegments(idocType),
        controlRecord: {
            DOCNUM: Date.now().toString(),
            DOCTYP: idocType,
            MESTYP: idocType.substring(0, 6),
            SNDPOR: 'SAPWAPPLER',
            SNDPRT: 'LS',
            SNDPRN: 'WAPPLER_SYSTEM',
            RCVPOR: 'TIKTOK_RFC',
            RCVPRT: 'KU',
            RCVPRN: 'SOCIAL_MEDIA'
        }
    };

    // Stream to social media if enabled
    if (params.tiktok_stream) {
        idocResult.socialMedia = await streamToSocial({
            idocType: idocType,
            data: data,
            platform: 'tiktok',
            hashtags: params.tiktok_hashtags || PLATFORMS.tiktok.defaultHashtags.join(' '),
            music: params.tiktok_music || 'corporate_beats_vol3',
            filter: params.tiktok_filter || 'SYNERGY_SPARKLE'
        });
    }

    return idocResult;
}

/**
 * Stream content to social media platform
 */
async function streamToSocial(options) {
    const platform = PLATFORMS[options.platform] || PLATFORMS.tiktok;
    const template = CONTENT_TEMPLATES[options.idocType] || CONTENT_TEMPLATES.MATMAS05;

    console.log('🎬 Streaming to ' + platform.name + '...');
    console.log('   ' + platform.icon + ' Filter: ' + options.filter);
    console.log('   🎵 Music: ' + options.music);
    console.log('   #️⃣  Hashtags: ' + options.hashtags);

    // Generate the social media "post"
    const post = {
        platform: options.platform,
        status: 'PUBLISHED', // (not really)
        url: generateFakeUrl(options.platform),
        content: {
            text: processTemplate(template.template, options.data),
            hashtags: options.hashtags.split(' '),
            filter: options.filter,
            music: options.music,
            duration: platform.maxDuration || 60
        },
        metrics: {
            predictedViews: Math.floor(Math.random() * 1000000),
            predictedLikes: Math.floor(Math.random() * 100000),
            predictedComments: Math.floor(Math.random() * 10000),
            viralPotential: template.viralPotential,
            synergyScore: 9001
        },
        metadata: {
            postedAt: new Date().toISOString(),
            idocType: options.idocType,
            enterprise: true,
            digitalTransformation: 'ACHIEVED'
        }
    };

    console.log('   📊 Predicted engagement: ' + post.metrics.predictedViews + ' views');
    console.log('   ✅ Stream complete (probably)');

    return post;
}

/**
 * Generate fake social media URL
 */
function generateFakeUrl(platform) {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    switch (platform) {
        case 'tiktok': return `https://tiktok.com/@sap_enterprise/video/${id}`;
        case 'instagram': return `https://instagram.com/reel/${id}`;
        case 'linkedin': return `https://linkedin.com/posts/sap-thought-leader_${id}`;
        case 'twitter': return `https://x.com/sap_enterprise/status/${id}`;
        case 'fax': return `fax://+1-555-SAP-HELP/doc/${id}`;
        default: return `https://enterprise.social/${id}`;
    }
}

/**
 * Process content template with data
 */
function processTemplate(template, data) {
    let result = template;
    if (data) {
        Object.keys(data).forEach(key => {
            result = result.replace(`{{${key}}}`, data[key] || '???');
        });
    }
    // Replace any remaining placeholders
    result = result.replace(/\{\{[^}]+\}\}/g, '[ENTERPRISE_DATA]');
    return result;
}

/**
 * Generate fake IDOC segments for demo purposes
 */
function generateFakeSegments(idocType) {
    const baseSegments = [
        { name: 'E1HEAD', data: { MSGFN: '009', SYNERGY: 'MAXIMUM' } },
        { name: 'E1DATA', data: { ENTERPRISE: 'TRUE', QUANTUM: 'ENABLED' } }
    ];

    if (idocType.startsWith('MATMAS')) {
        baseSegments.push(
            { name: 'E1MARAM', data: { MATNR: 'WAPPLER-001', MTART: 'FERT' } },
            { name: 'E1MAKTM', data: { MAKTX: 'Quantum Synergy Module', SPRAS: 'EN' } }
        );
    }

    return baseSegments;
}

/**
 * Get social platform configuration
 */
function getPlatformConfig(platform) {
    return PLATFORMS[platform] || null;
}

/**
 * Get all supported platforms
 */
function getSupportedPlatforms() {
    return Object.keys(PLATFORMS).map(key => ({
        id: key,
        ...PLATFORMS[key]
    }));
}

module.exports = {
    processWithSocialStream,
    streamToSocial,
    getPlatformConfig,
    getSupportedPlatforms,
    PLATFORMS,
    CONTENT_TEMPLATES
};
