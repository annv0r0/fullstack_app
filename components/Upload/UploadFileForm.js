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
    const csv = e.target.elements.file.files[0];
    const images = e.target.elements.image.files;
    if (!csv || !images) return setError('Select a file first');

    const bucketContent = await uploadFileToS3(csv, images);
    const res = await upload(bucketContent);

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
        <div className={s.form__files}>
          <div className={s.form__file}>
            <input className={s.form__imageInput} type="file" name="image" id="image" accept="image/*" multiple></input>
            <label className={s.form__imageLabel} htmlFor="image">
              Choose image
            </label>
          </div>

          <div className={s.form__file}>
            <input className={s.form__fileInput} type="file" name="file" id="file"></input>
            <label className={s.form__fileLabel} htmlFor="file">
              Choose csv file
            </label>
          </div>
        </div>

        <button className={s.form__btn} type="submit">
          Send
        </button>
      </form>
      {error && <div className={s.error}>{error}</div>}
      {success && <div className={s.success}>{success}</div>}
    </>
  );
}
