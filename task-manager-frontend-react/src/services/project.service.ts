import {ProjectModel} from "@/domain/model/project.model.ts";
import axiosInstance from "@/utils/http-client.ts";
import {camelizeKeys, decamelizeKeys} from "humps";

const baseUrl = '/api/v1/project';

export const getProjects = async () => {
    const { data } = await axiosInstance.get<ProjectModel[]>(baseUrl);
    return camelizeKeys(data) as ProjectModel[];
};

export const getProject = async (id: number)=> {
    const { data } = await axiosInstance.get<ProjectModel>(`${baseUrl}/${id}`);
    return camelizeKeys(data) as ProjectModel;
};

export const createProject = async (project: ProjectModel) => {
    const { data } = await axiosInstance.post<ProjectModel>(baseUrl, decamelizeKeys(project));
    return camelizeKeys(data) as ProjectModel;
};

export const updateProject = async (id: number, project: ProjectModel)=> {
    const { data } = await axiosInstance.put<ProjectModel>(`${baseUrl}/${id}`, decamelizeKeys(project));
    return camelizeKeys(data) as ProjectModel;
};

export const deleteProject = async (id: number): Promise<boolean> => {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`);
    return response.status === 200;
};
