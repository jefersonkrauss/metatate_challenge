import axiosInstance from "@/utils/http-client.ts";
import {camelizeKeys} from "humps";
import {BoardModel} from "@/domain/model/board.model.ts";

const projectBaseURL = '/api/v1/project/';
const taskBaseUrl = '/board';

const baseURL = (projectId: number) => projectBaseURL + projectId.toString() + taskBaseUrl;

export const getBoard = async (projectId: number)=> {
    const { data } = await axiosInstance.get<BoardModel>(baseURL(projectId));
    return camelizeKeys(data) as BoardModel;
};