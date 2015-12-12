var astro = astro || {};

astro.config = {
    sun: {
        key: 'sun',
        mass: 8000000,
        spinSpeed: 0.02,
        children: [
            {
                key: 'black',
                mass: 2600000,
                scale: 0.55,
                orbitRadius: 3000,
                orbitSpeed: 0.00006,
                spinSpeed: 0.02
            },
            {
                key: 'orange',
                mass: 4200000,
                scale: 0.7,
                orbitRadius: 10000,
                orbitSpeed: -0.00002,
                spinSpeed: 0.005,
                children: [
                    {
                        key: 'moon',
                        mass: 1000000,
                        scale: 0.35,
                        orbitRadius: 2000,
                        orbitSpeed: 0.0001,
                        spinSpeed: 0.01
                    }
                ]
            },
            {
                key: 'purple',
                mass: 16000000,
                scale: 1.5,
                orbitRadius: 26000,
                orbitSpeed: -0.000001,
                spinSpeed: 0.008,
                children: [
                    {
                        key: 'moon',
                        mass: 1400000,
                        scale: 0.5,
                        orbitRadius: 3500,
                        orbitSpeed: 0.00004,
                        spinSpeed: 0.1
                    },
                    {
                        key: 'moon',
                        mass: 1200000,
                        scale: 0.4,
                        orbitRadius: 5900,
                        orbitSpeed: -0.00001,
                        spinSpeed: -0.1
                    },
                ]
            },
            {
                key: 'green',
                mass: 46500000,
                scale: 2.5,
                orbitRadius: 47000,
                orbitSpeed: -0.0000001,
                spinSpeed: 0.003
            },
            {
                key: 'blue',
                mass: 33000000,
                scale: 2.0,
                orbitRadius: 75000,
                orbitSpeed: -0.0000005,
                spinSpeed: 0.003,
                children: [
                    {
                        key: 'moon',
                        mass: 1460000,
                        scale: 0.55,
                        orbitRadius: 4000,
                        orbitSpeed: 0.00008,
                        spinSpeed: 0.025
                    },
                    {
                        key: 'moon',
                        mass: 1250000,
                        scale: 0.4,
                        orbitRadius: 5500,
                        orbitSpeed: -0.0001,
                        spinSpeed: -0.02
                    },
                    {
                        key: 'moon',
                        mass: 1650000,
                        scale: 0.58,
                        orbitRadius: 9000,
                        orbitSpeed: 0.00006,
                        spinSpeed: 0.015
                    }
                ]
            },
            {
                key: 'white',
                mass: 16500000,
                scale: 1,
                orbitRadius: 100000,
                orbitSpeed: -0.000001,
                spinSpeed: 0.005
            }
        ]
    },
    rocketMenu: [
        {
            name: 'LAUNCH',
            disabled: false
        },
        {
            name: 'BUILD',
            disabled: false,
            subMenu: [
                {
                    name: 'LANDING PAD',
                    disabled: false,
                    cost: [
                        {
                            name: 'Titanium',
                            amount: 25
                        },
                        {
                            name: 'Silicone',
                            amount: 10
                        },
                        {
                            name: 'Crystal',
                            amount: 2
                        }
                    ]
                },
                {
                    name: 'OXYGEN GENERATOR',
                    disabled: false,
                    cost: [
                        {
                            name: 'Titanium',
                            amount: 25
                        },
                        {
                            name: 'Silicone',
                            amount: 10
                        },
                        {
                            name: 'Crystal',
                            amount: 2
                        }
                    ]
                },
                {
                    name: 'FUEL EXTRACTOR',
                    disabled: false,
                    cost: [
                        {
                            name: 'Titanium',
                            amount: 25
                        },
                        {
                            name: 'Silicone',
                            amount: 10
                        },
                        {
                            name: 'Crystal',
                            amount: 2
                        }
                    ]
                }
            ]
        },
        {
            name: 'PRODUCTION',
            disabled: false,
            subMenu: [
                {
                    name: 'LANDING PAD',
                    disabled: false,
                    cost: [
                        {
                            name: 'Titanium',
                            amount: 25
                        },
                        {
                            name: 'Silicone',
                            amount: 10
                        },
                        {
                            name: 'Crystal',
                            amount: 2
                        }
                    ]
                }
            ]
        },
        {
            name: 'MANAGEMENT',
            disabled: false,
            subMenu: [
                {
                    name: 'LANDING PAD',
                    disabled: false,
                    cost: [
                        {
                            name: 'Titanium',
                            amount: 25
                        },
                        {
                            name: 'Silicone',
                            amount: 10
                        },
                        {
                            name: 'Crystal',
                            amount: 2
                        }
                    ]
                }
            ]
        }
    ]
};
