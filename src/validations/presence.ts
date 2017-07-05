export class PresenceValidator {
    validade(model, attrs) {
        var result = {
            status: true,
            menssage: null
        };

        attrs.forEach(element => {
            if (!(element in model)) {
                result.status = false;
                result.menssage = `Error! Missing ${element} attr in documents body.`
            }
        });

        return result;
    }
}