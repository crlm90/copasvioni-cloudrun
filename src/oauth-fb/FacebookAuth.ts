export interface FaceBookResponse {
    email: string;
    name: string;
    picture: string;
    authResponse: any;
}

// import * as Facebook from 'fb-sdk-wrapper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as Facebook from "fb-sdk-wrapper";

export async function initFacebook(appId: string | undefined): Promise<void> {
    if (!appId) return;
    await Facebook.load();
    return await Facebook.init({
        appId: appId
    });
}

export async function login(): Promise<FaceBookResponse | null> {
    const response = await Facebook.login({
        scope: 'public_profile , email',
        return_scopes: true
    });

    if (response.status !== 'connected') {
        return null;
    }
    const profile = await Facebook.api(
        `/${response.authResponse.userID}`,
        'get',
        {
            fields: ['email', 'name', 'picture']
        }
    );
    const facebookResponse: FaceBookResponse = {
        name: profile.name,
        email: profile.email,
        picture: profile.picture.data.url,
        authResponse: response.authResponse
    };
    return facebookResponse;
}

export async function logout(): Promise<void> {
    return await Facebook.logout();
}