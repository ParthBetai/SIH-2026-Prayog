import { useTranslation } from 'react-i18next';
import { ROLES, type Role } from '@/config/rbac';

export interface RoleText {
  label: string;
  description: string;
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

export function useRoleText(): (role: Role | string) => RoleText {
  const { t } = useTranslation();

  return (role: Role | string): RoleText => {
    const def = ROLES.find((r) => r.id === role);
    const camel = toCamelCase(String(role));

    const labelKey = `roles.${camel}`;
    const descKey = `roles.${camel}What`;

    const label = t(labelKey, def?.label ?? String(role));
    const description = t(descKey, def?.description ?? '');

    return { label, description };
  };
}
