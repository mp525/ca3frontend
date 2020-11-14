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
const addCatAdmin = "/api/info/admin";
const deleteCatAdmin = "/api/info/admin"
const adminAllCats = "/api/info/admin/allCats";
const breeds = "/api/info/breeds";
const breedPic = "https://api.thecatapi.com/v1/images/search";

export {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    userCatsEndpoint,
    adminCatsEndpoint,
    addCatUser,
    addCatAdmin,
    adminAllCats,
    deleteCatAdmin,
    breeds,
    breedPic
};
