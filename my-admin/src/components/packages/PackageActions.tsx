import React from 'react';
import { TopToolbar, CreateButton, ExportButton } from 'react-admin';

const PackageListActions: React.FC = () => (
    <TopToolbar>
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export default PackageListActions;