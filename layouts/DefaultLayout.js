import styled from 'styled-components';

import Header from '../components/layout/Header';

const PageContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 80%;
  padding-bottom: 150px;
  width: 1240px;
`;

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    <PageContentWrapper>
      <div className="page-content">{children}</div>
    </PageContentWrapper>
  </>
);

export default DefaultLayout;
