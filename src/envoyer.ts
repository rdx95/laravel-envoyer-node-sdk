import EnvoyerRequest from "./core/envoyerRequests";

enum NotificationType {
    email,
    discord,
    slack,
    teams
}

class Envoyer extends EnvoyerRequest {
    constructor(token: string) {
        super(token)
    }

    get projects() {
        return {
            list: () => this.get('/projects', {}, true),
            get: (projectId: number) => this.get(`/projects/${projectId}`, {}, true),
            create: (body: {
                "name": string,
                "provider": string,
                "repository": string,
                "branch"?: string,
                "type"?: string,
                "retain_deployments"?: number,
                "monitor"?: string,
                "composer": boolean,
                "composer_dev": boolean,
                "composer_quiet": boolean
            }) => this.post('/projects', body, {}, true),
            update: (projectId: number, body: {
                "name": string,
                "retain_deployments": number,
                "monitor": string,
                "composer": boolean,
                "composer_dev": boolean,
                "composer_quiet": boolean
            }) => this.put(`/projects/${projectId}`, body, {}, true),
            updateProjectSource: (projectId: number, body: {
                "provider": string,
                "repository": string,
                "branch": string,
                "push_to_deploy": boolean
            }) => this.put(`/projects/${projectId}/source`, body, {}, true),
            delete: (projectId: number) => this.delete(`/projects/${projectId}`, undefined),
            getLinkedFolders: (projectId: number) => this.get(`/projects/${projectId}/folders`, {}, true),
            createLinkedFolder: (projectId: number, body: {
                "from": string,
                "to": string
            }) => this.post(`/projects/${projectId}/folders`, body, {}, true),
            /**
             * @todo refer the below link and correct the api request
             * @link https://envoyer.io/api-documentation#delete-linked-folder
             * **/
            deleteLinkedFolder: (projectId: number) => this.delete(`/projects/${projectId}/folders`, undefined)
        }
    }

    get servers() {
        return {
            list: (projectId: number) => this.get(`/projects/${projectId}/servers`, {}, true),
            get: (projectId: number) => this.get(`/projects/${projectId}/servers/{serverId}`, {}, true),
            /**
             * @description: Refreshes the status of Envoyer's connection to the server.
             * @todo: check working of this api
             */
            refreshConnection: (projectId: number, serverId: number) => this.post(`/projects/${projectId}/servers/${serverId}/refresh`, {}, {}, true),
            create: (projectId: number, body: {
                "name": string,
                "connectAs": string,
                "host": string,
                "port"?: number,
                "phpVersion": string,
                "receivesCodeDeployments"?: boolean,
                "deploymentPath"?: string,
                "restartFpm"?: boolean,
                "composerPath"?: string
            }) => this.post(`/projects/${projectId}/servers`, body, {}, true),
            update: (projectId: number, serverId: number, body: {
                "name": string,
                "connectAs"?: string,
                "host"?: string,
                "port"?: number,
                "phpVersion"?: string,
                "receivesCodeDeployments"?: boolean,
                "deploymentPath"?: string,
                "restartFpm"?: boolean,
                "composerPath"?: string
            }) => this.put(`/projects/${projectId}/servers/${serverId}`, body, {}, true),
            delete: (projectId: number, serverId: number) => this.delete(`/projects/${projectId}/servers/${serverId}`, undefined)
        }
    }

    get environments() {
        return {
            get: (projectId: number) => this.get(`/projects/${projectId}/environment`, {}, true),
            getEnvServers: (projectId: number) => this.get(`/projects/${projectId}/environment/servers`, {}, true),
            update: (projectId: number, body: {
                "key": string,
                "contents": string,
                "servers": number[]
            }) => this.put(`/projects/${projectId}/environment`, body, {}, true),
            /**
             * @description Resetting your environment key will wipe the existing environment data.
             * @todo check api functionality
             * @param projectId envoyer project id - number
             */
            reset: (projectId: number) => this.delete(`/projects/${projectId}/environment`, {}),

        }
    }

    get actions() {
        return {
            list: () => this.get('/actions', {}, true)
        }
    }

    get hooks() {
        return {
            list: (projectId: number) => this.get(`/projects/${projectId}/hooks`, {}, true),
            get: (projectId: number, hookId: number) => this.get(`/projects/${projectId}/hooks/${hookId}`, {}, true),
            create: (projectId: number, body: {
                "name": string,
                "script": string,
                "runAs": string,
                "actionId": number,
                "timing": string,
                "servers": number[]
            }) => this.post(`/projects/${projectId}/hooks`, body, {}, true),
            update: (projectId: number, hookId: number, body: {
                "servers": number[]
            }) => this.put(`/projects/${projectId}/hooks/${hookId}`, body, {}, true),
            delete: (projectId: number, hookId: number) => this.delete(`/projects/${projectId}/hooks/${hookId}`, undefined)
        }
    }

    get deployments() {
        return {
            list: (projectId: number) => this.get(`/projects/${projectId}/deployments`, {}, true),
            /**
             * @todo correct api endpoint from envoyer if wrong
             * @link https://envoyer.io/api-documentation#get-deployment
             */
            get: (projectId: number, deploymentId: number) => this.get(`/projects/${projectId}/deployments/${deploymentId}`, {}, true),
            deployProject: (projectId: number, body: {
                "from": string,
                "branch"?: string,
                "tag"?: string
            }) => this.post(`/projects/${projectId}/deployments`, body, {}, true),
            cancel: (projectId: number, deploymentId: number) => this.delete(`/projects/${projectId}/deployments/${deploymentId}`, undefined)
        }
    }

    get heartbeats() {
        return {
            list: (projectId: number) => this.get(`/projects/${projectId}/heartbeats`, {}, true),
            get: (projectId: number, heartbeatId: number) => this.get(`/projects/${projectId}/heartbeats/${heartbeatId}`, {}, true),
            create: (projectId: number, body: {
                "name": string,
                "interval": number
            }) => this.post(`/projects/${projectId}/heartbeats`, body, {}, true),
            delete: (projectId: number, heartbeatId: number) => this.delete(`/projects/${projectId}/heartbeats/${heartbeatId}`, undefined)
        }
    }

    get collaborators() {
        return {
            list: (projectId: number) => this.get(`/projects/${projectId}/collaborators`, {}, true),
            get: (projectId: number, collaboratorId: number) => this.get(`/projects/${projectId}/collaborators/${collaboratorId}`, {}, true),
            create: (projectId: number, body: {
                "email": string
            }) => this.post(`/projects/${projectId}/collaborators`, body, {}, true),
            delete: (projectId: number, body: {
                "email": string
            }) => this.delete(`/projects/${projectId}/collaborators`, body)
        }
    }

    get notifications() {
        return {
            list: (projectId: number) => this.get(`/projects/${projectId}/notifications`, {}, true),
            get: (projectId: number, notificationId: number) => this.get(`/projects/${projectId}/notifications/${notificationId}`, {}, true),
            create: (projectId: number, body: {
                "name": string,
                "type": NotificationType,
                "email_address"?: string,
                "slack_webhook"?: string,
                "discord_webhook"?: string,
                "teams_webhook"?: string
            }) => this.post(`/projects/${projectId}/notifications`, body, {}, true),
            update: (projectId: number, notificationId: number, body: {
                "name": string,
                "type": NotificationType,
                "email_address"?: string,
                "slack_webhook"?: string,
                "discord_webhook"?: string,
                "teams_webhook"?: string
            }) => this.put(`/projects/${projectId}/notifications/${notificationId}`, body, {}, true),
            delete: (projectId: number, notificationId: number) => this.delete(`/projects/${projectId}/notifications/${notificationId}`, undefined)
        }
    }
}