import { gql } from "apollo-server-micro";

export type TableType = {
    id: string;
    lastname: string;
    firstname: string;
    age: string;
    isFake?: boolean;
}

export const typeDefs = gql`
    type Table {
        id: String
        lastname: String
        firstname: String
        age: String
        isFake: Boolean
    }

    type Mutation {
        pushTableData(firstname: String, lastname: String, age: Int):Boolean
    }

    type  Query {
        getTable: [Table]
    }`