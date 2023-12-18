import {AllowedModels} from "./allowed-models";

export type QuizSettings = {
    topic: string;
    model: AllowedModels;
    apiSecret: string;
}
