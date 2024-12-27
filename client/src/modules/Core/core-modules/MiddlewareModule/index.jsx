import { graphqlClient } from "modules/Core/middleware";
import { gql } from "graphql-request";

class MiddlewareModule {
    constructor({
        name,
        operations = {},
        handler = (...args) => graphqlClient.request(...args),
        operationsConfig = {},
    }) {
        this.name = name;
        this.operations = operations;
        this.handler = handler;
        this.operationsConfig = operationsConfig;
        this.onInit();
    }

    onInit = () => {
        this.initOperationsOnConstruct();
    }

    getOperation(name) {
        return this.operations[name];
    };

    setOperation(name, operation) {
        this.operations[name] = operation;
    }

    initOperation(key, body) {
        const operation = async (_params, ...args) => {
            const params = this.processOperationParams(key, _params, ...args);
            const result = await this.handler(gql`${body}`, params)
            return this.processResult(key, result);
        }
        this.setOperation(key, operation);
    }

    initOperationsOnConstruct() {
        Object.entries(this.operations).forEach(([key, body]) => {
            this.initOperation(key, body);
        })
    }

    getOperationConfig = (name) => {
        return this.operationsConfig[name];
    }

    getOperationConfigField = (name, field) => {
        return this.getOperationConfig(name)?.[field];
    }

    processOperationParams = (name, params, ...args) => {
        const processParams = this.getOperationConfigField(name, 'paramsParser');
        return processParams ? processParams(params, ...args) : params;
    }

    processResult = (name, result) => {
        const postParser = this.getOperationConfigField(name, 'postParser')
        return postParser ? postParser(result) : result;
    }

    get ops() {
        return this.operations;
    }
};

export default MiddlewareModule;