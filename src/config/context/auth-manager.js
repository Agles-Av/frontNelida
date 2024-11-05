//
export const authManager = (
    state = { signed: false }, //un objeto de clave valor 
    action //
) => {
    switch (action.type) {
        case "SIGNIN":
            return {
                ...action.payload, //... significa que accedera a todos los elementos de action y accedera a payload
                signed: true,
            }
            break;
        case "SIGNOUT":
            return {
                signed: false,
            }
            break;
        default:
            return state;

    }
}