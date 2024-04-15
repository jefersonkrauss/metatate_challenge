import axiosInstance from "@/utils/http-client.ts";
import {camelizeKeys, decamelizeKeys} from "humps";
import {TaskModel} from "@/domain/model/task.model.ts";

const projectBaseURL = '/api/v1/project/';
const taskBaseUrl = '/task';

const baseURL = (projectId: number) => projectBaseURL + projectId.toString() + taskBaseUrl;

export const getTasks = async (projectId: number) => {
    const { data } = await axiosInstance.get<TaskModel[]>(baseURL(projectId));
    return camelizeKeys(data) as TaskModel[];
};

export const getTask = async (id: number, projectId: number)=> {
    const { data } = await axiosInstance.get<TaskModel>(`${baseURL(projectId)}/${id}`);
    return camelizeKeys(data) as TaskModel;
};

export const createTask = async (task: TaskModel) => {
    const { data } = await axiosInstance.post<TaskModel>(baseURL(task.projectId), decamelizeKeys(task));
    return camelizeKeys(data) as TaskModel;
};

export const updateTask = async (id: number, taskModel: TaskModel)=> {
    const { data } = await axiosInstance.put<TaskModel>(`${baseURL(taskModel.projectId)}/${id}`, decamelizeKeys(taskModel));
    return camelizeKeys(data) as TaskModel;
};

export const updateTaskPosition = async (projectId: number, taskModel: TaskModel[])=> {
    const response = await axiosInstance.put(`${baseURL(projectId)}/sort/columns`, { tasks: decamelizeKeys(taskModel) });
    return response.status === 204;
};

export const deleteTask = async (id: number, projectId: number): Promise<boolean> => {
    const response = await axiosInstance.delete(`${baseURL(projectId)}/${id}`);
    return response.status === 204;
};
