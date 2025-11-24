import UploadFileForm from '@/components/Upload/UploadFileForm';
import s from './page.module.scss';
import Link from 'next/link';

export default async function UploadPage() {
  const EXAMPLE_FILE_URL =
    'https://docs.google.com/spreadsheets/d/15dJND_x1RP84a92pRmJfe48CEqQ4dQzXG-3tDANIVH4/edit?usp=sharing';
  const EXAMPLE_IMAGES_URL = 'https://drive.google.com/drive/folders/1yL3_1x_kGDopO8EtipMvefhLHW_P4Q0b?usp=drive_link';

  return (
    <div className={s.container}>
      <h1 className={s.title}>UPLOAD DATA</h1>
      <div className={s.infoBox}>
        <p>
          Upload a CSV file to add new items to your database. Use examples&nbsp;
          <Link className={s.exampleLink} href={EXAMPLE_FILE_URL} target="_blank">
            file
          </Link>
          ,&nbsp;
          <Link className={s.exampleLink} href={EXAMPLE_IMAGES_URL} target="_blank">
            images
          </Link>
          &nbsp; or create your own file.
          <br />
          <br />
        </p>
        <p>The file must include the following columns:</p>
        <table className={s.table}>
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>weight</th>
              <th>unit</th>
              <th>price</th>
              <th>currency</th>
              <th>available</th>
              <th>rating</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>beef</td>
              <td>delicious beef</td>
              <td>2500</td>
              <td>g</td>
              <td>50</td>
              <td>USD</td>
              <td>TRUE</td>
              <td>5</td>
              <td>image_1.png</td>
            </tr>
            <tr>
              <td>lettuce</td>
              <td>green lettuce</td>
              <td>300</td>
              <td>g</td>
              <td>7</td>
              <td>USD</td>
              <td>FALSE</td>
              <td>4</td>
              <td>image_3.png</td>
            </tr>
            <tr>
              <td>cheese</td>
              <td>cheesy cheese</td>
              <td>0.5</td>
              <td>kg</td>
              <td>1.3</td>
              <td>USD</td>
              <td>TRUE</td>
              <td>2</td>
              <td>image_3.png</td>
            </tr>
            <tr>
              <td>water</td>
              <td>still water</td>
              <td>900</td>
              <td>ml</td>
              <td>5</td>
              <td>USD</td>
              <td>FALSE</td>
              <td>3</td>
              <td>image_4.png</td>
            </tr>
          </tbody>
        </table>
      </div>

      <UploadFileForm />
    </div>
  );
}
