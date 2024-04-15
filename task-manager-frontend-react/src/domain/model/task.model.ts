import {User} from "@/domain/model/user.model.ts";

export interface TaskModel {
    id?: number;
    projectId: number;
    workflowColumnId: number;
    position: number;
    title: string;
    description: string;
    responsibleUserId?: number;
    responsible?: User;
    createdAt?: Date;
    updatedAt?: Date;
}
