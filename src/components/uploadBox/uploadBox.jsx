import { useState } from 'react';
import styles from './uploadBox.module.css';
import upload from '../../assets/upload.svg';

const UploadBox = () => {
    return (
        <div className={styles.uploadBox}>
            <div className={styles.uploadSegment}>
                <span>Upload a link to the tiktok or ig reel here!</span>
                <button className={styles.uploadButton}>📤</button>
            </div>
        </div>
    )
}

export default UploadBox;