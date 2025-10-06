import publicConfig from "./public.json";
import personalConfig from "./personal.json";
import developmentConfig from "./development.json";

const environment = process.env.REACT_APP_ENV;

const featureConfigs = {
    public: publicConfig,
    personal: personalConfig,
    development: developmentConfig
}

const config = {
    ...featureConfigs[environment]
}

console.log("config", config);

export default config;