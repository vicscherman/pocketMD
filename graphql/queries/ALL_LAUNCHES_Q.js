import { gql } from '@apollo/client';

const ALL_LAUNCHES_Q = gql`
  query AllLaunches {
    launches(limit: 10) {
      id
      launch_site {
        site_name
        site_id
        site_name_long
      }
    }
  }
`;

export default ALL_LAUNCHES_Q;
