import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const API_URL = publicRuntimeConfig.API_DEV;