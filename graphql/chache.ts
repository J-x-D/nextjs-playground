import { InMemoryCache, makeVar } from "@apollo/client";
type Alert = {
    message: string;
    open: boolean;
    severity: 'success' | 'error' | 'warning';
}

type Person = {
    firstname: string;
    lastname: string;
    age: number;
}

export const alertVar = makeVar<Alert>({
    message: '',
    open: false,
    severity: 'success',
});

export const personVar = makeVar<Person>({
    firstname: '',
    lastname: "",
    age: 0,
});


export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                alertVar: {
                    read(): Alert {
                        return alertVar();
                    },
                },
                personVar: {
                    read(): Person {
                        return personVar();
                    },
                },
                // ...more field policies...
            },
        },
    },
});
