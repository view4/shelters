import { GraphQLClient } from 'graphql-request'
import config from "../config/index.js";
import { getToken } from '../utils/auth.js';

const {backendUrl} = config;

class Client extends GraphQLClient {
    constructor(...args){
        super(...args)
        const token = getToken();
        if (token) this.setAuthToken(token)
    }

    setAuthToken(token){
        this.setHeader('authorization', `Bearer ${token}`)
    }

    get hasToken(){
        return Boolean(this.requestConfig?.headers?.['authorization'])
    }
}

export const graphqlClient = new Client(`${backendUrl}graphql`)