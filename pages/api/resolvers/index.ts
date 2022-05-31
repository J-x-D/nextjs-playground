import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { TableType } from "../schemas";
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        getTable: async (): Promise<TableType[]> => {
            try {
                const mockedPersons: TableType[] = [];
                for (let index = 0; index < 10; index++) {
                    mockedPersons.push({
                        id: uuidv4(),
                        lastname: faker.name.lastName(),
                        age: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toString(),
                        firstname: faker.name.firstName("female"),
                        isFake: true
                    });
                }
                const storedPersons = (await prisma.person.findMany()).map(person => {
                    const p = person as unknown as TableType;
                    p.isFake = false;
                    return p;
                });
                return [...storedPersons, ...mockedPersons];
            } catch (error) {
                throw error;
            }
        }
    },
    Mutation: {
        pushTableData: async (_: any, { firstname, lastname, age }: { firstname: string, lastname: string, age: number }): Promise<void> => {
            const person = await prisma.person.create({
                data: {
                    firstname, lastname, age
                }
            });
            console.log('%cindex.ts line:26 ------------>', 'color: #007acc;', `${person.firstname} ${person.lastname} (#${person.id}) is ${person.age} years old!`);
        }
    }
};