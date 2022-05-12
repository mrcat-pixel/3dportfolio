class PaneCluster {
    constructor(scene) {

        const data = [
            {
                title: "City of Mist",
                desc: [ "Level props made for a personal project;",
                        "experiments with lighting",
                        "in pixelart environments."],
                link:  "https://www.artstation.com/artwork/RngQbm"
            },
            {
                title: "Portraits",
                desc: [ "Character portrait art for a team project.",
                        "Made entirely within",
                        "16-bit Mega Drive limitations."],
                link: "https://www.artstation.com/artwork/9NP6Ao"
            },
            {
                title: "Tropical Assets",
                desc: [ "An assortment of assets",
                        "created for Peck'n'Claw (Beryl Tangle stage) ",
                        "as a commission."],
                link: "https://www.artstation.com/artwork/ELKyeA"
            },
            {
                title: "Moonlight",
                desc: [ "Level background for a team project.",
                    "Made entirely within",
                    "16-bit Mega Drive limitations."],
                link: "https://www.artstation.com/artwork/eaqoOJ"
            },
            {
                title: "Paradise",
                desc: [ "Game background",
                    "created for Peck'n'Claw (Beryl Tangle stage) ",
                    "as a commission."],
                link: "https://www.artstation.com/artwork/ZG92Lx"
            },
            {
                title: "Utopia Island",
                desc: [ "Modular level art",
                    "created for a team project.",
                    "Click to see a video in motion."],
                link: ""
            },
            {
                title: "Up High",
                desc: [ "Game background",
                    "created for a team project.",
                    ""],
                link: ""
            },
            {
                title: "Sin City",
                desc: [ "Level background for a team project.",
                    "Made entirely within",
                    "16-bit Mega Drive limitations."],
                link: ""
            },
            {
                title: "Hardline",
                desc: [ "Logo splash screen illustration",
                    "for a game development team.",
                    "Made within 16-bit Mega Drive limitations."],
                link: ""
            },
            {
                title: "The Mask",
                desc: [ "Character portrait",
                    "for personal use.",
                    ""],
                link: ""
            },
            {   skip: true  },
            {   skip: true, divide: true  },
            {
                title: "compmath4",
                desc: [ "Function interpolation via",
                    "the Lagrange polynomial in Python.",
                    "Mathematics assignment for ITMO University."],
                link: "https://github.com/mrcat-pixel/compmath4"
            },
            {
                title: "algo_labs",
                desc: [ "Programs made for the ITMO University",
                    "algorithms and data structures course.",
                    "Written in C and C++."],
                link: "https://github.com/mrcat-pixel/algo_labs"
            },
            {
                title: "web_lab4",
                desc: [ "Web service written in Vue and Java;",
                    "for use with a PostgreSQL database.",
                    "Programming assignment for ITMO University."],
                link: "https://github.com/mrcat-pixel/web_lab4"
            },
            {
                title: "web_lab3",
                desc: [ "Web service written in Java EE, using JSF;",
                    "for use with a PostgreSQL database.",
                    "Programming assignment for ITMO University."],
                link: "https://github.com/mrcat-pixel/web_lab3"
            },
            {
                title: "web_lab1",
                desc: [ "Web service written in",
                    "HTML, CSS, JS and PHP.",
                    "Programming assignment for ITMO University."],
                link: "https://github.com/mrcat-pixel/web_lab1"
            },
            {   skip: true, divide: true  },
            {
                title: "Portfolio Site",
                desc: [ "The very website you're viewing!",
                        "Made with Three.JS as a place",
                        "to showcase all my work."],
                link: ""
            },
            {
                title: "Old Website",
                desc: [ "An old pixelart portfolio",
                        "website this one has replaced.", ""],
                link: ""
            },
            {
                title: "Escape",
                desc: [ "A poster made for the",
                    "ITMO University Graphic Design course.", ""],
                link: ""
            },
            {
                title: "Sonic Medley",
                desc: [ "An orchestral medley celebrating",
                    "the music of Classic Sonic games.",
                    "Arranged for a contest."],
                link: "",
                divide: true
            },
            {
                title: "Boss Theme",
                desc: [ "Orchestral boss theme",
                    "composed for a team project.", ""],
                link: ""
            },
            {
                title: "Amber Hills",
                desc: [ "Orchestral level theme composed for",
                    "an unreleased personal project.", ""],
                link: ""
            },
            {
                title: "Void",
                desc: [ "Ambient music composed for",
                    "a personal project.", ""],
                link: ""
            },
            {
                title: "Intro",
                desc: [ "Orchestral + Metal cover", "a song from Elemental Master,",
                    "Made in collaboration with FoxConED."],
                link: ""
            },
            {   skip: true, divide: true  },
            {
                title: "Nostalgia",
                desc: [ "Artwork for a team project.",
                    "Made within 16-bit Mega Drive limitations",
                    "using 3D rendering and hand correction."],
                link: "https://www.artstation.com/artwork/48e2oL"
            },
            {
                title: "Ori Statue",
                desc: [ "3D sculpted statue of a character from ",
                    "the Ori series (belongs to Microsoft",
                    "and Moon Studios)."],
                link: ""
            },
            {
                title: "LowPoly Sonic",
                desc: [ "Low poly model of a character from ",
                    "the Sonic series (belongs to SEGA).",
                    ""],
                link: ""
            },
            {
                title: "16d Challenge",
                desc: [ "A ROM hack of Sonic the Hedgehog",
                    "for the Sega Mega Drive",
                    "made in 16 days as a challenge."],
                link: "",
                divide: true
            },
            {
                title: "Sonic Eclipse",
                desc: [ "A ROM hack of Sonic the Hedgehog 2",
                    "for the Sega Master System",
                    "made for a competition."],
                link: ""
            },
            {
                title: "projectraven",
                desc: [ "In-progress original 2D Metroidvania ",
                        "I'm developing as a part of Red Miso Studios.",
                        "Stay tuned!"],
                link: ""
            }
        ];

        let divider_x = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].divide) divider_x += 5;
            if (data[i].skip) continue;

            let x = Math.floor(i / 3) - 2;
            let y = i % 3 - 1;
            let offset = x % 2 === 0? -2 : 2;

            new Pane(scene, data[i].title, data[i].desc,
                x * 17 + divider_x, y * -22 + offset, Math.random() * 4 - 2);
        }
    }
}