import UploadFileForm from '@/components/Upload/UploadFileForm';
import s from './page.module.scss';

export default async function UploadPage() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>UPLOAD DATA</h1>
      <div className={s.infoBox}>
        <p>Upload a CSV file to add new items to your database. The file must include the following columns:</p>
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
              <td>/placeholder.png</td>
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
              <td>/placeholder_2.png</td>
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
              <td>/placeholder_4.png</td>
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
              <td>/placeholder_4.png</td>
            </tr>
          </tbody>
        </table>
      </div>
      <UploadFileForm />
    </div>
  );
}
