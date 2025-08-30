import React from 'react';
import { TopToolbar, CreateButton, ExportButton } from 'react-admin';

const CategoryListActions: React.FC = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export default CategoryListActions;