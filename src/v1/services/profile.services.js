import pg from '../db/connection.js'
import { createGetByIdQuery, createDeleteQuery, createInsertQuery, createUpdateQuery } from '../utils/create-dynamic-query.js'

const TABLE_SCHEMA_NAME = 'public.profile'

export const getProfileByUserId = async (userId) => {
    try {
        const query = createGetByIdQuery(TABLE_SCHEMA_NAME)
        const profile = await pg.query(query, [userId])
        return profile.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const createProfile = async (body, userId) => {
    try {
        const hasUserProfile = await getProfileByUserId(userId)
        if (hasUserProfile) {
            return 'This user already has a profile...'
        }
        const mapBody = new Map(Object.entries(body));
        mapBody.set('user_id', userId)
        const query = createInsertQuery([...mapBody.keys()], TABLE_SCHEMA_NAME)
        const values = [...mapBody.values()]
        const profile_created = await pg.query(query, values)
        return profile_created.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const updateProfile = async (body, userId) => {
    try {
        const hasUserProfile = await getProfileByUserId(userId)
        if (!hasUserProfile) {
            return 'This user does not have a profile...'
        } else {
            const mapBody = new Map(Object.entries(body));
            const query = createUpdateQuery([...mapBody.keys()], TABLE_SCHEMA_NAME)
            const values = [...mapBody.values(), userId]
            const user_updated = await pg.query(query, values)
            return user_updated.rows[0]
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteProfile = async (userId) => {
    try {
        const hasUserProfile = await getProfileByUserId(userId)
        if (!hasUserProfile) {
            return 'This user does not have a profile...'
        }
        const query = createDeleteQuery(TABLE_SCHEMA_NAME)
        const profileDeleted = await pg.query(query, [userId])
        return profileDeleted.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}
