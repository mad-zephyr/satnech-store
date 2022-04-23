import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const endPointProducts = 'products/'

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'santeh-app.firebaseapp.com',
  databaseURL: 'https://santeh-app.europe-west1.firebasedatabase.app',
  storageBucket: 'santeh-app.appspot.com'
}

export const firebaseApp = initializeApp(firebaseConfig)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage()

// Create a storage reference from our storage service
export const storageRef = ref(storage)

export function uploadFiles(files, setUpdateFiles) {
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(storage, `${endPointProducts}${files[i].name}`)

      const file = files[i]
      const metadata = {
        contentType: files[i].type
      }

      const uploadTask = uploadBytesResumable(storageRef, file, metadata)

      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log('Upload is ' + progress + '% done', snapshot)

          setUpdateFiles(prevState => {
            prevState[i].progress = progress
            return [...prevState]
          })

          switch (snapshot.state) {
            case 'paused':
              // console.log('Upload is paused')
              break
            case 'running':
              // console.log('Upload is running')
              break
          }
        },
        (error) => {
          console.log(error) // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL)

            setUpdateFiles(prevState => {
              prevState[i].url = downloadURL
              return [...prevState]
            })
          })
        }
      )
    }
  }
