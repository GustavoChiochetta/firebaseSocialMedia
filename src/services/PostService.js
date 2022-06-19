import db from "../back-end/firebaseConnect"

import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { searchByAddress } from "./LocationService"


export const createPost = (dados, uid, isDraft) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (dados.endereco) {
                let coordenadas = await searchByAddress(dados.endereco)
                let lat = coordenadas.lat
                let lng = coordenadas.lng
                dados.lat = lat
                dados.lng = lng
                dados.uid = uid
            }
            const table = isDraft ? 'draft' : 'post';
            const docId = await addDoc(collection(db, table), dados)
            resolve(docId)
        } catch (error) {
            reject(error)
        }
    })
}

export const getPosts = (isDraft) => {
    return new Promise(async (resolve, reject) => {
        try {
            const table = isDraft ? 'draft' : 'post';
            const querySnapshot = await getDocs(collection(db, table))
            let registros = []
            querySnapshot.forEach((item) => {
                let data = item.data()
                data.key = item.id
                registros.push(data)
            })
            resolve(registros)
        } catch (error) {
            console.log("Erro:", error)
            reject()
        }
    })
}


export const deletePost = (key, isDraft) => {
    console.log("Delete", key)
    return new Promise(async (resolve, reject) => {
        try {
            const table = isDraft ? 'draft' : 'post';
            await deleteDoc(doc(db, table, key));
            resolve();
        } catch (error) {
            console.log(error)
            reject()
        }
    })
}