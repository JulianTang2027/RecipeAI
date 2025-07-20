import { useState } from 'react';
import styles from './uploadBox.module.css';
import upload from '../../assets/upload.svg';

const UploadBox = () => {
    const [link, setLink] = useState("");

    const handleInputChange = (e) => {
        setLink(e.target.value);
        console.log(link);
    }

    return (
        <div className={styles.uploadBox}>
            <div className={styles.uploadSegment}>
                <label className={styles.uploadButton} for="uploadInput">Upload a link to the tiktok or ig reel here!</label>
                <input type="text" id="uploadInput" onChange={handleInputChange}></input>
            </div>
        </div>
    )
}

export default UploadBox;