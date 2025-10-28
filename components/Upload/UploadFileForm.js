'use client';
import { upload } from '@/actions/upload';
import { uploadFileToS3 } from '@/lib/client/s3';
import s from './UploadFileForm.module.scss';
import { useState } from 'react';

export default function UploadFileForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const file = e.target.elements.file.files[0];
    // const image = e.target.files[0];
    if (!file) return setError('Select a file first');

    const { key } = await uploadFileToS3(file);

    const res = await upload(key);

    if (!res.ok) {
      setError(res.error);
      console.log('res.error', res.error);
    } else {
      setError('');
      setSuccess('Upload successful!');
    }
  }

  return (
    <>
      <form className={s.form} onSubmit={onSubmit}>
        {/* <input type="file" name="image" id="image" accept="image/*"></input>
      <label htmlFor="image">Choose image</label> */}

        <input className={s.form__fileInput} type="file" name="file" id="file"></input>
        <label className={s.form__fileLabel} htmlFor="file">
          Choose csv file
        </label>

        <input className={s.form__textInput} type="text" name="text" placeholder="comments"></input>
        <button className={s.form__btn} type="submit">
          Send
        </button>
      </form>
      {error && <div className={s.error}>{error}</div>}
      {success && <div className={s.success}>{success}</div>}
    </>
  );
}
