import { doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { collectionofVansRef, db } from "../firebase/Firebasedb";


export async function getVans() {
    const querySnapshot = await getDocs(collectionofVansRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

export async function getVan(id: string){
    const docRef = doc(db,"vans",id)
    const vanSnapshots = await getDoc(docRef)
    return {
        ...vanSnapshots.data(),
        id: vanSnapshots.id
    }
}

export async function getHostVans() {
    const q = query(collectionofVansRef,where("hostId","==","123"))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

export async function loginUser(creds: any) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}