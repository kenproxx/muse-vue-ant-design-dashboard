import {USER_INFO, getSession, ACCESS_TOKEN} from "@/util/MemoryCommon";

export function authHeader() {
    let user = JSON.parse(getSession(USER_INFO));
    let accessToken = getSession(ACCESS_TOKEN);

    if (user.token && accessToken) {
        return { 'Authorization': 'Bearer ' + accessToken };
    } else {
        return {};
    }
}
