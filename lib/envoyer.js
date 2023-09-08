"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var envoyerRequests_1 = require("./core/envoyerRequests");
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["email"] = 0] = "email";
    NotificationType[NotificationType["discord"] = 1] = "discord";
    NotificationType[NotificationType["slack"] = 2] = "slack";
    NotificationType[NotificationType["teams"] = 3] = "teams";
})(NotificationType || (NotificationType = {}));
var Envoyer = /** @class */ (function (_super) {
    __extends(Envoyer, _super);
    function Envoyer(token) {
        return _super.call(this, token) || this;
    }
    Object.defineProperty(Envoyer.prototype, "projects", {
        get: function () {
            var _this = this;
            return {
                list: function () { return _this.get('/projects', {}, true); },
                get: function (projectId) { return _this.get("/projects/".concat(projectId), {}, true); },
                create: function (body) { return _this.post('/projects', body, {}, true); },
                update: function (projectId, body) { return _this.put("/projects/".concat(projectId), body, {}, true); },
                updateProjectSource: function (projectId, body) { return _this.put("/projects/".concat(projectId, "/source"), body, {}, true); },
                delete: function (projectId) { return _this.delete("/projects/".concat(projectId), undefined); },
                getLinkedFolders: function (projectId) { return _this.get("/projects/".concat(projectId, "/folders"), {}, true); },
                createLinkedFolder: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/folders"), body, {}, true); },
                /**
                 * @todo refer the below link and correct the api request
                 * @link https://envoyer.io/api-documentation#delete-linked-folder
                 * **/
                deleteLinkedFolder: function (projectId) { return _this.delete("/projects/".concat(projectId, "/folders"), undefined); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "servers", {
        get: function () {
            var _this = this;
            return {
                list: function (projectId) { return _this.get("/projects/".concat(projectId, "/servers"), {}, true); },
                get: function (projectId) { return _this.get("/projects/".concat(projectId, "/servers/{serverId}"), {}, true); },
                /**
                 * @description: Refreshes the status of Envoyer's connection to the server.
                 * @todo: check working of this api
                 */
                refreshConnection: function (projectId, serverId) { return _this.post("/projects/".concat(projectId, "/servers/").concat(serverId, "/refresh"), {}, {}, true); },
                create: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/servers"), body, {}, true); },
                update: function (projectId, serverId, body) { return _this.put("/projects/".concat(projectId, "/servers/").concat(serverId), body, {}, true); },
                delete: function (projectId, serverId) { return _this.delete("/projects/".concat(projectId, "/servers/").concat(serverId), undefined); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "environments", {
        get: function () {
            var _this = this;
            return {
                get: function (projectId) { return _this.get("/projects/".concat(projectId, "/environment"), {}, true); },
                getEnvServers: function (projectId) { return _this.get("/projects/".concat(projectId, "/environment/servers"), {}, true); },
                update: function (projectId, body) { return _this.put("/projects/".concat(projectId, "/environment"), body, {}, true); },
                /**
                 * @description Resetting your environment key will wipe the existing environment data.
                 * @todo check api functionality
                 * @param projectId envoyer project id - number
                 */
                reset: function (projectId) { return _this.delete("/projects/".concat(projectId, "/environment"), {}); },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "actions", {
        get: function () {
            var _this = this;
            return {
                list: function () { return _this.get('/actions', {}, true); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "hooks", {
        get: function () {
            var _this = this;
            return {
                list: function (projectId) { return _this.get("/projects/".concat(projectId, "/hooks"), {}, true); },
                get: function (projectId, hookId) { return _this.get("/projects/".concat(projectId, "/hooks/").concat(hookId), {}, true); },
                create: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/hooks"), body, {}, true); },
                update: function (projectId, hookId, body) { return _this.put("/projects/".concat(projectId, "/hooks/").concat(hookId), body, {}, true); },
                delete: function (projectId, hookId) { return _this.delete("/projects/".concat(projectId, "/hooks/").concat(hookId), undefined); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "deployments", {
        get: function () {
            var _this = this;
            return {
                list: function (projectId) { return _this.get("/projects/".concat(projectId, "/deployments"), {}, true); },
                /**
                 * @todo correct api endpoint from envoyer if wrong
                 * @link https://envoyer.io/api-documentation#get-deployment
                 */
                get: function (projectId, deploymentId) { return _this.get("/projects/".concat(projectId, "/deployments/").concat(deploymentId), {}, true); },
                deployProject: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/deployments"), body, {}, true); },
                cancel: function (projectId, deploymentId) { return _this.delete("/projects/".concat(projectId, "/deployments/").concat(deploymentId), undefined); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "heartbeats", {
        get: function () {
            var _this = this;
            return {
                list: function (projectId) { return _this.get("/projects/".concat(projectId, "/heartbeats"), {}, true); },
                get: function (projectId, heartbeatId) { return _this.get("/projects/".concat(projectId, "/heartbeats/").concat(heartbeatId), {}, true); },
                create: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/heartbeats"), body, {}, true); },
                delete: function (projectId, heartbeatId) { return _this.delete("/projects/".concat(projectId, "/heartbeats/").concat(heartbeatId), undefined); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "collaborators", {
        get: function () {
            var _this = this;
            return {
                list: function (projectId) { return _this.get("/projects/".concat(projectId, "/collaborators"), {}, true); },
                get: function (projectId, collaboratorId) { return _this.get("/projects/".concat(projectId, "/collaborators/").concat(collaboratorId), {}, true); },
                create: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/collaborators"), body, {}, true); },
                delete: function (projectId, body) { return _this.delete("/projects/".concat(projectId, "/collaborators"), body); }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Envoyer.prototype, "notifications", {
        get: function () {
            var _this = this;
            return {
                list: function (projectId) { return _this.get("/projects/".concat(projectId, "/notifications"), {}, true); },
                get: function (projectId, notificationId) { return _this.get("/projects/".concat(projectId, "/notifications/").concat(notificationId), {}, true); },
                create: function (projectId, body) { return _this.post("/projects/".concat(projectId, "/notifications"), body, {}, true); },
                update: function (projectId, notificationId, body) { return _this.put("/projects/".concat(projectId, "/notifications/").concat(notificationId), body, {}, true); },
                delete: function (projectId, notificationId) { return _this.delete("/projects/".concat(projectId, "/notifications/").concat(notificationId), undefined); }
            };
        },
        enumerable: false,
        configurable: true
    });
    return Envoyer;
}(envoyerRequests_1.default));
