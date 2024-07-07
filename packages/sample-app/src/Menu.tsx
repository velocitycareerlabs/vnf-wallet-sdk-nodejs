/**
 * Created by Michael Avoyan on 07/07/2024.
 *
 * Copyright 2022 Velocity Career Labs inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const Menu: React.FC = () => {
    const menuItems = [
        'Get Countries',
        'Get Credential Types',
        'Get Credential Type Schemas',
        'Disclosing Credentials (aka Inspection)',
        'Receiving Credentials (aka Issuing) By Deeplink',
        'Receiving Credentials (aka Issuing) By Services',
        'Self Reporting Credentials (aka Self Attested)',
        'Refresh Credentials',
        'Get Verified Profile',
        'Verify JWT',
        'Generate Signed JWT',
        'Generate DID:JWK',
    ];

    const handleClick = (item: string) => {
        alert(`You clicked on ${item}`);
    };

    return (
        <div>
            <h1>Sample App</h1>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} onClick={() => handleClick(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
