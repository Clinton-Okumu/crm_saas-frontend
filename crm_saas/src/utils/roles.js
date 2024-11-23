// src/utils/roles.js

export const ROLES = {
 SUPER_ADMIN: 'super_admin',
 HR: {
   ADMIN: 'hr_admin',
   MANAGER: 'hr_manager',
   STAFF: 'hr_staff'
 },
 ACCOUNTING: {
   ADMIN: 'accounting_admin',
   ACCOUNTANT: 'accountant'
 },
 PROJECT: {
   ADMIN: 'project_admin',
   MANAGER: 'project_manager',
   MEMBER: 'project_member'
 },
 CRM: {
   ADMIN: 'crm_admin',
   MANAGER: 'crm_manager',
   SALES: 'sales_rep'
 },
 CLIENT: 'client'
};

export const getModuleAccess = (role) => {
 const moduleAccess = {
   [ROLES.SUPER_ADMIN]: ['HR App', 'Meetings', 'OKR App', 'Manager App', 'Sales CRM App', 'Project App', 'Accounting App'],
   [ROLES.HR.ADMIN]: ['HR App', 'Meetings'],
   [ROLES.HR.MANAGER]: ['HR App', 'Meetings'],
   [ROLES.HR.STAFF]: ['HR App'],
   [ROLES.ACCOUNTING.ADMIN]: ['Accounting App'],
   [ROLES.ACCOUNTING.ACCOUNTANT]: ['Accounting App'],
   [ROLES.PROJECT.ADMIN]: ['Project App', 'Meetings'],
   [ROLES.PROJECT.MANAGER]: ['Project App', 'Meetings'],
   [ROLES.PROJECT.MEMBER]: ['Project App'],
   [ROLES.CRM.ADMIN]: ['Sales CRM App', 'Meetings'],
   [ROLES.CRM.MANAGER]: ['Sales CRM App', 'Meetings'],
   [ROLES.CRM.SALES]: ['Sales CRM App'],
   [ROLES.CLIENT]: ['Project App']
 };

 return moduleAccess[role] || [];
};
