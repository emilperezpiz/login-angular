import { NbMenuItem } from '@nebular/theme';

const array: NbMenuItem[] = [{ "title": "link.workers", "icon": "person-outline", "roles": "ROLE_PROPERTY,ROLE_WORKER_SECRETARY", "children": [{ "title": "link.list", "icon": null, "link": "worker" }, { "title": "link.new", "icon": null, "link": "worker\/new" }] }];

export const MENU_ITEMS: NbMenuItem[] = array;
