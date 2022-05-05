export interface iUserRoles {
    username: string;
    organisationid?: string;
    roleassignedDT: Date;
    role: object;
    assignedby: string;
}

export interface iTeamRoles {
    teamcode: string;
    roleassignedDT: Date;
    role: object;
    assignedby: string;
}

export interface iRoleLink {
    id: string;
    role_id: string;
    role?: iRole;
    link_id: string;
    link_type: string;
    approvedby: string;
}

export interface iCapabilityLink {
    id: string;
    capability_id: string;
    capability?: iCapability;
    link_id: string;
    link_type: string;
    approvedby: string;
}

export interface iRole {
    _id: string;
    name: string;
    authoriser: string;
    description: string;
    capabilitiy_links?: iCapabilityLink[];
}

export interface iCapability {
    id: string;
    name: string;
    authoriser: string;
    description: string;
    value: string;
    tags: iTag[];
}

export interface iTag {
    name: string;
    context: string;
}

export interface iRequestLink {
    id: string;
    type: string;
    created_at: Date;
    parent_id?: string;
    data: any;
    // requestedby: string;
    // teamcode?: string;
    // username?: string;
    // role_id?: string;
    // capability_id?: string;
}
