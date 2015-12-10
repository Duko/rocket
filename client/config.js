var astro = astro || {};

astro.config = {
    sun: {
        key: 'sun',
        mass: 8000000,
        spinSpeed: 0.02,
        children: [
            {
                key: 'black',
                mass: 4600000,
                scale: 0.6,
                orbitRadius: 3000,
                orbitSpeed: 0.00008,
                spinSpeed: 0.1
            },
            {
                key: 'orange',
                mass: 4200000,
                scale: 0.7,
                orbitRadius: 8000,
                orbitSpeed: -0.00001,
                spinSpeed: 0.1,
                children: [
                    {
                        key: 'moon',
                        mass: 1000000,
                        scale: 0.35,
                        orbitRadius: 2000,
                        orbitSpeed: 0.0004,
                        spinSpeed: 0.1
                    }
                ]
            },
            {
                key: 'purple',
                mass: 16000000,
                scale: 1.5,
                orbitRadius: 18000,
                orbitSpeed: -0.000001,
                spinSpeed: 0.1,
                children: [
                    {
                        key: 'moon',
                        mass: 1400000,
                        scale: 0.5,
                        orbitRadius: 3000,
                        orbitSpeed: 0.00004,
                        spinSpeed: 0.1
                    },
                    {
                        key: 'moon',
                        mass: 1200000,
                        scale: 0.4,
                        orbitRadius: 4500,
                        orbitSpeed: -0.00001,
                        spinSpeed: -0.1
                    },
                ]
            },
            {
                key: 'green',
                mass: 46000000,
                scale: 2.5,
                orbitRadius: 32000,
                orbitSpeed: -0.0000001,
                spinSpeed: 0.1
            },
            {
                key: 'blue',
                mass: 33000000,
                scale: 2.0,
                orbitRadius: 45000,
                orbitSpeed: -0.0000005,
                spinSpeed: 0.1,
                children: [
                    {
                        key: 'moon',
                        mass: 1400000,
                        scale: 0.55,
                        orbitRadius: 4000,
                        orbitSpeed: 0.00008,
                        spinSpeed: 0.1
                    },
                    {
                        key: 'moon',
                        mass: 1200000,
                        scale: 0.4,
                        orbitRadius: 5500,
                        orbitSpeed: -0.0001,
                        spinSpeed: -0.1
                    },
                    {
                        key: 'moon',
                        mass: 1450000,
                        scale: 0.58,
                        orbitRadius: 9000,
                        orbitSpeed: 0.00006,
                        spinSpeed: 0.1
                    }
                ]
            }
        ]
    }
};
