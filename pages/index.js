import Form from '../components/form/form';
import Head from 'next/Head';


const App = () => {
  return (
    <div>
      <Head>
        <script
          src='https://maps.googleapis.com/maps/api/js?key=yourkey&libraries=places'
          async
          defer
        ></script>
      </Head>

      <Form />
    </div>
  );
};

export default App;
