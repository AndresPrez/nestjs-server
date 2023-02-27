import { hash } from "bcrypt";
// Very nice recursive removeKeys logic taken from: https://gist.github.com/aurbano/383e691368780e7f5c98
const removeKeys: (obj: any, keys: string[]) => any = (obj, keys) => {
    return obj !== Object(obj)
        ? obj
        : Array.isArray(obj)
            ? obj.map(item => removeKeys(item, keys))
            : Object.keys(obj)
                .filter(k => !keys.includes(k))
                .reduce(
                    (acc, x) => Object.assign(acc, { [x]: removeKeys(obj[x], keys) }),
                    {},
                );
};

async function hashPassword(password: string) {
    if (!password) {
        return;
    }
    password = await hash(password, 10);

    return password;
}

export { removeKeys, hashPassword };
