import { useQuery } from '@apollo/client';

import ALL_LAUNCHES_Q from '../graphql/queries/ALL_LAUNCHES_Q';

const LaunchesPage = () => {
  const { data, loading } = useQuery(ALL_LAUNCHES_Q, {
    onCompleted(payload) {
      console.log('onCompleted :: payload', payload);
    },
    onError(err) {
      console.error('onError :: err', err);
    },
    // variables: {
    //   authorUsername: username,
    //   categories,
    //   limit: 16,
    // },
  });

  console.log('LaunchesPage :: data', data);

  return (
    <div>
      <div>
        <h1>SpaceX Dirty Launch Locations</h1>
        {loading && 'Loading launches...'}

        {!loading &&
          data?.launches?.map(launch => (
            <li key={launch.id} style={{ listStyle: 'none' }}>
              <h2 style={{ fontSize: '1.25rem' }}>
                {launch.launch_site.site_name}
              </h2>
            </li>
          ))}
        <ul />
      </div>
    </div>
  );
};

export default LaunchesPage;
