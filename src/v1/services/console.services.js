import pg from '../db/connection.js'
import TABLE_SCHEMA_NAME from '../enums/entities-keys.js'

import {
    createDeleteAllByUserIdQuery,
    createDeleteByIdQuery,
    createGetByIdQuery,
    createGetQuery,
    createInsertQuery,
    createUpdateQuery,
} from '../utils/create-dynamic-query.js'

export const getConsoleDictionary = async () => {
    try {
        const query = createGetQuery(TABLE_SCHEMA_NAME.CONSOLE_DICTIONARY)
        const data = await pg.query(query)
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const getConsoleById = async (consoleId) => {
    try {
        const query = createGetByIdQuery(TABLE_SCHEMA_NAME.CONSOLE, 'id')
        const data = await pg.query(query, [consoleId])
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllConsolesByUserId = async (userId) => {
    try {
        const query = createGetByIdQuery(TABLE_SCHEMA_NAME.CONSOLE, userId)
        const data = await pg.query(query, [userId])
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const createConsole = async (body, userId) => {
    try {
        const mapBody = new Map(Object.entries(body))
        mapBody.set('user_id', userId)
        const query = createInsertQuery(
            [...mapBody.keys()],
            TABLE_SCHEMA_NAME.CONSOLE
        )
        const values = [...mapBody.values()]
        const data = await pg.query(query, values)
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const updateConsole = async (body, consoleId) => {
    try {
        const hasConsole = await getConsoleById(consoleId)
        if (hasConsole.rows.length === 0) {
            return 'This console does not exists...'
        } else {
            const mapBody = new Map(Object.entries(body))
            const query = createUpdateQuery(
                [...mapBody.keys()],
                TABLE_SCHEMA_NAME.CONSOLE,
                'id'
            )
            const values = [...mapBody.values(), consoleId]
            const data = await pg.query(query, values)
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteConsole = async (consoleId) => {
    try {
        const hasConsole = await getConsoleById(consoleId)
        if (hasConsole.rows.length === 0) {
            return 'This console does not exists...'
        }
        const query = createDeleteByIdQuery(TABLE_SCHEMA_NAME.CONSOLE, 'id')
        const data = await pg.query(query, [consoleId])
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteAllConsolesByUserId = async (userId) => {
    try {
        const hasConsoles = await getAllConsolesByUserId(userId)
        if (hasConsoles.rows.length === 0) {
            return 'This user does not have a consoles registered...'
        }
        const query = createDeleteAllByUserIdQuery(TABLE_SCHEMA_NAME.CONSOLE)
        const data = await pg.query(query, [userId])
        return data
    } catch (error) {
        throw new Error(error)
    }
}
