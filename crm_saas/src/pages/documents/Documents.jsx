import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DocumentManagement from "../../components/documents/DocumentManagement";

const DocumentPage = () => {
  return (
    <DashboardLayout>
      <DocumentManagement />
    </DashboardLayout>
  );
};

export default DocumentPage;
