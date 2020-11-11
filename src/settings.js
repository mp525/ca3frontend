import React, { useState, useEffect } from "react";

const mainURL = "https://mparking.dk/CA3Backend";
//const mainURL = "http://localhost:8080/jpareststarter";
const userInfoEndpoint = "/api/info/user";
const userCatsEndpoint = "/api/info/user/cats";
const adminInfoEndpoint = "/api/info/admin";
const adminCatsEndpoint = "/api/info/admin/cats";
const defaultEndpoint = "/api/default";
const loginEndpoint = "/api/login";
const addCatUser = "/api/info/user";

export {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    userCatsEndpoint,
    adminCatsEndpoint,
    addCatUser
};
