export interface iTeamResults {
    _id: string;
    joindate: string;
    teamcode: string;
    username: string;
}

export interface iTeam {
    _id: string;
    name: string;
    description: string;
    code: string;
    organisationcode: string;
    responsiblepeople: any[];
}

export interface iTeamMembers {
    _id: string;
    teamcode: string;
    username: string;
    organisation: string;
    rolecode?: string;
    joindate: Date;
    enddate?: Date;
    isArchived?: boolean;
}

export interface iTeamRequest {
    _id?: string;
    username: string;
    teamcode: string;
    organisation: string;
    isArchived?: boolean;
    requestdate: Date;
    requestor?: string;
    requestapprover?: string;
    approveddate?: Date;
    refusedate?: Date;
    __v?: number;
}
