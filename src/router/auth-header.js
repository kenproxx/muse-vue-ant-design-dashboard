import {USER_INFO, getSession, ACCESS_TOKEN} from "@/util/MemoryCommon";

export function authHeader() {
    let user = JSON.parse(getSession(USER_INFO));
    let accessToken = JSON.parse(getSession(ACCESS_TOKEN));

    if (user && accessToken) {
        return { 'Authorization': 'Bearer ' + accessToken };
    } else {
        return {};
    }
}
