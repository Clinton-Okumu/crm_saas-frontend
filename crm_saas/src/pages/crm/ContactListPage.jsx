import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Contacts from "../../components/crm/ContactList";

const ContactListPage = () => {
  return (
    <DashboardLayout>
      <Contacts />
    </DashboardLayout>
  );
};

export default ContactListPage;
