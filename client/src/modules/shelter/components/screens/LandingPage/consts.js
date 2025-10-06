export const GENERAL_COPY = {
    NAME: "Booths",
    LINKS: [
        {
            name: "Booths",
            link: "home",
        },
        {
            name: "Features",
            link: "features",
            fullName: "Core Features",
        },
        {
            name: "Qualities ",
            link: "qualities",
            fullName: "Key Qualities",
        },
        {
            name: "Journey",
            link: "background",
            fullName: "Journey So Far",
        },
        {
            name: "Get Started",
            link: "connect",
            fullName: "Lets Go!",
        }
    ],
    // CONNECTION_TEXT: "May the future you cherish your next steps."
    // CONNECTION_TEXT: "What will your next steps be?"
    // CONNECTION_TEXT: "Lets stay connected!"
    // "What next steps will you take?"
    CONNECTION_TEXT: "start your journey!"
}

export const WELCOME_COPY = {
    HEADLINE: `"For a seven day period you shall live in booths"`,
    HEADLINE_SUFFIX: "(leviticus 23:40)",
    // SUBTEXT: "Here to support your journey with Life, to support the pursuit for liberation",
    // SUBTEXT: "Providing structure to support your journey with Life and your pursuit for liberation",
    SUBTEXT: "An intentional and supportive space dedicated towards helping your pursuit for liberating growth and personal development.",
    // An intentional and supportive space to help extend your pursuit for liberation.

    // SUBTEXT: "Your time is sacred. Your attention is precious. Let Shelters be your gentle companion.",
    CTA: "Begin Your Journey",
    ASTERISK: "'Booths' may be a temporary name, it's unclear what's best to call the project so far!"
}

export const OPENING_INTENTION_COPY = {
    // TEXT: "Let's provide a space rich with peace and posied to help connecting with belief. Let's cultivate a community of people living meaningfully and take steps into the unknown together 🙂"
    // TEXT: "Booths began with the intention of providing a digital space to help nurture the transient journey with Life, and is not purely based on achieving optimal efficiency or productivity."
    // Booths began with the intention of providing a digital space to help nurture the transient journey with Life in a meaningful and enriching manner, and not purely based on achieving optimal efficiency or productivity.
    TEXT: "Digital tools designed to enhance the journey, and not simply maximising efficiency."

}

// cool svg? was cycles.. 
/*

              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.5-5 6-5 4.5 0 6 3 6 5 2-1 2.5-3.5 2.5-3.5a8 8 0 01-5.843 11.157z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v3" />
                </svg>
*/

export const FEATURES_COPY = {
    HEADING: "Core Features",
    FEATURES: [
        {
            name: "Booths",
            description: "Compartmentalise your growth, by creating separate transient booths to support effective organisation and focus.",
            // inscription: "For a seven day period you shall live in booths",
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
            description: "Create pathways for your growth, and break down the journey into tangible achievable chapters as much as you need to support sustainable growth.",
            //  you can break down the path to your success as much as you need to support sustainable growth.",
            // description: "Outline the path to your success and break it down sustainably",
            // inscription: "And you shall inscribe them upon the doorposts of your house and upon your gates.",
            emblem: (
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3"></path>
                </svg>
            ),
            bg: "from-spiritual-crimson-to-spiritual-blue"
        },
        {
            name: "Cyclical task management",
            description: "Organise your work into iterative, flexible flows that support your journey.",
            // inscription: "Six days you may do your work, but on the seventh day you shall rest, in order that the ox and your donkey shall rest, and your maidservant's son and the stranger shall be refreshed.",
                        emblem: (
                <>
                    {/*
                    <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 9 Q27 9 27 16 Q27 23 20 23" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M18 7 L20 9 L18 11" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 25 Q13 25 13 16 Q13 7 20 7" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M22 27 L20 25 L22 23" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="20" cy="16" r="1.5" stroke="white" strokeWidth="1" fill="white" opacity="0.6" />
                        <g stroke="white" strokeWidth="1" opacity="0.3">
                            <path d="M24 12 Q26 12 26 14" strokeLinecap="round" />
                            <path d="M16 20 Q14 20 14 18" strokeLinecap="round" />
                        </g>
                    </svg>
                    */}

                    {/* Seven-spoke wheel with a clear vertical spoke */}
                    <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        {/* Rim */}
                        <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2" fill="none" />

                        {/* Hub */}
                        <circle cx="20" cy="20" r="2" stroke="white" strokeWidth="1" fill="white" opacity="0.9" />

                        {/* Spokes: start with vertical up, then rotate by 360/7 ≈ 51.4286° */}
                        <g stroke="white" strokeWidth="1.5" strokeLinecap="round">
                            <line x1="20" y1="20" x2="20" y2="8" />
                            <line x1="20" y1="20" x2="20" y2="8" transform="rotate(51.4286 20 20)" />
                            <line x1="20" y1="20" x2="20" y2="8" transform="rotate(102.8572 20 20)" />
                            <line x1="20" y1="20" x2="20" y2="8" transform="rotate(154.2858 20 20)" />
                            <line x1="20" y1="20" x2="20" y2="8" transform="rotate(205.7144 20 20)" />
                            <line x1="20" y1="20" x2="20" y2="8" transform="rotate(257.143 20 20)" />
                            <line x1="20" y1="20" x2="20" y2="8" transform="rotate(308.5716 20 20)" />
                        </g>
                    </svg>
                </>
            ),
            bg: "from-spiritual-blue-to-spiritual-purple"

        },
        {
            name: "Journalling",
            // description: "Have a space to introspect and express yourself meaningfully.",
            // description: "Reflect, introspect, express youself freely",
            description: "Capture your reflections, feelings, and consciousness as part of your ongoing journey.",
            // inscription: "And you shall speak of them...",
            emblem: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bg: "from-spiritual-blue-to-spiritual-crimson"
        },
        {
            name: "Time Tracking",
            // description: "Allocate time towards that which is important to you and track this effectively",
            description: "Command time better by allocating it to what is important to help you live more purposefully, intentionally and free.",
            // description: "Allocate your time towards what is important, and take command of your time to live more purposefully, intentional and free.",
            // inscription: "This month shall be to you the head of the months; to you it shall be the first of the months of the year.",
            emblem: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bg: "from-spiritual-crimson-to-spiritual-blue"
        },
        {
            name: "Coming Soon...",
            description: "More features are currently in development!",
            // emblem: (
            //     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            //     </svg>
            // ),
            // bg: "from-spiritual-crimson-to-spiritual-blue"
        }
        // {
        //     name: "Sabbaticals",
        //     description: "Supporting your pursuit of leisure, to take time to rest and reflect",
        //     inscription: "Remember the Sabbath day to sanctify it.",
        //     emblem: (
        //         <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        //             {/* Left candle */}
        //             <g stroke="white" strokeWidth="1.5" fill="white" opacity="0.8">
        //                 <rect x="13" y="20" width="3" height="16" /> {/* candle body */}
        //                 <rect x="12" y="35" width="5" height="2" /> {/* base */}
        //             </g>

        //             {/* Right candle */}
        //             <g stroke="white" strokeWidth="1.5" fill="white" opacity="0.8">
        //                 <rect x="24" y="20" width="3" height="16" /> {/* candle body */}
        //                 <rect x="23" y="35" width="5" height="2" /> {/* base */}
        //             </g>

        //             {/* Left flame */}
        //             <g stroke="white" strokeWidth="1" fill="white" opacity="0.9">
        //                 <path d="M14.5 18 Q13 16 13.5 14 Q14 15 15 15 Q16 14 15.5 16 Q16 18 14.5 18 Z" />
        //             </g>

        //             {/* Right flame */}
        //             <g stroke="white" strokeWidth="1" fill="white" opacity="0.9">
        //                 <path d="M25.5 18 Q24 16 24.5 14 Q25 15 26 15 Q27 14 26.5 16 Q27 18 25.5 18 Z" />
        //             </g>

        //             {/* Warm glow around flames */}
        //             <g stroke="white" strokeWidth="0.5" fill="none" opacity="0.3">
        //                 <circle cx="14.5" cy="16" r="4" />
        //                 <circle cx="25.5" cy="16" r="4" />
        //             </g>

        //             {/* Gentle light rays */}
        //             <g stroke="white" strokeWidth="0.8" opacity="0.4">
        //                 <path d="M14.5 12 L14.5 8" strokeLinecap="round" />
        //                 <path d="M11 14 L8 12" strokeLinecap="round" />
        //                 <path d="M18 14 L21 12" strokeLinecap="round" />
        //                 <path d="M25.5 12 L25.5 8" strokeLinecap="round" />
        //                 <path d="M29 14 L32 12" strokeLinecap="round" />
        //             </g>
        //         </svg>
        //     ),
        //     bg: "from-spiritual-blue-to-spiritual-crimson"
        // }
    ]
}


export const NATURE_COPY = {
    HEADING: "Key Qualities",
    INSIGHTS: [

        {
            title: "Personal Growth",
            description: "Growth can mean different things to different people, but a key goal is to encourage meaningful growth for every indivual.",
            dotColor: "crimson"
        },
        {
            title: "Embracing Incompleteness",
            // description: "Radically accepting oneself, incomplete, and embracing .",
            // description: "Embracing the incomplete nature of being, and in order to enjoy the journey of progress.",
            description: "Individuals are flawed, the goal is not to deny this, but to embrace one's current state of being and to facilitate growth nonetheless.",
            dotColor: "blue"
        },
        {
            title: "Pursuing Meaning",
            // THE SACRED NATURE OF THE SOUL
            description: "A key goal is to live meaningfully, and to encourage the means of doing so.",
            // description: "Each person has access to infinite depth. Each person, sacred and unique, use this space to cultivate your relationship with yourself.",
            dotColor: "purple"
        },
        {
            title: "Value Driven",
            // description: "Grounded and rooted in meaning, and values, so that collectively we can intentionally align with the service of Life.",
            // description: "Intrinsically linked with values and meaning, so that collectively we can intentionally align with the service of Life.",
            // dotColor: "blue"
            description: "A key goal is to create digital infrastructure with integral values and principles being a core and intrinsic part of the project.",
            // description: "A key goal is to live meaningfully, and to encourage the means of doing so.",
        },
        {
            title: "Intention", 
            description: "A key focus is on creating intentional space true to the user and the project itself."
            // which maybe sometimes can be fragile and demanding, but ultimately is also very special."
            // description: "Intentionally cultivate your journey, and take command of your time to live more purposefully, intentional and free.",
        },
        {
            title: "Community",
            description: "A long term aspiration is to cultivate a community of people embracing Life passionately and meaningfully."
        },
        {
            title: "Slow Growth",
            description: "To provide balance through encouraging slow, sustanable growth and not just opting for fast, rapid, end-orientated growth."
        }



    ],
}

/*
Living meaningfully....

Existing tools often focused on achieving optimal productivity, or efficiency, without overtly being rooted in meaning, principles, and simply did not feel aligned with personal values.

I worked on creating a space that is rooted in meaning, and intention of nurturing personal growth which is liberating and meaningful

Incomplete, less robust and more rough around the edges, the cultivation of a space rooted in faith began inspired by sukkot and the nature of transience and rugged growth.

*/
/*

Living Meaningfully
Most tools today are built for productivity and efficiency. But we are not machines, and growth cannot be measured only in numbers.

This space is different: it’s rooted in meaning, guided by principles, and shaped by the pursuit of personal growth that feels liberating and real.

It began incomplete, rough around the edges — and that’s fitting. Inspired by Sukkot and the reminder that life is lived in temporary shelters, this project embraces transience as sacred. Growth doesn’t wait for perfection; it happens here, in the journey itself.

*/

/*
The pursuit for personal liberation and independence i.e. the means to live meaningfully is often lonely, unsupported and scary.

When exploring existing tools, they prioritised productivity over meaning, but we are not machines and quantified growth is not better than qualified growth. We shouldn't neglect the journey.

The festival of sukkot commemorates dwelling in booths, temporary shelters, whilst in the desert leaving Egypt. The instruction to continue to dwell in booths each year is a reminder that the journey of liberation and meaning takes place in the transient present, today, and although incomplete, and not ideal, the journey of liberating personal growth is real, sacred and inherently ours.

Incomplete, less robust and more rough around the edges, the cultivation of a space rooted in faith began inspired by sukkot and the nature of transience and rugged growth.

*/



export const BACKGROUND_COPY = {
    HEADING: "The Journey So Far",
    TEXT: [
        `Most tools today are built for productivity and efficiency. But __we__ people are not machines, and growth cannot be measured only in numbers.`,
        `In pursuit of meaning and value-orientated systems this space was created with the intention of facilitating --liberating personal growth.-- __For several months__ This project has been fun and meaningful to use, maybe it will be for you too.`,
        `Growth is a process. So, although incomplete, less robust and --rough around the edges-- this project offers --a space rooted in meaning-- and --inspired by the nature of transience-- and --rugged growth!-- `
    ],

    _TEXT: [
        "The pursuit for personal liberation and independence i.e. the means to --live meaningfully-- is often lonely, unsupported and scary.",
        "When exploring existing tools, they prioritised productivity over meaning, but we are not machines and quantified growth is not better than qualified growth. --We shouldn't neglect the journey. --",
        // "Existing tools felt rooted in the need for productivity, more than the need for meaning. People are not machines - quantified growth is not better than qualified growth. --The journey should not be neglected. --",
        "The festival of --sukkot commemorates dwelling in booths--, temporary shelters, whilst in the desert leaving Egypt. The instruction to continue to dwell in booths each year is a reminder that the journey of liberation and meaning takes place in the transient present, today, and --although incomplete, and not ideal, the journey of liberating personal growth is real, sacred and inherently ours.--",
        "Incomplete, less robust and more --rough around the edges--, the cultivation of a space rooted in faith began inspired by sukkot and the nature of transience and --rugged growth--.",
    ]
}
export const INTRA_INTENTION_COPY = {
    // TEXT: "Whilst this space is still being built, the core of the project exists, and you are welcome to participate in the journey and join the pursuit of meaning. Incompletion is certain \n \n  the unknown awaits \n \n let the future you cherish the next step you take ❤️",
    // TEXT: "The core of the project exists, even though the space is still being created. You are welcome to participate in the journey, to explore, to grow, and to join the pursuit of meaning. \n \n Certainly incomplete \n\n but \n \n  the unknown awaits \n \n and let the future you cherish the next step you take \n \n ❤️"
    // TEXT: "You are welcome to explore and experience this space with an open mind, please know that some features may be premature and (beautifully) incomplete!"
    TEXT: "You are welcome to explore and benefit from this app, despite Booths being a work in progress."
    // May the future you cherish the next steps you take, even as the unknown awaits. You are welcome to explore and experience this space which is still very much in a state of GROWTH and intentional journeying.
// 
}
