import {TaskModel} from "@/domain/model/task.model.ts";
import {ProjectModel} from "@/domain/model/project.model.ts";

export interface BoardColumn {
    id: number;
    name: string;
    order: number;
    tasks: TaskModel[];
}

export interface BoardWorkflow {
    name: string;
    columns: BoardColumn[];
}

export interface BoardModel {
    project: ProjectModel;
    workflow: BoardWorkflow
    tasks: TaskModel[]
}
