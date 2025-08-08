export const GENERAL_COPY = {
    NAME: "Booths",
    LINKS: [
        {
            name: "Home",
            link: "home",
        },
        {
            name: "Features",
            link: "features",
        },
        {
            name: "Nature ",
            link: "nature",
        },
        {
            name: "Background",
            link: "background",
        },
        {
            name: "Get Going",
            link: "get-going",
        }
    ]
}

export const WELCOME_COPY = {
    HEADLINE: `"For a seven day period you shall live in booths"`,
    HEADLINE_SUFFIX: "(leviticus 23:40)",
    // SUBTEXT: "Here to support your journey with Life, to support the pursuit for liberation",
    SUBTEXT: "Providing structure to support your journey with Life, and the pursuit for liberation",
    // SUBTEXT: "Your time is sacred. Your attention is precious. Let Shelters be your gentle companion.",
    CTA: "Begin Your Journey",
}

export const OPENING_INTENTION_COPY = {
    TEXT: "I want to provide a space, rich with peace, posied to help you connect with what you believe. I want to start cultivating a community of people living meaningfully, so we can take steps into the unknown together 🙂"
}

export const FEATURES_COPY = {
    HEADING: "Core Features",
    FEATURES: [
        {
            name: "Booths",
            description: "Compartmentalised growth, contained within separate booths to support focus and effective organisation",
            inscription: "For a seven day period you shall live in booths",
            emblem: (
                <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    {/* Main shelter structure */}
                    <path d="M4 32 L4 20 L20 12 L36 20 L36 32 L20 40 Z" stroke="white" strokeWidth="2" fill="none" />

                    {/* Central sacred space */}
                    <rect x="14" y="24" width="12" height="8" stroke="white" strokeWidth="1" fill="none" />

                    {/* Sacred flame/light at the peak */}
                    <path d="M20 8 L18 4 Q20 2 22 4 L20 8" stroke="white" strokeWidth="1" fill="white" opacity="0.8" />

                    {/* Foundation line */}
                    <line x1="20" y1="16" x2="20" y2="38" stroke="white" strokeWidth="1" opacity="0.6" />
                </svg>
            ),
            bg: "from-spiritual-crimson-to-spiritual-purple"

        },
        {
            name: "Roadmapping",
            description: "Outline the path to your success, broken down sustainably",
            inscription: "And you shall inscribe them upon the doorposts of your house and upon your gates.",
            emblem: (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3"></path>
                </svg>
            ),
            bg: "from-spiritual-crimson-to-spiritual-blue"
        },
        {
            name: "Cycling",
            description: "Organise your work into iterative, flexible flows to support your journey",
            inscription: "Six days you may do your work, but on the seventh day you shall rest, in order that the ox and your donkey shall rest, and your maidservant's son and the stranger shall be refreshed.",
            emblem: (


                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.5-5 6-5 4.5 0 6 3 6 5 2-1 2.5-3.5 2.5-3.5a8 8 0 01-5.843 11.157z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v3" />
                </svg>
            ),
            bg: "from-spiritual-blue-to-spiritual-purple"

        },
        {
            name: "Journalling",
            description: "Have a space to introspect and express yourself meaningfully.",
            inscription: "And you shall speak of them...",
            emblem: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bg: "from-spiritual-blue-to-spiritual-crimson"
        },
        {
            name: "Time Tracking",
            description: "Allocate time towards that which is important to you and track this effectively",
            inscription: "This month shall be to you the head of the months; to you it shall be the first of the months of the year.",
            emblem: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bg: "from-spiritual-crimson-to-spiritual-blue"
        },
        {
            name: "Sabbaticals",
            description: "Supporting your pursuit of leisure, to take time to rest and reflect",
            inscription: "Remember the Sabbath day to sanctify it.",
            emblem: (
                <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    {/* Left candle */}
                    <g stroke="white" strokeWidth="1.5" fill="white" opacity="0.8">
                        <rect x="13" y="20" width="3" height="16" /> {/* candle body */}
                        <rect x="12" y="35" width="5" height="2" /> {/* base */}
                    </g>

                    {/* Right candle */}
                    <g stroke="white" strokeWidth="1.5" fill="white" opacity="0.8">
                        <rect x="24" y="20" width="3" height="16" /> {/* candle body */}
                        <rect x="23" y="35" width="5" height="2" /> {/* base */}
                    </g>

                    {/* Left flame */}
                    <g stroke="white" strokeWidth="1" fill="white" opacity="0.9">
                        <path d="M14.5 18 Q13 16 13.5 14 Q14 15 15 15 Q16 14 15.5 16 Q16 18 14.5 18 Z" />
                    </g>

                    {/* Right flame */}
                    <g stroke="white" strokeWidth="1" fill="white" opacity="0.9">
                        <path d="M25.5 18 Q24 16 24.5 14 Q25 15 26 15 Q27 14 26.5 16 Q27 18 25.5 18 Z" />
                    </g>

                    {/* Warm glow around flames */}
                    <g stroke="white" strokeWidth="0.5" fill="none" opacity="0.3">
                        <circle cx="14.5" cy="16" r="4" />
                        <circle cx="25.5" cy="16" r="4" />
                    </g>

                    {/* Gentle light rays */}
                    <g stroke="white" strokeWidth="0.8" opacity="0.4">
                        <path d="M14.5 12 L14.5 8" strokeLinecap="round" />
                        <path d="M11 14 L8 12" strokeLinecap="round" />
                        <path d="M18 14 L21 12" strokeLinecap="round" />
                        <path d="M25.5 12 L25.5 8" strokeLinecap="round" />
                        <path d="M29 14 L32 12" strokeLinecap="round" />
                    </g>
                </svg>
            ),
            bg: "from-spiritual-blue-to-spiritual-crimson"
        }
    ]
}


export const NATURE_COPY = {
    HEADING: "The Nature of Booths",
    INSIGHTS: [

        {
            title: "Growth",
            // description: "Compartmnetalised growth, contained within individual booths to support focus and effective organisation",
            description: "The beating heart of intentional growth exists throughout the project",
            dotColor: "crimson"
        },
        {
            title: "Incomplete Acceptance",
            // description: "Radically accepting oneself, incomplete, and embracing .",
            description: "Embracing the incomplete nature of being, and in order to enjoy the journey of progress.",
            dotColor: "blue"
        },
        {
            title: "Selfhood",
            // THE SACRED NATURE OF THE SOUL
            description: "Each person harbours the depth of a world, sacred and unique, use this space to cultivate your relationship with yourself.",
            dotColor: "purple"
        },
        {
            title: "Value-Driven",
            description: "Grounded and rooted in meaning, and values, so that collectively we can intentionally align with the service of Life.",
            dotColor: "blue"
        },



    ],
}

export const BACKGROUND_COPY = {
    HEADING: "Background",
    TEXT: [
        "The pursuit for personal liberation and independence, the means to --live meaningfully-- is often lonely, unsupported and scary.",
        "Existing tools felt rooted in the need for productivity, more than the need for meaning. People are not machines - quantified growth is not better than qualified growth. --The journey should not be neglected. --",
        "The festival of --sukkot commemorates dwelling in booths--, temporary shelters, when leaving Egypt. The instruction to continue to dwell in booths each year is a reminder that the journey of liberation  and meaning takes place in the transient present, often incomplete, --not ideal, but real--, rooted in the sacred journey with Life.",
        "Incomplete, less robust, more rough around the edges, the cultivation of a space rooted in faith began inspired by sukkot and the nature of transience and rugged growth.",
    ]
}
export const INTRA_INTENTION_COPY = {
    TEXT: "Whilst this space is still being built, the core of the project exists, and you are welcome to participate in the journey and join the pursuit of meaning. Incompletion is certain \n \n  the unknown awaits \n \n let the future you cherish the next step you take ❤️",
}
